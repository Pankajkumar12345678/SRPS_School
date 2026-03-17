const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function requestJson(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error("Invalid server response");
  }
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  return data;
}

export const quizService = {
  listPublished: () => requestJson(`${API_BASE}/api/quizzes?published=1`),
  getQuizById: (id) => requestJson(`${API_BASE}/api/quizzes/${id}`),
  startQuiz: (id, payload) =>
    requestJson(`${API_BASE}/api/quizzes/${id}/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  submitQuiz: (id, payload) =>
    requestJson(`${API_BASE}/api/quizzes/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  leaderboard: (id) => requestJson(`${API_BASE}/api/quizzes/${id}/leaderboard`),

  adminList: (token) =>
    requestJson(`${API_BASE}/api/quizzes/admin/all`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  adminGetOne: (id, token) =>
    requestJson(`${API_BASE}/api/quizzes/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  adminCreate: (payload, token) =>
    requestJson(`${API_BASE}/api/quizzes/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),
  adminUpdate: (id, payload, token) =>
    requestJson(`${API_BASE}/api/quizzes/admin/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),
  adminDelete: (id, token) =>
    requestJson(`${API_BASE}/api/quizzes/admin/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
  adminPublish: (id, token) =>
    requestJson(`${API_BASE}/api/quizzes/admin/${id}/publish`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }),
  adminSetStatus: (id, status, token) =>
    requestJson(`${API_BASE}/api/quizzes/admin/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    }),
  adminResults: (id, token) =>
    requestJson(`${API_BASE}/api/quizzes/admin/${id}/results`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  adminAiGenerate: (payload, token) =>
    requestJson(`${API_BASE}/api/quizzes/admin/ai-generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),
};
