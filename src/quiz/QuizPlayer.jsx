import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { quizService } from "../services/quizService.js";

export default function QuizPlayer({ quiz, attemptToken, onFinished }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [textAnswers, setTextAnswers] = useState({});
  const [timeMap, setTimeMap] = useState({});
  const [left, setLeft] = useState(quiz?.questions?.[0]?.timerSec || 30);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const questions = quiz?.questions || [];
  const current = questions[index];
  const isTextType = ["fill_blank", "short_answer"].includes(current?.type);

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round(((index + 1) / questions.length) * 100);
  }, [index, questions.length]);

  useEffect(() => {
    setLeft(current?.timerSec || 30);
  }, [index, current?.timerSec]);

  const getSpent = useCallback(() => Math.max(0, (current?.timerSec || 30) - left), [current?.timerSec, left]);

  const persistTime = useCallback(() => {
    if (!current) return;
    setTimeMap((prev) => ({
      ...prev,
      [current._id]: Math.max(prev[current._id] || 0, getSpent()),
    }));
  }, [current, getSpent]);

  const handleAutoNext = useCallback(() => {
    persistTime();
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setFeedback("");
    }
  }, [index, questions.length, persistTime]);

  const next = () => {
    persistTime();
    if (index < questions.length - 1) setIndex(index + 1);
    setFeedback("");
  };

  const prev = () => {
    persistTime();
    if (index > 0) setIndex(index - 1);
    setFeedback("");
  };

  const submit = useCallback(async () => {
    try {
      setSubmitting(true);
      setError("");
      persistTime();
      const answers = questions.map((q) => ({
        questionId: q._id,
        selectedIndex:
          typeof selected[q._id] === "number" ? Number(selected[q._id]) : null,
        answerText: textAnswers[q._id] || "",
        timeTakenSec: timeMap[q._id] || (q._id === current?._id ? getSpent() : 0),
      }));

      const result = await quizService.submitQuiz(quiz._id, { attemptToken, answers });
      onFinished(result);
    } catch (err) {
      setError(err.message || "Unable to submit quiz");
    } finally {
      setSubmitting(false);
    }
  }, [attemptToken, current?._id, getSpent, onFinished, persistTime, quiz._id, questions, selected, textAnswers, timeMap]);

  useEffect(() => {
    if (!current || submitting) return;

    if (left <= 0) {
      if (index < questions.length - 1) {
        handleAutoNext();
      } else {
        submit();
      }
      return;
    }

    const id = setTimeout(() => setLeft((v) => Math.max(0, v - 1)), 1000);
    return () => clearTimeout(id);
  }, [current, submitting, left, index, questions.length, handleAutoNext, submit]);

  if (!current) return null;

  return (
    <div className="qz-play-wrap">
      <div className="qz-progress">
        <div className="qz-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="qz-meta">
        <span>Question {index + 1}/{questions.length}</span>
        <span>Type: {String(current.type || "mcq").replace("_", " ")}</span>
        <span>Marks: {current.marks}</span>
        <span>Timer: {left}s</span>
      </div>

      <motion.div
        key={current._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="qz-question"
      >
        <h3>{current.text}</h3>
        {current.imageUrl && <img src={current.imageUrl} alt="question media" style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 10, marginBottom: 8 }} />}
        {current.audioUrl && (
          <audio controls style={{ width: "100%", marginBottom: 8 }}>
            <source src={current.audioUrl} />
          </audio>
        )}
        {current.videoUrl && (
          <video controls style={{ width: "100%", maxHeight: 240, borderRadius: 10, marginBottom: 8 }}>
            <source src={current.videoUrl} />
          </video>
        )}
        {current.chartText && <p style={{ marginTop: 0, color: "#475569", fontSize: ".87rem" }}>{current.chartText}</p>}
        <div className="qz-options">
          {isTextType ? (
            <input
              type="text"
              className="qz-opt"
              value={textAnswers[current._id] || ""}
              onChange={(e) => setTextAnswers((p) => ({ ...p, [current._id]: e.target.value }))}
              placeholder="Type your answer..."
            />
          ) : (
            current.options.map((opt, i) => (
              <button
                key={`${current._id}-${i}`}
                type="button"
                className={`qz-opt ${selected[current._id] === i ? "active" : ""}`}
                onClick={() => {
                  setSelected((p) => ({ ...p, [current._id]: i }));
                  if (quiz.immediateFeedback && typeof current.correctOptionIndex === "number") {
                    setFeedback(i === current.correctOptionIndex ? "Correct answer selected." : "Try again or move to next.");
                  }
                }}
              >
                <strong>{String.fromCharCode(65 + i)}.</strong> {opt.text}
              </button>
            ))
          )}
        </div>
        {quiz.immediateFeedback && feedback && <div style={{ marginTop: 8, color: "#0f5132", fontSize: ".84rem" }}>{feedback}</div>}
        {current.hint && <div style={{ marginTop: 8, color: "#92400e", fontSize: ".82rem" }}>Hint: {current.hint}</div>}
      </motion.div>

      {error && <div className="qz-error">{error}</div>}

      <div className="qz-actions">
        <button type="button" className="qz-btn" onClick={prev} disabled={index === 0}>
          Previous
        </button>
        {index < questions.length - 1 ? (
          <button type="button" className="qz-btn qz-btn-pr" onClick={next}>
            Next
          </button>
        ) : (
          <button type="button" className="qz-btn qz-btn-pr" onClick={submit} disabled={submitting}>
            {submitting ? "Submitting..." : "Finish Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
