import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaCalendarAlt,
  FaChartBar,
  FaClock,
  FaEdit,
  FaFileUpload,
  FaFilter,
  FaListAlt,
  FaPowerOff,
  FaQuestionCircle,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { clearAdminSession, getAdminEmail, getAdminToken } from "../utils/adminAuth.js";
import QuizAdminModule from "../admin/QuizAdminModule.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const MODULES = [
  { key: "notices", label: "Notices", icon: <FaListAlt /> },
  { key: "holidays", label: "Holiday Updates", icon: <FaCalendarAlt /> },
  { key: "timings", label: "School Timings", icon: <FaClock /> },
  { key: "materials", label: "Study Materials", icon: <FaBook /> },
  { key: "quizzes", label: "Quiz Management", icon: <FaQuestionCircle /> },
];

const emptyNotice = { title: "", summary: "", tag: "General", startIso: "", endIso: "", place: "School Campus" };
const emptyHoliday = { title: "", date: "", type: "Holiday", description: "" };
const emptyTiming = { section: "", startTime: "", endTime: "", effectiveFrom: "", notes: "" };
const emptyMaterial = { title: "", classLevel: "", subject: "", description: "", fileUrl: "", fileName: "" };

function toInputDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function asDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-IN");
}

export default function AdminPanelPage({ initialModule = "notices" }) {
  const navigate = useNavigate();
  const [moduleKey, setModuleKey] = useState(initialModule);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const [notices, setNotices] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [timings, setTimings] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [noticeForm, setNoticeForm] = useState(emptyNotice);
  const [holidayForm, setHolidayForm] = useState(emptyHoliday);
  const [timingForm, setTimingForm] = useState(emptyTiming);
  const [materialForm, setMaterialForm] = useState(emptyMaterial);
  const [editId, setEditId] = useState({ notices: "", holidays: "", timings: "", materials: "" });

  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const authFail = (message = "Session expired. Please sign in again.") => {
    clearAdminSession();
    navigate("/signin", { state: { message } });
  };

  const getAuthHeaders = (json = true) => ({
    ...(json ? { "Content-Type": "application/json" } : {}),
    Authorization: `Bearer ${getAdminToken()}`,
  });

  const requestJson = async (url, options = {}) => {
    const res = await fetch(url, options);
    const text = await res.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      throw new Error(`Backend returned non-JSON response for ${url}. Please restart backend.`);
    }

    if (res.status === 401) {
      authFail();
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error(data?.error || `Request failed: ${res.status}`);
    return data;
  };

  const loadAll = async () => {
    setLoading(true);
    setError("");
    try {
      if (!getAdminToken()) return authFail();
      await requestJson(`${API_BASE}/api/auth/me`, { headers: getAuthHeaders(false) });
      setAdminEmail(getAdminEmail());

      const [n, h, t, m] = await Promise.all([
        requestJson(`${API_BASE}/api/notices?limit=500`),
        requestJson(`${API_BASE}/api/holiday-updates?limit=500`),
        requestJson(`${API_BASE}/api/school-timings`),
        requestJson(`${API_BASE}/api/study-materials?limit=500`),
      ]);
      const qz = await requestJson(`${API_BASE}/api/quizzes/admin/all`, { headers: getAuthHeaders(false) });

      setNotices(Array.isArray(n) ? n : []);
      setHolidays(Array.isArray(h) ? h : []);
      setTimings(Array.isArray(t) ? t : []);
      setMaterials(Array.isArray(m) ? m : []);
      setQuizzes(Array.isArray(qz) ? qz : []);
    } catch (err) {
      if (err.message !== "Unauthorized") setError(err.message || "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    setModuleKey(initialModule);
  }, [initialModule]);

  useEffect(() => {
    setSearchText("");
    setFilterValue("all");
  }, [moduleKey]);

  const clearForm = (type) => {
    if (type === "notices") setNoticeForm(emptyNotice);
    if (type === "holidays") setHolidayForm(emptyHoliday);
    if (type === "timings") setTimingForm(emptyTiming);
    if (type === "materials") setMaterialForm(emptyMaterial);
    setEditId((p) => ({ ...p, [type]: "" }));
  };

  const submitNotice = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...noticeForm,
        startIso: new Date(noticeForm.startIso).toISOString(),
        endIso: noticeForm.endIso ? new Date(noticeForm.endIso).toISOString() : new Date(noticeForm.startIso).toISOString(),
      };
      const method = editId.notices ? "PUT" : "POST";
      const url = editId.notices ? `${API_BASE}/api/notices/${editId.notices}` : `${API_BASE}/api/notices`;
      await requestJson(url, { method, headers: getAuthHeaders(true), body: JSON.stringify(payload) });
      clearForm("notices");
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const submitHoliday = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...holidayForm, date: new Date(holidayForm.date).toISOString() };
      const method = editId.holidays ? "PUT" : "POST";
      const url = editId.holidays ? `${API_BASE}/api/holiday-updates/${editId.holidays}` : `${API_BASE}/api/holiday-updates`;
      await requestJson(url, { method, headers: getAuthHeaders(true), body: JSON.stringify(payload) });
      clearForm("holidays");
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const submitTiming = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...timingForm,
        effectiveFrom: timingForm.effectiveFrom ? new Date(timingForm.effectiveFrom).toISOString() : undefined,
      };
      const method = editId.timings ? "PUT" : "POST";
      const url = editId.timings ? `${API_BASE}/api/school-timings/${editId.timings}` : `${API_BASE}/api/school-timings`;
      await requestJson(url, { method, headers: getAuthHeaders(true), body: JSON.stringify(payload) });
      clearForm("timings");
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const submitMaterial = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const method = editId.materials ? "PUT" : "POST";
      const url = editId.materials ? `${API_BASE}/api/study-materials/${editId.materials}` : `${API_BASE}/api/study-materials`;
      await requestJson(url, { method, headers: getAuthHeaders(true), body: JSON.stringify(materialForm) });
      clearForm("materials");
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (type, id) => {
    const endpoint = { notices: "/api/notices", holidays: "/api/holiday-updates", timings: "/api/school-timings", materials: "/api/study-materials" }[type];
    if (!window.confirm("Delete this item?")) return;

    try {
      await requestJson(`${API_BASE}${endpoint}/${id}`, { method: "DELETE", headers: getAuthHeaders(false) });
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setError(err.message);
    }
  };

  const uploadFile = async (file) => {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const data = await requestJson(`${API_BASE}/api/study-materials/upload`, { method: "POST", headers: getAuthHeaders(false), body: fd });
      setMaterialForm((p) => ({ ...p, fileUrl: data.fileUrl, fileName: data.fileName }));
    } catch (err) {
      if (err.message !== "Unauthorized") setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const moduleData = useMemo(() => {
    if (moduleKey === "notices") return notices;
    if (moduleKey === "holidays") return holidays;
    if (moduleKey === "timings") return timings;
    if (moduleKey === "quizzes") return quizzes;
    return materials;
  }, [moduleKey, notices, holidays, timings, materials, quizzes]);

  const filterOptions = useMemo(() => {
    const set = new Set();
    moduleData.forEach((r) => {
      if (moduleKey === "notices") set.add(r.tag || "General");
      if (moduleKey === "holidays") set.add(r.type || "Holiday");
      if (moduleKey === "timings") set.add(r.section || "General");
      if (moduleKey === "materials") set.add(r.subject || r.classLevel || "General");
      if (moduleKey === "quizzes") set.add(r.subject || "General");
    });
    return ["all", ...Array.from(set).filter(Boolean)];
  }, [moduleData, moduleKey]);

  const filteredRows = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return moduleData.filter((row) => {
      const title = (row.title || row.section || "").toLowerCase();
      const desc = (row.summary || row.description || row.notes || "").toLowerCase();
      const okSearch = !q || title.includes(q) || desc.includes(q);

      let group = "all";
      if (moduleKey === "notices") group = row.tag || "General";
      if (moduleKey === "holidays") group = row.type || "Holiday";
      if (moduleKey === "timings") group = row.section || "General";
      if (moduleKey === "materials") group = row.subject || row.classLevel || "General";
      if (moduleKey === "quizzes") group = row.subject || "General";
      const okFilter = filterValue === "all" || group === filterValue;

      return okSearch && okFilter;
    });
  }, [moduleData, searchText, filterValue, moduleKey]);

  const counters = useMemo(() => {
    const today = new Date();
    const sameDay = (v) => {
      const d = new Date(v);
      return !Number.isNaN(d.getTime()) && d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    };

    return {
      total: notices.length + holidays.length + timings.length + materials.length + quizzes.length,
      noticesToday: notices.filter((n) => n.startIso && sameDay(n.startIso)).length,
      upcomingHolidays: holidays.filter((h) => h.date && new Date(h.date) >= today).length,
      materialFiles: materials.length,
      quizzesLive: quizzes.filter((q) => q.status === "live").length,
    };
  }, [notices, holidays, timings, materials, quizzes]);

  const chartData = useMemo(
    () => [
      { label: "Notices", value: notices.length, color: "#2b8ea0" },
      { label: "Holidays", value: holidays.length, color: "#f59e0b" },
      { label: "Timings", value: timings.length, color: "#6366f1" },
      { label: "Materials", value: materials.length, color: "#16a34a" },
      { label: "Quizzes", value: quizzes.length, color: "#8b5cf6" },
    ],
    [notices.length, holidays.length, timings.length, materials.length, quizzes.length],
  );
  const maxBar = Math.max(1, ...chartData.map((d) => d.value));
  const getModuleCount = (key) => {
    if (key === "notices") return notices.length;
    if (key === "holidays") return holidays.length;
    if (key === "timings") return timings.length;
    if (key === "materials") return materials.length;
    if (key === "quizzes") return quizzes.length;
    return 0;
  };

  const beginEdit = (row) => {
    if (moduleKey === "notices") {
      setEditId((p) => ({ ...p, notices: row._id }));
      setNoticeForm({ title: row.title || "", summary: row.summary || "", tag: row.tag || "General", startIso: toInputDateTime(row.startIso), endIso: toInputDateTime(row.endIso), place: row.place || "School Campus" });
    } else if (moduleKey === "holidays") {
      setEditId((p) => ({ ...p, holidays: row._id }));
      setHolidayForm({ title: row.title || "", date: row.date ? row.date.slice(0, 10) : "", type: row.type || "Holiday", description: row.description || "" });
    } else if (moduleKey === "timings") {
      setEditId((p) => ({ ...p, timings: row._id }));
      setTimingForm({ section: row.section || "", startTime: row.startTime || "", endTime: row.endTime || "", effectiveFrom: row.effectiveFrom ? row.effectiveFrom.slice(0, 10) : "", notes: row.notes || "" });
    } else {
      setEditId((p) => ({ ...p, materials: row._id }));
      setMaterialForm({ title: row.title || "", classLevel: row.classLevel || "", subject: row.subject || "", description: row.description || "", fileUrl: row.fileUrl || "", fileName: row.fileName || "" });
    }
  };

  const renderForm = () => {
    if (moduleKey === "notices") {
      return (
        <form onSubmit={submitNotice} className="ad-form">
          <h2>{editId.notices ? "Update Notice" : "Add Notice"}</h2>
          <input required placeholder="Title" value={noticeForm.title} onChange={(e) => setNoticeForm((p) => ({ ...p, title: e.target.value }))} />
          <input placeholder="Tag" value={noticeForm.tag} onChange={(e) => setNoticeForm((p) => ({ ...p, tag: e.target.value }))} />
          <textarea placeholder="Summary" value={noticeForm.summary} onChange={(e) => setNoticeForm((p) => ({ ...p, summary: e.target.value }))} />
          <input required type="datetime-local" value={noticeForm.startIso} onChange={(e) => setNoticeForm((p) => ({ ...p, startIso: e.target.value }))} />
          <input type="datetime-local" value={noticeForm.endIso} onChange={(e) => setNoticeForm((p) => ({ ...p, endIso: e.target.value }))} />
          <input placeholder="Place" value={noticeForm.place} onChange={(e) => setNoticeForm((p) => ({ ...p, place: e.target.value }))} />
          <div className="ad-actions"><button type="submit" className="ad-btn ad-btn-primary" disabled={saving}>{saving ? "Saving..." : editId.notices ? "Update" : "Add"}</button><button type="button" className="ad-btn" onClick={() => clearForm("notices")}>Reset</button></div>
        </form>
      );
    }

    if (moduleKey === "holidays") {
      return (
        <form onSubmit={submitHoliday} className="ad-form">
          <h2>{editId.holidays ? "Update Holiday" : "Add Holiday"}</h2>
          <input required placeholder="Title" value={holidayForm.title} onChange={(e) => setHolidayForm((p) => ({ ...p, title: e.target.value }))} />
          <input required type="date" value={holidayForm.date} onChange={(e) => setHolidayForm((p) => ({ ...p, date: e.target.value }))} />
          <input placeholder="Type" value={holidayForm.type} onChange={(e) => setHolidayForm((p) => ({ ...p, type: e.target.value }))} />
          <textarea placeholder="Description" value={holidayForm.description} onChange={(e) => setHolidayForm((p) => ({ ...p, description: e.target.value }))} />
          <div className="ad-actions"><button type="submit" className="ad-btn ad-btn-primary" disabled={saving}>{saving ? "Saving..." : editId.holidays ? "Update" : "Add"}</button><button type="button" className="ad-btn" onClick={() => clearForm("holidays")}>Reset</button></div>
        </form>
      );
    }

    if (moduleKey === "timings") {
      return (
        <form onSubmit={submitTiming} className="ad-form">
          <h2>{editId.timings ? "Update Timing" : "Add Timing"}</h2>
          <input required placeholder="Section" value={timingForm.section} onChange={(e) => setTimingForm((p) => ({ ...p, section: e.target.value }))} />
          <input required placeholder="Start Time" value={timingForm.startTime} onChange={(e) => setTimingForm((p) => ({ ...p, startTime: e.target.value }))} />
          <input required placeholder="End Time" value={timingForm.endTime} onChange={(e) => setTimingForm((p) => ({ ...p, endTime: e.target.value }))} />
          <input type="date" value={timingForm.effectiveFrom} onChange={(e) => setTimingForm((p) => ({ ...p, effectiveFrom: e.target.value }))} />
          <textarea placeholder="Notes" value={timingForm.notes} onChange={(e) => setTimingForm((p) => ({ ...p, notes: e.target.value }))} />
          <div className="ad-actions"><button type="submit" className="ad-btn ad-btn-primary" disabled={saving}>{saving ? "Saving..." : editId.timings ? "Update" : "Add"}</button><button type="button" className="ad-btn" onClick={() => clearForm("timings")}>Reset</button></div>
        </form>
      );
    }

    return (
      <form onSubmit={submitMaterial} className="ad-form">
        <h2>{editId.materials ? "Update Material" : "Add Material"}</h2>
        <input required placeholder="Title" value={materialForm.title} onChange={(e) => setMaterialForm((p) => ({ ...p, title: e.target.value }))} />
        <input placeholder="Class Level" value={materialForm.classLevel} onChange={(e) => setMaterialForm((p) => ({ ...p, classLevel: e.target.value }))} />
        <input placeholder="Subject" value={materialForm.subject} onChange={(e) => setMaterialForm((p) => ({ ...p, subject: e.target.value }))} />
        <textarea placeholder="Description" value={materialForm.description} onChange={(e) => setMaterialForm((p) => ({ ...p, description: e.target.value }))} />
        <div className="ad-upload-box"><input type="file" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])} /><small>{uploading ? "Uploading..." : materialForm.fileName || "Upload file"}</small></div>
        <input required placeholder="File URL" value={materialForm.fileUrl} onChange={(e) => setMaterialForm((p) => ({ ...p, fileUrl: e.target.value }))} />
        <div className="ad-actions"><button type="submit" className="ad-btn ad-btn-primary" disabled={saving}>{saving ? "Saving..." : editId.materials ? "Update" : "Add"}</button><button type="button" className="ad-btn" onClick={() => clearForm("materials")}>Reset</button></div>
      </form>
    );
  };

  if (loading) return <main style={{ padding: "40px", textAlign: "center" }}>Loading admin panel...</main>;

  return (
    <>
      <style>{`
        .ad-root { min-height: 82vh; padding: 18px 14px; background: linear-gradient(160deg,#f4f8fc 0%,#edf3f9 100%); font-family:'Jost',sans-serif; }
        .ad-wrap { max-width: 1320px; margin: 0 auto; display:grid; grid-template-columns: 280px 1fr; gap:14px; }
        .ad-side, .ad-main { background:#fff; border:1px solid #d5e0ea; border-radius:16px; box-shadow:0 12px 26px rgba(15,23,42,0.08); }
        .ad-side { padding:14px; display:grid; align-content:start; gap:10px; height:fit-content; position:sticky; top:90px; }
        .ad-title { font-weight:800; font-size:1.25rem; margin:0; color:#0f3d59; }
        .ad-sub { margin:0; color:#64748b; font-size:0.9rem; }
        .ad-mod-btn { border:1px solid #d2dce5; border-radius:12px; background:#fff; padding:10px; text-align:left; display:flex; align-items:center; gap:10px; font-weight:700; color:#1f3b52; cursor:pointer; }
        .ad-mod-btn b { margin-left:auto; background:#eef5fb; color:#1f3b52; border:1px solid #d2dce5; border-radius:999px; padding:2px 7px; font-size:.73rem; }
        .ad-mod-btn.active { border-color:#1a6b7a; background:linear-gradient(135deg,#e7f4f8,#e6f5ee); color:#0f4f5d; }
        .ad-mod-btn.active b { background:#1a6b7a; color:#fff; border-color:transparent; }
        .ad-main { padding:16px; }
        .ad-top { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; border-bottom:1px solid #e6edf3; padding-bottom:12px; margin-bottom:12px; flex-wrap:wrap; }
        .ad-top h2 { margin:0; color:#0f3d59; font-size:1.3rem; }
        .ad-top p { margin:2px 0 0; color:#64748b; font-size:0.9rem; }
        .ad-stats { display:grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap:8px; width:100%; }
        .ad-stat { border:1px solid #dce6ef; border-radius:12px; padding:10px; background:#f9fcff; }
        .ad-stat strong { display:block; font-size:1.2rem; color:#0f3d59; }
        .ad-stat span { color:#64748b; font-size:0.82rem; }
        .ad-chart { border:1px solid #dce6ef; border-radius:14px; padding:10px; background:#fff; margin-bottom:12px; }
        .ad-chart-title { margin:0 0 8px; font-weight:700; color:#0f3d59; display:flex; align-items:center; gap:8px; }
        .ad-bar-row { display:grid; grid-template-columns: 90px 1fr 30px; gap:8px; align-items:center; margin-bottom:8px; }
        .ad-bar-track { height:10px; border-radius:999px; background:#edf2f7; overflow:hidden; }
        .ad-bar-fill { height:100%; border-radius:999px; }
        .ad-layout { display:grid; grid-template-columns:1fr 1.35fr; gap:12px; }
        .ad-card { border:1px solid #dce6ef; border-radius:14px; padding:12px; background:#fff; }
        .ad-form { display:grid; gap:9px; }
        .ad-form h2 { margin:0 0 4px; font-size:1.08rem; color:#123e57; }
        .ad-form input, .ad-form textarea, .ad-tools select { width:100%; border:1px solid #cfdae4; border-radius:10px; padding:9px 10px; font:inherit; font-size:0.92rem; background:#fbfdff; }
        .ad-form textarea { min-height:86px; resize:vertical; }
        .ad-actions { display:flex; gap:8px; }
        .ad-btn { border:1px solid #ccd8e2; background:#fff; border-radius:9px; padding:8px 10px; font-weight:700; color:#24445d; cursor:pointer; display:inline-flex; align-items:center; gap:7px; text-decoration:none; font-size:0.86rem; }
        .ad-btn-primary { background:linear-gradient(135deg,#1a6b7a,#2b8ea0); color:#fff; border-color:transparent; }
        .ad-btn-danger { color:#991b1b; border-color:#fecaca; background:#fff7f7; }
        .ad-tools { display:grid; grid-template-columns: 1fr 280px; gap:8px; margin-bottom:8px; }
        .ad-search { position:relative; }
        .ad-search svg { position:absolute; left:10px; top:11px; color:#64748b; }
        .ad-search input { width:100%; border:1px solid #cfdae4; border-radius:10px; padding:9px 10px 9px 30px; font:inherit; font-size:0.9rem; }
        .ad-filter { position:relative; }
        .ad-filter svg { position:absolute; left:10px; top:11px; color:#64748b; }
        .ad-filter select { padding-left:30px; font-size:0.9rem; }
        .ad-row { border-bottom:1px solid #edf2f7; padding:10px 0; display:flex; justify-content:space-between; gap:10px; align-items:flex-start; }
        .ad-row h4 { margin:0; font-size:1rem; color:#0f172a; }
        .ad-row p { margin:4px 0 0; color:#64748b; font-size:0.88rem; }
        .ad-row-actions { display:flex; gap:7px; flex-wrap:wrap; }
        .ad-empty { border:1px dashed #cbd5e1; border-radius:12px; padding:14px; text-align:center; color:#64748b; background:#f8fbff; }
        .ad-upload-box { border:1px dashed #c5d4e1; border-radius:10px; padding:8px; background:#f8fbff; display:grid; gap:6px; }
        .ad-error { margin-bottom:12px; border:1px solid #fecaca; background:#fef2f2; color:#991b1b; border-radius:10px; padding:10px 12px; }
        @media (max-width: 1040px) { .ad-wrap, .ad-layout { grid-template-columns:1fr; } .ad-side { position:static; } .ad-stats { grid-template-columns: repeat(2,minmax(0,1fr)); } .ad-tools { grid-template-columns: 1fr; } }
      `}</style>

      <main className="ad-root">
        <div className="ad-wrap">
          <aside className="ad-side">
            <h1 className="ad-title">Admin Panel</h1>
            <p className="ad-sub">Logged in as {adminEmail || getAdminEmail()}</p>
            {MODULES.map((m) => (
              <button key={m.key} type="button" className={`ad-mod-btn ${moduleKey === m.key ? "active" : ""}`} onClick={() => setModuleKey(m.key)}>
                {m.icon}{m.label}
                <b>{getModuleCount(m.key)}</b>
              </button>
            ))}
            <button type="button" className="ad-btn" onClick={() => { clearAdminSession(); navigate("/signin"); }}>
              <FaPowerOff /> Logout
            </button>
          </aside>

          <section className="ad-main">
            {moduleKey === "quizzes" ? (
              <QuizAdminModule token={getAdminToken()} onUnauthorized={() => authFail()} />
            ) : (
              <>
            <div className="ad-top">
              <div>
                <h2>{MODULES.find((m) => m.key === moduleKey)?.label} Manager</h2>
                <p>Counters, chart, search and filter enabled.</p>
              </div>
              <div className="ad-stats">
                <div className="ad-stat"><strong>{counters.total}</strong><span>Total Records</span></div>
                <div className="ad-stat"><strong>{counters.noticesToday}</strong><span>Notices Today</span></div>
                <div className="ad-stat"><strong>{counters.upcomingHolidays}</strong><span>Upcoming Holidays</span></div>
                <div className="ad-stat"><strong>{counters.materialFiles}</strong><span>Material Files</span></div>
                <div className="ad-stat"><strong>{counters.quizzesLive}</strong><span>Live Quizzes</span></div>
              </div>
            </div>

            <div className="ad-chart">
              <p className="ad-chart-title"><FaChartBar /> Module Distribution</p>
              {chartData.map((c) => (
                <div key={c.label} className="ad-bar-row">
                  <span style={{ color: "#334155", fontSize: "0.84rem" }}>{c.label}</span>
                  <div className="ad-bar-track"><div className="ad-bar-fill" style={{ width: `${(c.value / maxBar) * 100}%`, background: c.color }} /></div>
                  <strong style={{ fontSize: "0.84rem", color: "#0f3d59" }}>{c.value}</strong>
                </div>
              ))}
            </div>

            {error && <div className="ad-error">{error}</div>}

            <div className="ad-layout">
              <div className="ad-card">{renderForm()}</div>
              <div className="ad-card">
                <div className="ad-tools">
                  <div className="ad-search"><FaSearch /><input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search..." /></div>
                  <div className="ad-filter"><FaFilter /><select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>{filterOptions.map((o) => <option key={o} value={o}>{o === "all" ? "All" : o}</option>)}</select></div>
                </div>

                {!filteredRows.length ? (
                  <p className="ad-empty">No records match current search/filter.</p>
                ) : (
                  filteredRows.map((row) => (
                    <article key={row._id} className="ad-row">
                      <div>
                        <h4>{row.title || row.section || "Untitled"}</h4>
                        <p>
                          {moduleKey === "notices" && `${row.tag || "General"} | ${asDate(row.startIso)}`}
                          {moduleKey === "holidays" && `${row.type || "Holiday"} | ${asDate(row.date)}`}
                          {moduleKey === "timings" && `${row.startTime || "-"} - ${row.endTime || "-"}`}
                          {moduleKey === "materials" && `${row.classLevel || "All"} | ${row.subject || "General"}`}
                        </p>
                      </div>
                      <div className="ad-row-actions">
                        {moduleKey === "materials" && row.fileUrl && (
                          <a href={row.fileUrl.startsWith("http") ? row.fileUrl : `${API_BASE}${row.fileUrl}`} target="_blank" rel="noreferrer" className="ad-btn"><FaFileUpload /> File</a>
                        )}
                        <button type="button" className="ad-btn" onClick={() => beginEdit(row)}><FaEdit /> Edit</button>
                        <button type="button" className="ad-btn ad-btn-danger" onClick={() => removeItem(moduleKey, row._id)}><FaTrash /> Delete</button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
