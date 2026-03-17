import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const reasons = [
  {
    title: "EXPERT FACULTY MEMBERS",
    description:
      "Our team comprises highly qualified teachers, skilled and extensively trained to nurture young minds.",
    icon: "🧑‍🏫",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "CO-CURRICULAR ACTIVITIES",
    description:
      "A wide range of activities including arts, sports, yoga, dance, music, and swimming to ensure well-rounded development.",
    icon: "⚽",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072013579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ADVANCED INFRASTRUCTURE",
    description:
      "Cutting-edge facilities featuring air-conditioned classrooms, multimedia teaching tools, smart boards, and comprehensive CCTV.",
    icon: "🏫",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "MONTESSORI LAB",
    description:
      "A dedicated space for experiential learning, offering hands-on experiences that lay a strong foundation for future academic excellence.",
    icon: "🔬",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const WhyUs = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
          Fostering Comprehensive Growth
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;






