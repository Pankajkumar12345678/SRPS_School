import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCalendarPlus,
  FaClock,
  FaMapMarkerAlt,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const NOTICES_API = `${API_BASE}/api/notices`;
const WS_ENDPOINT = (() => {
  try {
    const url = new URL(API_BASE);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = "/ws";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return "ws://localhost:5000/ws";
  }
})();

function toGoogleDate(isoString) {
  return new Date(isoString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const latest = notices[0] || null;
  const recent = notices.slice(1, 8);

  const tickerText = useMemo(() => {
    if (!notices.length) return "No notices available right now.";
    return notices.map((n) => `${n.tag || "General"}: ${n.title}`).join("   •   ");
  }, [notices]);

  const fetchNotices = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      setError("");
      const res = await fetch(`${NOTICES_API}?limit=100`);
      if (!res.ok) throw new Error(`Failed to load notices (${res.status})`);
      const data = await res.json();
      const normalized = data
        .map((n) => ({
          ...n,
          summary: n.summary || n.description || "",
          startIso: n.startIso || n.date || n.createdAt,
          endIso: n.endIso || n.startIso || n.date || n.createdAt,
          tag: n.tag || "General",
          place: n.place || "School Campus",
        }))
        .filter((n) => n.title && n.startIso)
        .sort((a, b) => new Date(b.startIso) - new Date(a.startIso));

      setNotices(normalized);
    } catch (err) {
      setError(err.message || "Unable to load notices.");
      setNotices([]);
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let reconnectTimer = null;
    let socket = null;
    let isUnmounted = false;

    const connect = () => {
      if (isUnmounted) return;
      socket = new WebSocket(WS_ENDPOINT);

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data?.event === "notice:changed") {
            fetchNotices(false);
          }
        } catch {
          // Ignore invalid payloads from socket.
        }
      };

      socket.onclose = () => {
        if (isUnmounted) return;
        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    fetchNotices(true);
    connect();

    const poll = setInterval(() => fetchNotices(false), 120000);

    return () => {
      isUnmounted = true;
      clearInterval(poll);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [fetchNotices]);

  const handleShare = async (notice) => {
    const shareText = `${notice.title}\n${notice.summary}\n${formatDateTime(notice.startIso)}\n${notice.place}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: notice.title, text: shareText, url: window.location.href });
        return;
      } catch {
        // fallback
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Notice copied. You can paste and share it.");
    } catch {
      alert("Share not supported on this browser.");
    }
  };

  const handleWhatsappShare = (notice) => {
    const msg = encodeURIComponent(
      `${notice.title}\n${notice.summary}\nDate: ${formatDateTime(notice.startIso)}\nVenue: ${notice.place}`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const openGoogleCalendar = (notice) => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: notice.title,
      details: notice.summary,
      location: notice.place,
      dates: `${toGoogleDate(notice.startIso)}/${toGoogleDate(notice.endIso || notice.startIso)}`,
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Jost:wght@300;400;500;600;700&display=swap');

        .nb-page {
          min-height: 100vh;
          padding: 34px 16px 84px;
          background: linear-gradient(160deg, #f4f7fb 0%, #eef3f8 100%);
          font-family: 'Jost', sans-serif;
        }

        .nb-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }

        .wood-board {
          position: relative;
          padding: 18px;
          border-radius: 14px;
          background: linear-gradient(145deg, #c98b42 0%, #a45a1f 40%, #b56f2b 100%);
          box-shadow: 0 14px 30px rgba(0,0,0,0.25);
          border: 4px solid #7b3d16;
        }

        .wood-board::before {
          content: "";
          position: absolute;
          inset: 8px;
          border: 2px solid rgba(255,227,173,0.38);
          border-radius: 10px;
          pointer-events: none;
        }

        .paper {
          position: relative;
          min-height: 420px;
          border-radius: 6px;
          padding: 22px 18px 16px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.96), rgba(246,246,246,0.95)),
            repeating-linear-gradient(180deg, transparent, transparent 27px, rgba(10,20,30,0.035) 28px);
          border: 1px solid #bcc3cc;
          box-shadow: inset 0 0 30px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .paper::before,
        .paper::after {
          content: "";
          position: absolute;
          top: 10px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ff8d84, #c91e12 70%);
          box-shadow: 3px 4px 8px rgba(0,0,0,0.3);
        }

        .paper::before { left: 10px; }
        .paper::after { right: 10px; }

        .paper-curl {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 82px;
          height: 82px;
          background: linear-gradient(135deg, transparent 0%, transparent 45%, #dfe3e8 46%, #f7f8fa 60%, #eceff2 100%);
          border-top-left-radius: 90px;
          filter: drop-shadow(-6px -4px 6px rgba(0,0,0,0.18));
          pointer-events: none;
        }

        .nb-title {
          margin: 0 0 12px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: #112b40;
          text-align: center;
        }

        .nb-latest {
          border: 1px solid #c6d2df;
          border-left: 6px solid #1f7ae0;
          border-radius: 10px;
          background: #f8fbff;
          padding: 12px;
          margin-bottom: 14px;
        }

        .nb-badge {
          display: inline-block;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          color: #fff;
          border-radius: 999px;
          font-size: 0.74rem;
          padding: 4px 9px;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }

        .nb-latest h2 {
          margin: 0 0 6px;
          font-size: 1.2rem;
          color: #0f172a;
        }

        .nb-latest p {
          margin: 0;
          color: #475569;
          line-height: 1.55;
        }

        .nb-meta {
          display: grid;
          gap: 6px;
          margin-top: 8px;
          font-size: 0.86rem;
          color: #475467;
        }

        .nb-meta div {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .nb-grid {
          display: grid;
          gap: 10px;
        }

        .nb-item {
          border: 1px solid #d7dee5;
          border-radius: 10px;
          background: #fff;
          padding: 10px;
        }

        .nb-item h3 {
          margin: 0 0 5px;
          font-size: 1rem;
          color: #0f172a;
        }

        .nb-item p {
          margin: 0;
          font-size: 0.9rem;
          color: #64748b;
        }

        .nb-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }

        .nb-btn {
          border: 1px solid #cdd8e3;
          border-radius: 9px;
          background: #fff;
          padding: 8px 10px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #334155;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .nb-btn-wa {
          background: #e9fdf1;
          color: #0f7a3f;
          border-color: #ace8c2;
        }

        .ticker {
          margin-top: 14px;
          border-radius: 8px;
          border: 1px solid #d7dee5;
          overflow: hidden;
          background: #fff8e8;
          color: #7a4f00;
          font-weight: 600;
        }

        .ticker-track {
          display: inline-block;
          min-width: 100%;
          padding: 8px 0;
          white-space: nowrap;
          animation: ticker 24s linear infinite;
        }

        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .nb-empty,
        .nb-error {
          border-radius: 10px;
          padding: 12px;
          margin-top: 12px;
        }

        .nb-empty {
          border: 1px dashed #cbd5e1;
          background: #f8fbff;
          color: #64748b;
        }

        .nb-error {
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }
      `}</style>

      <main className="nb-page">
        <div className="nb-wrap">
          <motion.section
            className="wood-board"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="paper">
              <h1 className="nb-title">School Notice Board</h1>

              {latest ? (
                <div className="nb-latest">
                  <span className="nb-badge">Latest Added Notice</span>
                  <h2>{latest.title}</h2>
                  <p>{latest.summary || "No summary available."}</p>
                  <div className="nb-meta">
                    <div><FaCalendarAlt /> {formatDateTime(latest.startIso)}</div>
                    <div><FaClock /> {new Date(latest.startIso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}</div>
                    <div><FaMapMarkerAlt /> {latest.place || "School Campus"}</div>
                  </div>

                  <div className="nb-actions">
                    <button type="button" className="nb-btn" onClick={() => handleShare(latest)}><FaShareAlt /> Share</button>
                    <button type="button" className="nb-btn nb-btn-wa" onClick={() => handleWhatsappShare(latest)}><FaWhatsapp /> WhatsApp</button>
                    <button type="button" className="nb-btn" onClick={() => openGoogleCalendar(latest)}><FaCalendarPlus /> Calendar</button>
                  </div>
                </div>
              ) : (
                !loading && <div className="nb-empty">No notice available yet.</div>
              )}

              <div className="nb-grid">
                {recent.map((n) => (
                  <article key={n._id} className="nb-item">
                    <h3>{n.title}</h3>
                    <p>{n.summary || "-"}</p>
                  </article>
                ))}
              </div>

              <div className="ticker">
                <div className="ticker-track">{tickerText}</div>
              </div>

              <div className="paper-curl" />
            </div>
          </motion.section>

          {error && <div className="nb-error">{error}</div>}
        </div>
      </main>
    </>
  );
}
