import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFlask, FaLaptop, FaBook, FaFutbol, FaBus, FaShieldAlt } from 'react-icons/fa';

const amenitiesList = [
  { icon: <FaFlask />, label: 'Science Labs' },
  { icon: <FaLaptop />, label: 'Computer Lab' },
  { icon: <FaBook />, label: 'Library' },
  { icon: <FaFutbol />, label: 'Sports Ground' },
  { icon: <FaBus />, label: 'Transport' },
  { icon: <FaShieldAlt />, label: 'CCTV Security' },
];

const Amenities = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">Creating the Perfect Learning Environment</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          At Shree Ram Public School, we take great pride in providing our students with a diverse range of modern, well-equipped facilities designed to support both academic excellence and personal growth.
        </p>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {amenitiesList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="text-4xl text-blue-900 mb-2">{item.icon}</div>
              <span className="text-center font-medium text-gray-700">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;