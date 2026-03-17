import { useEffect, useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaClone,
  FaCopy,
  FaDownload,
  FaMagic,
  FaPlayCircle,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { quizService } from "../services/quizService.js";

const emptyQuiz = {
  title: "",
  subject: "",
  topic: "",
  grade: "",
  description: "",
  language: "English",
  totalTimeLimitSec: 900,
  passingMarks: 0,
  competitionMode: true,
  allowRetry: true,
  immediateFeedback: false,
  randomizeQuestions: true,
  randomizeOptions: true,
  adaptiveDifficulty: false,
  startAt: "",
  questions: [],
};

const emptyQ = {
  text: "",
  type: "mcq",
  options: ["", "", "", ""],
  correctOptionIndex: 0,
  correctAnswerText: "",
  marks: 2,
  timerSec: 35,
  difficulty: "medium",
  explanation: "",
  hint: "",
  tags: "",
  imageUrl: "",
  audioUrl: "",
  videoUrl: "",
  chartText: "",
};

const typeOptions = [
  ["mcq", "MCQ"],
  ["true_false", "True / False"],
  ["fill_blank", "Fill in the Blanks"],
  ["short_answer", "Short Answer"],
  ["matching", "Matching"],
  ["sequencing", "Sequencing"],
  ["media", "Media Based"],
];

function toCSV(rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return rows.map((r) => r.map(esc).join(",")).join("\n");
}

function downloadCSV(filename, rows) {
  const blob = new Blob([toCSV(rows)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function getQuizUrl(quizId) {
  if (!quizId) return `${window.location.origin}/quiz`;
  return `${window.location.origin}/quiz?quiz=${encodeURIComponent(quizId)}`;
}

function printAsPdf(title, bodyHtml) {
  const win = window.open("", "_blank", "width=1024,height=760");
  if (!win) return;
  win.document.write(`<!doctype html><html><head><meta charset="utf-8" /><title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; color:#0f172a; padding:24px; }
      h1 { margin: 0 0 12px; font-size: 22px; }
      table { width:100%; border-collapse: collapse; margin-top: 10px; }
      th,td { border:1px solid #cbd5e1; padding:8px; text-align:left; font-size:12px; vertical-align:top; }
      th { background:#f8fafc; }
      .meta { color:#475569; font-size:12px; margin-bottom:8px; }
      .q { margin-bottom:12px; padding:10px; border:1px solid #dbeafe; border-radius:8px; }
      .small { color:#475569; font-size:12px; }
    </style></head><body>
    <h1>${title}</h1>
    <div class="meta">Generated: ${new Date().toLocaleString("en-IN")}</div>
    ${bodyHtml}
    <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 300); }<\/script>
    </body></html>`);
  win.document.close();
}

export default function QuizAdminModule({ token, onUnauthorized }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(emptyQuiz);
  const [editId, setEditId] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState(0);
  const [questionSearch, setQuestionSearch] = useState("");

  const [ai, setAi] = useState({
    provider: "gemini",
    subject: "",
    topic: "",
    grade: "",
    numQuestions: 5,
    difficulty: "medium",
    language: "English",
    questionTypes: ["mcq"],
    includeMedia: true,
    sourceText: "",
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInfo, setAiInfo] = useState("");
  const [strictAi, setStrictAi] = useState(false);
  const [resultRows, setResultRows] = useState([]);

  const [bulkMarks, setBulkMarks] = useState(2);
  const [bulkTimer, setBulkTimer] = useState(35);

  const handleErr = (err) => {
    if (String(err.message || "").toLowerCase().includes("unauthorized")) {
      onUnauthorized?.();
      return;
    }
    setError(err.message || "Request failed");
  };

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await quizService.adminList(token);
      setRows(data || []);
    } catch (err) {
      handleErr(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setEditId("");
    setForm(emptyQuiz);
    setResultRows([]);
    setExpandedQuestion(0);
  };

  const addQuestion = () => {
    setForm((p) => ({ ...p, questions: [...p.questions, { ...emptyQ }] }));
    setExpandedQuestion(form.questions.length);
  };

  const updateQuestion = (idx, patch) => {
    setForm((p) => ({
      ...p,
      questions: p.questions.map((q, i) => (i === idx ? { ...q, ...patch } : q)),
    }));
  };

  const ensureTypeShape = (idx, type) => {
    const nextType = type;
    const base = { type: nextType };
    if (nextType === "true_false") {
      base.options = ["True", "False"];
      base.correctOptionIndex = 0;
      base.correctAnswerText = "";
    }
    if (nextType === "mcq" && form.questions[idx]?.options?.length !== 4) {
      base.options = ["", "", "", ""];
      base.correctOptionIndex = 0;
    }
    if (["fill_blank", "short_answer"].includes(nextType)) {
      base.correctAnswerText = form.questions[idx]?.correctAnswerText || "";
      base.options = ["", "", "", ""];
      base.correctOptionIndex = 0;
    }
    updateQuestion(idx, base);
  };

  const removeQuestion = (idx) => {
    setForm((p) => ({ ...p, questions: p.questions.filter((_, i) => i !== idx) }));
  };

  const duplicateQuestion = (idx) => {
    setForm((p) => {
      const next = [...p.questions];
      next.splice(idx + 1, 0, { ...p.questions[idx], options: [...(p.questions[idx].options || [])] });
      return { ...p, questions: next };
    });
    setExpandedQuestion(idx + 1);
  };

  const moveQuestion = (idx, dir) => {
    setForm((p) => {
      const next = [...p.questions];
      const to = idx + dir;
      if (to < 0 || to >= next.length) return p;
      [next[idx], next[to]] = [next[to], next[idx]];
      return { ...p, questions: next };
    });
    setExpandedQuestion((prev) => (prev === idx ? idx + dir : prev));
  };

  const applyBulkSettings = () => {
    setForm((p) => ({
      ...p,
      questions: p.questions.map((q) => ({
        ...q,
        marks: Math.max(1, Number(bulkMarks) || 1),
        timerSec: Math.max(5, Number(bulkTimer) || 30),
      })),
    }));
  };

  const loadOne = async (id) => {
    try {
      setError("");
      const data = await quizService.adminGetOne(id, token);
      setEditId(id);
      setForm({
        title: data.title || "",
        subject: data.subject || "",
        topic: data.topic || "",
        grade: data.grade || "",
        description: data.description || "",
        language: data.language || "English",
        totalTimeLimitSec: data.totalTimeLimitSec || 900,
        passingMarks: data.passingMarks || 0,
        allowRetry: data.allowRetry !== false,
        immediateFeedback: !!data.immediateFeedback,
        randomizeQuestions: data.randomizeQuestions !== false,
        randomizeOptions: data.randomizeOptions !== false,
        adaptiveDifficulty: !!data.adaptiveDifficulty,
        competitionMode: !!data.competitionMode,
        startAt: data.startAt ? new Date(data.startAt).toISOString().slice(0, 16) : "",
        questions: (data.questions || []).map((q) => ({
          text: q.text || "",
          type: q.type || "mcq",
          options: (q.options || []).map((o) => o.text),
          correctOptionIndex: Number.isInteger(q.correctOptionIndex) ? q.correctOptionIndex : 0,
          correctAnswerText: q.correctAnswerText || "",
          marks: q.marks || 2,
          timerSec: q.timerSec || 35,
          difficulty: q.difficulty || "medium",
          explanation: q.explanation || "",
          hint: q.hint || "",
          tags: Array.isArray(q.tags) ? q.tags.join(", ") : "",
          imageUrl: q.imageUrl || "",
          audioUrl: q.audioUrl || "",
          videoUrl: q.videoUrl || "",
          chartText: q.chartText || "",
        })),
      });
      const resRows = await quizService.adminResults(id, token);
      setResultRows(resRows || []);
      setExpandedQuestion(0);
    } catch (err) {
      handleErr(err);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        totalTimeLimitSec: Number(form.totalTimeLimitSec),
        passingMarks: Number(form.passingMarks) || 0,
        startAt: form.startAt ? new Date(form.startAt).toISOString() : null,
        questions: form.questions.map((q) => ({
          ...q,
          type: q.type || "mcq",
          options: (q.options || []).map((text) => ({ text })),
          marks: Number(q.marks),
          timerSec: Number(q.timerSec),
          correctOptionIndex: Number(q.correctOptionIndex),
          tags: String(q.tags || "")
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
        })),
      };

      if (!payload.title || !payload.subject || !payload.topic || !payload.grade) {
        throw new Error("title, subject, topic and grade are required");
      }

      if (editId) await quizService.adminUpdate(editId, payload, token);
      else await quizService.adminCreate(payload, token);

      await load();
      reset();
    } catch (err) {
      handleErr(err);
    } finally {
      setSaving(false);
    }
  };

  const doPublish = async (id) => {
    try {
      await quizService.adminPublish(id, token);
      await load();
    } catch (err) {
      handleErr(err);
    }
  };

  const doStatus = async (id, status) => {
    try {
      await quizService.adminSetStatus(id, status, token);
      await load();
    } catch (err) {
      handleErr(err);
    }
  };

  const doDelete = async (id) => {
    if (!window.confirm("Delete this quiz?")) return;
    try {
      await quizService.adminDelete(id, token);
      await load();
      if (id === editId) reset();
    } catch (err) {
      handleErr(err);
    }
  };

  const toggleAiType = (type) => {
    setAi((p) => {
      const has = p.questionTypes.includes(type);
      if (has) return { ...p, questionTypes: p.questionTypes.filter((t) => t !== type) };
      return { ...p, questionTypes: [...p.questionTypes, type] };
    });
  };

  const generateAI = async () => {
    try {
      setAiLoading(true);
      setError("");
      setAiInfo("");
      const data = await quizService.adminAiGenerate({ ...ai, requireAi: strictAi, allowFallback: !strictAi }, token);
      const generated = (data.questions || []).map((q) => ({
        text: q.text,
        type: q.type || "mcq",
        options: (q.options || []).map((o) => o.text),
        correctOptionIndex: Number.isInteger(q.correctOptionIndex) ? q.correctOptionIndex : 0,
        correctAnswerText: q.correctAnswerText || "",
        marks: q.marks,
        timerSec: q.timerSec,
        difficulty: q.difficulty,
        explanation: q.explanation || "",
        hint: q.hint || "",
        tags: Array.isArray(q.tags) ? q.tags.join(", ") : "",
        imageUrl: q.imageUrl || "",
        audioUrl: q.audioUrl || "",
        videoUrl: q.videoUrl || "",
        chartText: q.chartText || "",
      }));
      setForm((p) => ({ ...p, questions: [...p.questions, ...generated] }));
      setAiInfo(
        data?.source === "fallback"
          ? `Fallback used: ${data?.warning || "AI provider unavailable"}`
          : `AI generated ${data?.count || generated.length} questions successfully.`,
      );
    } catch (err) {
      handleErr(err);
    } finally {
      setAiLoading(false);
    }
  };

  const exportQuestionsCSV = () => {
    const rowsCSV = [["Q.No", "Type", "Question", "Options", "Correct", "Marks", "Timer", "Difficulty", "Tags"]];
    form.questions.forEach((q, i) => {
      rowsCSV.push([
        i + 1,
        q.type,
        q.text,
        (q.options || []).join(" | "),
        q.correctAnswerText || String.fromCharCode(65 + (q.correctOptionIndex || 0)),
        q.marks,
        q.timerSec,
        q.difficulty,
        q.tags || "",
      ]);
    });
    downloadCSV(`quiz-questions-${Date.now()}.csv`, rowsCSV);
  };

  const exportResultsCSV = () => {
    const rowsCSV = [["Rank", "Participant", "Grade", "Score", "Total Marks", "Correct", "Duration (s)", "Submitted At"]];
    resultRows.forEach((r) => {
      rowsCSV.push([r.rank, r.participantName, r.participantGrade, r.score, r.totalMarks, r.correctCount, r.durationSec, r.submittedAt]);
    });
    downloadCSV(`quiz-results-${Date.now()}.csv`, rowsCSV);
  };

  const exportQuestionsPDF = () => {
    if (!form.questions.length) return;
    const blocks = form.questions
      .map((q, i) => {
        const options = (q.options || [])
          .map((o, idx) => `<div class="small">${String.fromCharCode(65 + idx)}. ${o || "-"}</div>`)
          .join("");
        const correct =
          q.correctAnswerText ||
          (q.options?.[q.correctOptionIndex] ? q.options[q.correctOptionIndex] : String.fromCharCode(65 + (q.correctOptionIndex || 0)));
        return `<div class="q">
          <div><strong>Q${i + 1}:</strong> ${q.text || "-"}</div>
          <div class="small">Type: ${q.type} | Difficulty: ${q.difficulty} | Marks: ${q.marks} | Timer: ${q.timerSec}s</div>
          ${options}
          <div class="small"><strong>Correct:</strong> ${correct}</div>
          <div class="small"><strong>Explanation:</strong> ${q.explanation || "-"}</div>
          <div class="small"><strong>Hint:</strong> ${q.hint || "-"}</div>
        </div>`;
      })
      .join("");
    printAsPdf(`Quiz Questions - ${form.title || "Untitled"}`, blocks);
  };

  const exportResultsPDF = () => {
    if (!resultRows.length) return;
    const rowsHtml = resultRows
      .map(
        (r) => `<tr>
          <td>${r.rank}</td>
          <td>${r.participantName}</td>
          <td>${r.participantGrade || "-"}</td>
          <td>${r.score}</td>
          <td>${r.totalMarks}</td>
          <td>${r.correctCount}</td>
          <td>${r.durationSec}s</td>
          <td>${r.submittedAt ? new Date(r.submittedAt).toLocaleString("en-IN") : "-"}</td>
        </tr>`,
      )
      .join("");
    const html = `<table>
      <thead><tr><th>Rank</th><th>Name</th><th>Grade</th><th>Score</th><th>Total</th><th>Correct</th><th>Duration</th><th>Submitted</th></tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>`;
    printAsPdf(`Quiz Results - ${form.title || "Selected Quiz"}`, html);
  };

  const copyText = async (text, okMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      setAiInfo(okMessage);
    } catch {
      setAiInfo("Copy failed. Please copy manually.");
    }
  };

  const shareToGoogleClassroom = (quizId) => {
    const url = getQuizUrl(quizId);
    window.open(`https://classroom.google.com/share?url=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
  };

  const copyLmsMessage = (platform, quiz) => {
    const url = getQuizUrl(quiz?._id);
    const text = `Quiz: ${quiz?.title || "School Quiz"}\nSubject: ${quiz?.subject || "-"}\nTopic: ${quiz?.topic || "-"}\nJoin Link: ${url}`;
    copyText(text, `${platform} share text copied.`);
  };

  const summary = useMemo(() => {
    const totalQ = form.questions.length;
    const totalMarks = form.questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);
    const complete = form.questions.filter((q) => q.text.trim()).length;
    return { totalQ, totalMarks, complete, incomplete: Math.max(0, totalQ - complete) };
  }, [form.questions]);

  const visibleQuestions = useMemo(() => {
    const term = questionSearch.trim().toLowerCase();
    return form.questions
      .map((q, idx) => ({ q, idx }))
      .filter(({ q, idx }) => {
        if (!term) return true;
        return (
          q.text.toLowerCase().includes(term) ||
          (q.tags || "").toLowerCase().includes(term) ||
          (q.type || "").toLowerCase().includes(term) ||
          String(idx + 1).includes(term)
        );
      });
  }, [form.questions, questionSearch]);

  return (
    <div className="quiz-admin">
      <style>{`
        .qa-shell { --or:#f97316; --yl:#f59e0b; --gr:#16a34a; --rd:#ef4444; --ink:#102a43; --line:#d7e2ef; }
        .qa-grid { display:grid; grid-template-columns: 1.2fr .8fr; gap:14px; }
        .qa-card { border:1px solid var(--line); border-radius:16px; padding:14px; background:#fff; box-shadow:0 10px 26px rgba(15,23,42,.06); }
        .qa-card h3 { margin:0 0 10px; color:var(--ink); display:flex; align-items:center; gap:8px; }
        .qa-form { display:grid; gap:9px; }
        .qa-form input, .qa-form textarea, .qa-form select { width:100%; border:1px solid #cfdae4; border-radius:10px; padding:9px 10px; font:inherit; background:#fbfdff; }
        .qa-row { display:grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap:8px; }
        .qa-q { border:1px solid #e6edf5; border-radius:12px; padding:10px; background:#f9fbff; margin-bottom:8px; }
        .qa-q-head { display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; margin-bottom:8px; }
        .qa-chip { display:inline-flex; align-items:center; gap:6px; border-radius:999px; border:1px solid #dce8f3; padding:4px 9px; font-size:.78rem; font-weight:700; background:#fff; color:#36556f; }
        .qa-chip.or { background:#fff7ed; border-color:#fed7aa; color:#9a3412; }
        .qa-chip.yl { background:#fffbeb; border-color:#fde68a; color:#92400e; }
        .qa-chip.gr { background:#ecfdf5; border-color:#bbf7d0; color:#065f46; }
        .qa-chip.rd { background:#fef2f2; border-color:#fecaca; color:#991b1b; }
        .qa-mini-actions { display:flex; gap:6px; flex-wrap:wrap; }
        .qa-mini { border:1px solid #d5e2ee; border-radius:8px; background:#fff; padding:6px 8px; font-size:.77rem; font-weight:700; color:#234a66; cursor:pointer; }
        .qa-mini:disabled { opacity:.5; cursor:not-allowed; }
        .qa-btn { border:1px solid #d2deea; background:#fff; border-radius:10px; padding:8px 11px; font-weight:800; color:#21465f; cursor:pointer; display:inline-flex; align-items:center; gap:7px; font-size:.84rem; }
        .qa-btn-pr { background:linear-gradient(135deg,var(--or),var(--yl)); color:#fff; border-color:transparent; }
        .qa-btn-ok { background:linear-gradient(135deg,#16a34a,#22c55e); color:#fff; border-color:transparent; }
        .qa-btn-danger { border-color:#fecaca; color:#991b1b; background:#fff7f7; }
        .qa-actions { display:flex; gap:8px; flex-wrap:wrap; }
        .qa-err { border:1px solid #fecaca; background:#fef2f2; color:#991b1b; border-radius:10px; padding:9px; margin-bottom:9px; }
        .qa-info { border:1px solid #fdba74; background:#fff7ed; color:#9a3412; border-radius:10px; padding:9px; margin-bottom:9px; }
        .qa-library { display:grid; gap:8px; max-height:380px; overflow:auto; padding-right:4px; }
        .qa-item { border:1px solid #e2e8f0; border-radius:11px; padding:10px; background:#fff; }
        .qa-item strong { color:#0f172a; }
        .qa-item p { margin:4px 0 8px; color:#64748b; font-size:.85rem; }
        .qa-search { position:relative; }
        .qa-search svg { position:absolute; left:10px; top:11px; color:#64748b; }
        .qa-search input { padding-left:30px !important; }
        .qa-results { max-height:260px; overflow:auto; border:1px solid #e2e8f0; border-radius:10px; }
        .qa-r { display:grid; grid-template-columns: 45px 1fr 70px 80px; gap:8px; padding:8px; border-top:1px solid #eef2f7; font-size:.84rem; }
        .qa-r:first-child { border-top:none; }
        .qa-type-grid { display:grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap:6px; }
        @media (max-width: 1040px) {
          .qa-grid, .qa-row, .qa-type-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="qa-shell">
        {error && <div className="qa-err">{error}</div>}
        {aiInfo && <div className="qa-info">{aiInfo}</div>}

        <div className="qa-grid">
          <section className="qa-card">
            <h3>Quiz Studio</h3>
            <form className="qa-form" onSubmit={save}>
              <input placeholder="Quiz Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
              <div className="qa-row">
                <input placeholder="Subject" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} />
                <input placeholder="Topic / Chapter" value={form.topic} onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))} />
              </div>
              <div className="qa-row">
                <input placeholder="Grade/Class" value={form.grade} onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))} />
                <input placeholder="Language" value={form.language} onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))} />
              </div>
              <div className="qa-row">
                <input type="number" min="60" placeholder="Quiz Time (sec)" value={form.totalTimeLimitSec} onChange={(e) => setForm((p) => ({ ...p, totalTimeLimitSec: e.target.value }))} />
                <input type="number" min="0" placeholder="Passing Marks" value={form.passingMarks} onChange={(e) => setForm((p) => ({ ...p, passingMarks: e.target.value }))} />
              </div>
              <input type="datetime-local" value={form.startAt} onChange={(e) => setForm((p) => ({ ...p, startAt: e.target.value }))} />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />

              <div className="qa-row">
                <label><input type="checkbox" checked={form.competitionMode} onChange={(e) => setForm((p) => ({ ...p, competitionMode: e.target.checked }))} /> Competition Mode</label>
                <label><input type="checkbox" checked={form.allowRetry} onChange={(e) => setForm((p) => ({ ...p, allowRetry: e.target.checked }))} /> Retry Wrong Answers</label>
              </div>
              <div className="qa-row">
                <label><input type="checkbox" checked={form.immediateFeedback} onChange={(e) => setForm((p) => ({ ...p, immediateFeedback: e.target.checked }))} /> Immediate Feedback</label>
                <label><input type="checkbox" checked={form.randomizeQuestions} onChange={(e) => setForm((p) => ({ ...p, randomizeQuestions: e.target.checked }))} /> Random Questions</label>
              </div>
              <div className="qa-row">
                <label><input type="checkbox" checked={form.randomizeOptions} onChange={(e) => setForm((p) => ({ ...p, randomizeOptions: e.target.checked }))} /> Random Options</label>
                <label><input type="checkbox" checked={form.adaptiveDifficulty} onChange={(e) => setForm((p) => ({ ...p, adaptiveDifficulty: e.target.checked }))} /> Adaptive Difficulty</label>
              </div>

              <div className="qa-actions">
                <span className="qa-chip gr">Q: {summary.totalQ}</span>
                <span className="qa-chip yl">Marks: {summary.totalMarks}</span>
                <span className="qa-chip or">Complete: {summary.complete}</span>
                <span className="qa-chip rd">Incomplete: {summary.incomplete}</span>
              </div>

              <div className="qa-actions">
                <button type="button" className="qa-btn" onClick={addQuestion}><FaPlus /> Add Question</button>
                <button type="button" className="qa-btn" onClick={exportQuestionsCSV}><FaDownload /> Export CSV</button>
                <button type="button" className="qa-btn" onClick={exportQuestionsPDF}><FaDownload /> Export PDF</button>
                <button type="submit" className="qa-btn qa-btn-pr" disabled={saving}>{saving ? "Saving..." : editId ? "Update Quiz" : "Create Quiz"}</button>
                <button type="button" className="qa-btn" onClick={reset}>Reset</button>
              </div>
            </form>

            <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #eef2f7" }} />
            <h3><FaMagic /> AI Quiz Generator</h3>
            <div className="qa-form">
              <div className="qa-row">
                <select value={ai.provider} onChange={(e) => setAi((p) => ({ ...p, provider: e.target.value }))}>
                  <option value="gemini">Gemini</option>
                  <option value="chatgpt">ChatGPT</option>
                  <option value="claude">Claude</option>
                </select>
                <select value={ai.difficulty} onChange={(e) => setAi((p) => ({ ...p, difficulty: e.target.value }))}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="qa-row">
                <input placeholder="Subject" value={ai.subject} onChange={(e) => setAi((p) => ({ ...p, subject: e.target.value }))} />
                <input placeholder="Topic / Chapter" value={ai.topic} onChange={(e) => setAi((p) => ({ ...p, topic: e.target.value }))} />
              </div>
              <div className="qa-row">
                <input placeholder="Grade" value={ai.grade} onChange={(e) => setAi((p) => ({ ...p, grade: e.target.value }))} />
                <input type="number" min="1" max="30" value={ai.numQuestions} onChange={(e) => setAi((p) => ({ ...p, numQuestions: Number(e.target.value) }))} />
              </div>
              <div className="qa-row">
                <input placeholder="Language" value={ai.language} onChange={(e) => setAi((p) => ({ ...p, language: e.target.value }))} />
                <label><input type="checkbox" checked={ai.includeMedia} onChange={(e) => setAi((p) => ({ ...p, includeMedia: e.target.checked }))} /> Include media questions</label>
              </div>
              <textarea placeholder="Generate from notes / topic summary..." value={ai.sourceText} onChange={(e) => setAi((p) => ({ ...p, sourceText: e.target.value }))} />
              <div className="qa-type-grid">
                {typeOptions.map(([key, label]) => (
                  <label key={key} className="qa-chip" style={{ justifyContent: "center" }}>
                    <input type="checkbox" checked={ai.questionTypes.includes(key)} onChange={() => toggleAiType(key)} /> {label}
                  </label>
                ))}
              </div>
              <label><input type="checkbox" checked={strictAi} onChange={(e) => setStrictAi(e.target.checked)} /> Strict AI only (no fallback)</label>
              <button type="button" className="qa-btn qa-btn-ok" onClick={generateAI} disabled={aiLoading}>
                <FaMagic /> {aiLoading ? "Generating..." : "Generate With AI"}
              </button>
            </div>

            <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #eef2f7" }} />
            <h3>Question Builder</h3>
            <div className="qa-row" style={{ marginBottom: 8 }}>
              <div className="qa-search"><FaSearch /><input placeholder="Search question/tags/type" value={questionSearch} onChange={(e) => setQuestionSearch(e.target.value)} /></div>
              <div className="qa-row" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
                <input type="number" min="1" value={bulkMarks} onChange={(e) => setBulkMarks(e.target.value)} placeholder="Bulk Marks" />
                <input type="number" min="5" value={bulkTimer} onChange={(e) => setBulkTimer(e.target.value)} placeholder="Bulk Timer" />
                <button type="button" className="qa-btn" onClick={applyBulkSettings}>Apply</button>
              </div>
            </div>

            {visibleQuestions.map(({ q, idx }) => (
              <article className="qa-q" key={`q-${idx}`}>
                <div className="qa-q-head">
                  <div className="qa-actions">
                    <span className="qa-chip or">Q{idx + 1}</span>
                    <span className="qa-chip">{q.type}</span>
                    <span className="qa-chip">{q.difficulty}</span>
                  </div>
                  <div className="qa-mini-actions">
                    <button className="qa-mini" type="button" onClick={() => moveQuestion(idx, -1)} disabled={idx === 0}><FaArrowUp /></button>
                    <button className="qa-mini" type="button" onClick={() => moveQuestion(idx, 1)} disabled={idx === form.questions.length - 1}><FaArrowDown /></button>
                    <button className="qa-mini" type="button" onClick={() => duplicateQuestion(idx)}><FaClone /></button>
                    <button className="qa-mini" type="button" onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}>{expandedQuestion === idx ? "Collapse" : "Expand"}</button>
                  </div>
                </div>

                {expandedQuestion === idx ? (
                  <>
                    <input value={q.text} placeholder="Question text" onChange={(e) => updateQuestion(idx, { text: e.target.value })} />
                    <div className="qa-row" style={{ marginTop: 8 }}>
                      <select value={q.type} onChange={(e) => ensureTypeShape(idx, e.target.value)}>
                        {typeOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                      <select value={q.difficulty} onChange={(e) => updateQuestion(idx, { difficulty: e.target.value })}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    {!["fill_blank", "short_answer"].includes(q.type) ? (
                      <>
                        <div className="qa-row" style={{ marginTop: 8 }}>
                          {(q.options || ["", "", "", ""]).map((opt, i) => (
                            <input
                              key={`opt-${idx}-${i}`}
                              value={opt}
                              placeholder={`Option ${String.fromCharCode(65 + i)}`}
                              onChange={(e) => {
                                const options = [...(q.options || [])];
                                options[i] = e.target.value;
                                updateQuestion(idx, { options });
                              }}
                            />
                          ))}
                        </div>
                        <select value={q.correctOptionIndex} onChange={(e) => updateQuestion(idx, { correctOptionIndex: Number(e.target.value) })} style={{ marginTop: 8 }}>
                          {(q.options || []).map((_, i) => <option key={i} value={i}>Correct: {String.fromCharCode(65 + i)}</option>)}
                        </select>
                      </>
                    ) : (
                      <input style={{ marginTop: 8 }} value={q.correctAnswerText || ""} placeholder="Correct answer text" onChange={(e) => updateQuestion(idx, { correctAnswerText: e.target.value })} />
                    )}

                    <div className="qa-row" style={{ marginTop: 8 }}>
                      <input type="number" min="1" value={q.marks} placeholder="Marks" onChange={(e) => updateQuestion(idx, { marks: Number(e.target.value) })} />
                      <input type="number" min="5" value={q.timerSec} placeholder="Timer (sec)" onChange={(e) => updateQuestion(idx, { timerSec: Number(e.target.value) })} />
                    </div>
                    <textarea value={q.explanation || ""} placeholder="Answer explanation" onChange={(e) => updateQuestion(idx, { explanation: e.target.value })} />
                    <input value={q.hint || ""} placeholder="Hint / clue" onChange={(e) => updateQuestion(idx, { hint: e.target.value })} />
                    <input value={q.tags || ""} placeholder="Tags (comma separated)" onChange={(e) => updateQuestion(idx, { tags: e.target.value })} />
                    <div className="qa-row">
                      <input value={q.imageUrl || ""} placeholder="Image URL" onChange={(e) => updateQuestion(idx, { imageUrl: e.target.value })} />
                      <input value={q.audioUrl || ""} placeholder="Audio URL" onChange={(e) => updateQuestion(idx, { audioUrl: e.target.value })} />
                    </div>
                    <div className="qa-row">
                      <input value={q.videoUrl || ""} placeholder="Video URL" onChange={(e) => updateQuestion(idx, { videoUrl: e.target.value })} />
                      <input value={q.chartText || ""} placeholder="Chart/Graph Note" onChange={(e) => updateQuestion(idx, { chartText: e.target.value })} />
                    </div>

                    <button type="button" className="qa-btn qa-btn-danger" style={{ marginTop: 8 }} onClick={() => removeQuestion(idx)}>
                      <FaTrash /> Remove Question
                    </button>
                  </>
                ) : (
                  <p style={{ margin: 0, color: "#64748b", fontSize: ".85rem" }}>{q.text || "No question text"}</p>
                )}
              </article>
            ))}

            {!visibleQuestions.length && <p style={{ color: "#64748b" }}>No questions matched.</p>}
          </section>

          <section className="qa-card">
            <h3>Quiz Library</h3>
            <div className="qa-library">
              {loading ? (
                <p>Loading quizzes...</p>
              ) : (
                rows.map((r) => (
                  <article key={r._id} className="qa-item">
                    <strong>{r.title}</strong>
                    <p>{r.subject} | {r.topic} | {r.grade} | {r.status}</p>
                    <div className="qa-actions">
                      <button className="qa-btn" onClick={() => loadOne(r._id)}>Edit</button>
                      <button className="qa-btn" onClick={() => copyText(getQuizUrl(r._id), "Quiz link copied.")}><FaCopy /> Copy Link</button>
                      <button className="qa-btn" onClick={() => shareToGoogleClassroom(r._id)}>Classroom</button>
                      <button className="qa-btn" onClick={() => copyLmsMessage("Moodle", r)}>Moodle</button>
                      <button className="qa-btn" onClick={() => copyLmsMessage("Canvas", r)}>Canvas</button>
                      <button className="qa-btn qa-btn-ok" onClick={() => doPublish(r._id)}><FaPlayCircle /> Publish</button>
                      <button className="qa-btn" onClick={() => doStatus(r._id, "live")}>Go Live</button>
                      <button className="qa-btn" onClick={() => doStatus(r._id, "completed")}>Complete</button>
                      <button className="qa-btn qa-btn-danger" onClick={() => doDelete(r._id)}>Delete</button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid #eef2f7" }} />
            <h3>Leaderboard / Results</h3>
            <div className="qa-actions" style={{ marginBottom: 8 }}>
              <button type="button" className="qa-btn" onClick={exportResultsCSV} disabled={!resultRows.length}><FaDownload /> Export Results CSV</button>
              <button type="button" className="qa-btn" onClick={exportResultsPDF} disabled={!resultRows.length}><FaDownload /> Export Results PDF</button>
            </div>
            {!resultRows.length ? (
              <p style={{ color: "#64748b", fontSize: ".88rem" }}>Select a quiz to view results.</p>
            ) : (
              <div className="qa-results">
                {resultRows.map((r) => (
                  <div className="qa-r" key={r._id}>
                    <span>#{r.rank}</span>
                    <span>{r.participantName}</span>
                    <span>{r.score}</span>
                    <span>{r.durationSec}s</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
