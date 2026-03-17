import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    studentName: "",
    className: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#134F5C]">
      {/* HERO */}
      <section className="bg-[#134F5C] text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">
          Shaping Futures with Values, Knowledge & Excellence
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-[#E8B97A]">
          At Shree Ram Public School, we nurture young minds with strong moral
          values, academic excellence, and innovation to prepare them for a
          successful future.
        </p>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto -mt-12 bg-white shadow-xl rounded-3xl p-10 mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          About Our School
        </h2>
        <p className="text-gray-600 text-center mb-10">
          We blend traditional values with modern education to ensure holistic
          development of every child.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg mb-3">📚 Academics</h3>
            <ul className="space-y-2 text-sm">
              <li>CBSE Curriculum</li>
              <li>Smart Classrooms</li>
              <li>Regular Assessments</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">🧪 Laboratories</h3>
            <ul className="space-y-2 text-sm">
              <li>Science Labs</li>
              <li>Computer Lab</li>
              <li>ATL Innovation Lab</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">🎭 Activities</h3>
            <ul className="space-y-2 text-sm">
              <li>Sports & Games</li>
              <li>Music & Dance</li>
              <li>Cultural Events</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 mb-20">
        {/* LEFT - DETAILS */}
        <div className="bg-white shadow-lg rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold">📍 Address</p>
              <p>Village Kanhra, Charkhi Dadri, Haryana – 127308</p>
            </div>

            <div>
              <p className="font-semibold">📞 Phone</p>
              <p>+91-8199991081</p>
            </div>

            <div>
              <p className="font-semibold">📧 Email</p>
              <p>srpskanhra@gmail.com</p>
            </div>

            <div>
              <p className="font-semibold">🕒 Timings</p>
              <p>Mon – Sat | 8:00 AM – 2:00 PM</p>
            </div>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="bg-white shadow-lg rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-xl px-4 py-3"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-xl px-4 py-3"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <textarea
              placeholder="Message"
              className="w-full border rounded-xl px-4 py-3 h-32"
              required
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button
              type="submit"
              className="w-full bg-[#134F5C] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Submit Inquiry
            </button>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-green-600 font-semibold text-center"
                >
                  ✅ Message Sent Successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  );
}
