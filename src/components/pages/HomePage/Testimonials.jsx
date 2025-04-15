import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rafiq Hasan",
      quote:
        "Focus Nest changed how I manage my class rep tasks. Total game changer!",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Sabina Sultana",
      quote:
        "The money manager and planner tools are so helpful for keeping my life sorted.",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Fahim Rahman",
      quote:
        "I love the clean UI and motivational quotes. Makes me want to be better every day.",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-14"
        >
          What Users Are Saying
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-left hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-500"
                />
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    {t.name}
                  </h4>
                </div>
              </div>
              <p className="text-gray-600 italic">{`"${t.quote}"`}</p>
            </motion.div>
          ))}
        </div>

        {/* Stylish See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-medium text-sm shadow hover:bg-indigo-700 transition-all duration-300 hover:scale-105">
            See More
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
