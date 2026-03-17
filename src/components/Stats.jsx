import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Dummy data
const dummyStats = {
  students: 1034,
  years: 13,
  transport: 21,
  teachers: 64,
};

const StatItem = ({ value, label, icon }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1, opacity: 1 });
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps approx
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg text-center"
    >
      <div className="text-4xl text-blue-900 mb-2">{icon}</div>
      <div className="text-4xl font-bold text-blue-900">{count}</div>
      <div className="text-gray-600 uppercase text-sm">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem
            value={dummyStats.students}
            label="NUMBER OF STUDENTS"
            icon="👩‍🎓"
          />
          <StatItem
            value={dummyStats.years}
            label="YEARS EXPERIENCE"
            icon="⏳"
          />
          <StatItem value={dummyStats.transport} label="TRANSPORT" icon="🚌" />
          <StatItem value={dummyStats.teachers} label="TEACHERS" icon="👩‍🏫" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
