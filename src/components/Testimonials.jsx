import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Mrs. Aakansha Gupta",
    role: "Parent",
    content:
      "Choosing Shree Ram Public School was the best decision we made for our daughter. The personalized attention she receives has helped her thrive both academically and socially. We’re so grateful for the caring teachers and staff!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mr. Rajesh Sharma",
    role: "Parent",
    content:
      "The school provides an excellent environment for holistic development. My son has become more confident and loves going to school every day.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ms. Priya Singh",
    role: "Student (Class X)",
    content:
      "I have been here since nursery. The teachers are very supportive and the facilities are top-notch. I feel prepared for my future.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Voices of Our School Community
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          What Our Parents & Students Say About Us
        </p>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-700 italic mb-4">
                "{testimonials[current].content}"
              </p>
              <h4 className="font-bold text-blue-900">
                {testimonials[current].name}
              </h4>
              <p className="text-gray-500">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <FiChevronLeft className="text-2xl text-blue-900" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <FiChevronRight className="text-2xl text-blue-900" />
          </button>
        </div>

        <div className="mt-8">
          <button className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition">
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
