import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Dummy notices
const notices = [
  {
    date: "JAN 15 2025",
    title: "Notice: Class Photograph for Session 2024-25",
    description:
      "Dear Parents, Greetings of the day! We hope this message finds you in...",
  },
  {
    date: "JAN 18 2025",
    title: "Mandatory PTM - PA II & Pre-Board Results",
    description:
      "Dear Parents, We are pleased to inform you that the Parent-Teacher Meeting...",
  },
  {
    date: "SEP 2 2025",
    title: "Gate Timings for Walkers",
    description:
      "Dear Parents, Please be advised that, effective Monday, September 2nd, 2024, the gates...",
  },
];

const Notices = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
          Recent Notices
        </h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map((notice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <p className="text-sm text-blue-600 font-semibold">
                {notice.date}
              </p>
              <h3 className="text-xl font-semibold text-blue-900 mt-2 mb-3">
                {notice.title}
              </h3>
              <p className="text-gray-600">{notice.description}</p>
              <button className="mt-4 text-blue-900 font-medium hover:underline">
                Read More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notices;
