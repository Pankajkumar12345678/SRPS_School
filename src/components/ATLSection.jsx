import React from "react";
import { motion } from "framer-motion";
import { Cpu, Rocket, Lightbulb, PenTool as Tool } from "lucide-react";

const ATLSection = () => {
  const features = [
    {
      title: "Robotics & AI",
      desc: "Hands-on learning with Arduino, sensors and intelligent systems.",
      icon: <Cpu size={30} />,
    },
    {
      title: "3D Design & Printing",
      desc: "Transforming ideas into real-world prototypes.",
      icon: <Tool size={30} />,
    },
    {
      title: "IoT Innovation",
      desc: "Building smart connected solutions for modern challenges.",
      icon: <Lightbulb size={30} />,
    },
  ];

  return (
    <section className="py-24 bg-[#F8F3E9] relative overflow-hidden">
      {/* Soft Background Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E6B87A]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#155E75]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-[#155E75] font-semibold tracking-widest uppercase text-sm">
              Atal Tinkering Lab
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-[#0F4C5C] mt-4 mb-6 leading-tight">
              Where Curiosity
              <span className="block text-[#E6B87A]">Meets Innovation</span>
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Supported by NITI Aayog, our ATL empowers students from Class VI
              to XII with hands-on exposure to Robotics, Artificial
              Intelligence, IoT, and Design Thinking. We nurture problem-solvers
              and future innovators.
            </p>

            {/* Feature Cards */}
            <div className="grid gap-6">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-[#E6B87A]/20"
                >
                  <div className="bg-[#155E75]/10 text-[#155E75] p-3 rounded-xl">
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#0F4C5C] text-lg">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#155E75]/10">
              <img
                src="https://media.istockphoto.com/id/2148372997/photo/modern-empty-science-laboratory-with-computers-microscopes-test-tubes-and-other-laboratory.jpg?s=612x612&w=0&k=20&c=wvwSiZtPwMOEbMrCpjy5mRLFahu00C6ui0tuB0j3Nt4="
                alt="SRPS Atal Tinkering Lab"
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#155E75] text-white px-6 py-4 rounded-2xl shadow-lg">
              <p className="text-xs uppercase tracking-wider">Established</p>
              <p className="text-xl font-bold text-[#E6B87A]">Since 2012</p>
            </div>

            {/* Decorative Rocket */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-6 -right-6 bg-[#E6B87A] p-6 rounded-2xl shadow-lg hidden md:block"
            >
              <Rocket className="text-white" size={32} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ATLSection;
