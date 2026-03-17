import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function usePageContent(slug, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/page-content/${slug}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (mounted) setData({ ...fallback, ...json });
      } catch {
        if (mounted) setError("Live content unavailable. Showing demo content.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  return { data, loading, error };
}
