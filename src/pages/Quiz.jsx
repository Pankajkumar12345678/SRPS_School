import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import QuizPlayer from "../quiz/QuizPlayer.jsx";
import { quizService } from "../services/quizService.js";
import { getWsEndpoint } from "../utils/realtime.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const WS_ENDPOINT = getWsEndpoint(API_BASE);

function fmtSec(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");

  const [startQuiz, setStartQuiz] = useState(null);
  const [participant, setParticipant] = useState({ name: "", grade: "", email: "" });
  const [starting, setStarting] = useState(false);

  const [activeAttempt, setActiveAttempt] = useState(null);
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await quizService.listPublished();
      setQuizzes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!quizzes.length || startQuiz) return;
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get("quiz");
    if (!quizId) return;
    const matched = quizzes.find((q) => String(q._id) === String(quizId));
    if (matched) setStartQuiz(matched);
  }, [quizzes, startQuiz]);

  useEffect(() => {
    let socket;
    let pollId;
    const quizId = activeAttempt?.quiz?._id;

    if (!quizId) return undefined;

    const loadLeaderboard = async () => {
      try {
        const rows = await quizService.leaderboard(quizId);
        setLeaderboard(rows || []);
      } catch {
        // ignore
      }
    };

    loadLeaderboard();

    try {
      socket = new WebSocket(WS_ENDPOINT);
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data?.event === "quiz:leaderboard" && data?.payload?.quizId === quizId) {
            loadLeaderboard();
          }
          if (data?.event === "quiz:changed") {
            load();
          }
        } catch {
          // ignore malformed socket payloads
        }
      };
      socket.onerror = () => {
        pollId = setInterval(loadLeaderboard, 5000);
      };
    } catch {
      pollId = setInterval(loadLeaderboard, 5000);
    }

    return () => {
      if (pollId) clearInterval(pollId);
      if (socket && socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, [activeAttempt?.quiz?._id]);

  const subjects = useMemo(() => ["all", ...new Set(quizzes.map((q) => q.subject).filter(Boolean))], [quizzes]);
  const grades = useMemo(() => ["all", ...new Set(quizzes.map((q) => q.grade).filter(Boolean))], [quizzes]);
  const topics = useMemo(() => ["all", ...new Set(quizzes.map((q) => q.topic).filter(Boolean))], [quizzes]);

  const filtered = useMemo(
    () =>
      quizzes.filter(
        (q) =>
          (subjectFilter === "all" || q.subject === subjectFilter) &&
          (gradeFilter === "all" || q.grade === gradeFilter) &&
          (topicFilter === "all" || q.topic === topicFilter),
      ),
    [quizzes, subjectFilter, gradeFilter, topicFilter],
  );

  const doStartQuiz = async () => {
    if (!startQuiz?._id || !participant.name) return;
    try {
      setStarting(true);
      const data = await quizService.startQuiz(startQuiz._id, participant);
      setActiveAttempt(data);
      setResult(null);
      setStartQuiz(null);
    } catch (err) {
      alert(err.message || "Unable to start quiz");
    } finally {
      setStarting(false);
    }
  };

  if (activeAttempt?.quiz && !result) {
    return (
      <main className="quiz-page">
        <style>{styles}</style>
        <section className="quiz-wrap">
          <div className="quiz-player-card glass">
            <h1>{activeAttempt.quiz.title}</h1>
            <p>{activeAttempt.quiz.subject} | {activeAttempt.quiz.topic} | {activeAttempt.quiz.grade}</p>
            <QuizPlayer
              quiz={activeAttempt.quiz}
              attemptToken={activeAttempt.attemptToken}
              onFinished={(r) => setResult(r)}
            />
          </div>

          <aside className="quiz-leader glass">
            <h2>Live Leaderboard</h2>
            {leaderboard.length === 0 ? (
              <p>No submissions yet.</p>
            ) : (
              leaderboard.map((row) => (
                <div className="lb-row" key={`${row.rank}-${row.participantName}`}>
                  <span>#{row.rank}</span>
                  <strong>{row.participantName}</strong>
                  <span>{row.score}</span>
                </div>
              ))
            )}
          </aside>
        </section>
      </main>
    );
  }

  if (result) {
    return (
      <main className="quiz-page">
        <style>{styles}</style>
        <section className="quiz-wrap">
          <div className="result glass">
            <h1>Quiz Result</h1>
            <div className="result-grid">
              <div><span>Score</span><strong>{result.score}/{result.totalMarks}</strong></div>
              <div><span>Correct</span><strong>{result.correctCount}/{result.totalQuestions}</strong></div>
              <div><span>Rank</span><strong>#{result.rank || "-"}</strong></div>
              <div><span>Duration</span><strong>{fmtSec(result.durationSec || 0)}</strong></div>
            </div>
            <button className="qz-btn qz-btn-pr" onClick={() => { setActiveAttempt(null); setResult(null); load(); }}>
              Back To Quiz List
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="quiz-page">
      <style>{styles}</style>
      <section className="hero glass">
        <h1>Quiz Competition Arena</h1>
        <p>Subject-wise, topic-wise and grade-wise real-time quiz competitions.</p>
      </section>

      <section className="filters glass">
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>{subjects.map((s) => <option key={s} value={s}>{s === "all" ? "All Subjects" : s}</option>)}</select>
        <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>{topics.map((s) => <option key={s} value={s}>{s === "all" ? "All Topics" : s}</option>)}</select>
        <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}>{grades.map((s) => <option key={s} value={s}>{s === "all" ? "All Grades" : s}</option>)}</select>
      </section>

      {loading && <p className="status">Loading quizzes...</p>}
      {error && <p className="status error">{error}</p>}

      <section className="cards">
        {filtered.map((q) => (
          <motion.article key={q._id} className="card glass" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <h3>{q.title}</h3>
            <p>{q.subject} | {q.topic} | {q.grade}</p>
            <ul>
              <li>Total Questions: {q.totalQuestions}</li>
              <li>Total Marks: {q.totalMarks}</li>
              <li>Time Limit: {fmtSec(q.totalTimeLimitSec || 0)}</li>
              <li>Status: {q.status}</li>
            </ul>
            <button className="qz-btn qz-btn-pr" onClick={() => setStartQuiz(q)}>Start Quiz</button>
          </motion.article>
        ))}
      </section>

      {startQuiz && (
        <div className="modal-bg" onClick={() => setStartQuiz(null)}>
          <div className="modal glass" onClick={(e) => e.stopPropagation()}>
            <h3>Join: {startQuiz.title}</h3>
            <input placeholder="Your Name" value={participant.name} onChange={(e) => setParticipant((p) => ({ ...p, name: e.target.value }))} />
            <input placeholder="Grade/Class" value={participant.grade} onChange={(e) => setParticipant((p) => ({ ...p, grade: e.target.value }))} />
            <input placeholder="Email (optional)" value={participant.email} onChange={(e) => setParticipant((p) => ({ ...p, email: e.target.value }))} />
            <div className="modal-actions">
              <button className="qz-btn" onClick={() => setStartQuiz(null)}>Cancel</button>
              <button className="qz-btn qz-btn-pr" disabled={starting || !participant.name} onClick={doStartQuiz}>{starting ? "Starting..." : "Enter Quiz"}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = `
:root { --qz-bg:#eaf1fb; --qz-glass:rgba(255,255,255,.2); --qz-border:rgba(255,255,255,.35); --qz-text:#123749; --qz-pr:#2563eb; --qz-pr2:#0ea5a4; }
@media (prefers-color-scheme: dark) {
  :root { --qz-bg:#0f172a; --qz-glass:rgba(15,23,42,.55); --qz-border:rgba(148,163,184,.22); --qz-text:#e2e8f0; }
}
.quiz-page { min-height:100vh; padding:30px 14px 80px; background:linear-gradient(150deg,var(--qz-bg),#dbeafe); color:var(--qz-text); font-family:'Jost',sans-serif; }
.glass { background:var(--qz-glass); backdrop-filter: blur(15px); border:1px solid var(--qz-border); border-radius:16px; box-shadow:0 16px 34px rgba(15,23,42,.12); }
.hero { max-width:1180px; margin:0 auto 14px; padding:22px; }
.hero h1 { margin:0 0 6px; font-size:clamp(1.6rem,3.5vw,2.3rem); }
.hero p { margin:0; opacity:.9; }
.filters { max-width:1180px; margin:0 auto 14px; padding:12px; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
.filters select, .modal input { width:100%; padding:10px; border-radius:10px; border:1px solid rgba(148,163,184,.4); background:rgba(255,255,255,.7); color:#0f172a; }
.cards { max-width:1180px; margin:0 auto; display:grid; gap:12px; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); }
.card { padding:14px; }
.card h3 { margin:0 0 6px; }
.card p { margin:0 0 8px; font-size:.9rem; opacity:.9; }
.card ul { margin:0 0 10px; padding-left:18px; font-size:.88rem; }
.qz-btn { border:none; border-radius:10px; padding:9px 12px; font-weight:700; cursor:pointer; }
.qz-btn-pr { background:linear-gradient(135deg,var(--qz-pr),var(--qz-pr2)); color:#fff; }
.status { max-width:1180px; margin:0 auto 10px; }
.status.error { color:#991b1b; }
.modal-bg { position:fixed; inset:0; background:rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; z-index:100; }
.modal { width:min(460px,92vw); padding:14px; display:grid; gap:9px; }
.modal-actions { display:flex; justify-content:flex-end; gap:8px; }
.quiz-wrap { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 300px; gap:12px; }
.quiz-player-card, .quiz-leader, .result { padding:14px; }
.quiz-player-card h1 { margin:0 0 6px; }
.quiz-player-card p { margin:0 0 10px; opacity:.9; }
.qz-play-wrap { display:grid; gap:10px; }
.qz-progress { width:100%; height:10px; border-radius:999px; background:rgba(148,163,184,.3); overflow:hidden; }
.qz-progress-bar { height:100%; background:linear-gradient(135deg,#2563eb,#0ea5a4); }
.qz-meta { display:flex; gap:10px; flex-wrap:wrap; font-size:.84rem; }
.qz-question h3 { margin:0 0 10px; }
.qz-options { display:grid; gap:8px; }
.qz-opt { text-align:left; border:1px solid rgba(148,163,184,.4); background:rgba(255,255,255,.75); padding:10px; border-radius:10px; cursor:pointer; color:#0f172a; }
.qz-opt.active { border-color:#2563eb; background:#dbeafe; }
.qz-actions { display:flex; justify-content:space-between; gap:8px; }
.qz-error { color:#991b1b; font-size:.88rem; }
.quiz-leader h2 { margin:0 0 8px; }
.lb-row { display:grid; grid-template-columns:44px 1fr 40px; gap:8px; align-items:center; padding:8px; border-radius:9px; background:rgba(255,255,255,.35); margin-bottom:6px; }
.result-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin:12px 0; }
.result-grid div { background:rgba(255,255,255,.35); border-radius:10px; padding:10px; display:grid; }
.result-grid span { font-size:.8rem; opacity:.8; }
.result-grid strong { font-size:1.1rem; }
@media (max-width:980px) { .filters { grid-template-columns:1fr; } .quiz-wrap { grid-template-columns:1fr; } }
`;
