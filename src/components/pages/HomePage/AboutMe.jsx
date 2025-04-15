import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaFileDownload,
} from "react-icons/fa";
import {
  Briefcase,
  BookOpenCheck,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [nameText, setNameText] = useState("");
  const [nameComplete, setNameComplete] = useState(false);
  const fullName = "Dhananjoy Chandra Das";
  const ref = useRef(null);

  // Typing animation effect
  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setNameText(fullName.substring(0, currentIndex));
        currentIndex++;
      } else {
        setNameComplete(true);
        clearInterval(typingInterval);
      }
    }, 100); // Typing speed

    return () => clearInterval(typingInterval);
  }, [isVisible]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: { duration: 0.4 },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: {
        delay: 1.2 + i * 0.15,
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    }),
    hover: { y: -5, scale: 1.1 },
    tap: { scale: 0.9 },
  };

  const textHighlightVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden"
      id="about"
    >
      {/* Floating animated elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-indigo-100 opacity-50"
        animate={{
          y: [0, 30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-indigo-200 opacity-30"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-100 opacity-40"
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-indigo-700"
            >
              Meet the Creator
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"
            />
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="relative">
            {/* Profile Image with animated border */}
            {isVisible && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                whileHover="hover"
                className="w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl mx-auto lg:mx-0 relative group"
              >
                <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
                <img
                  src="../../../../public/FocusNestOwner.jpg"
                  alt="Dhananjoy Chandra Das"
                  className="object-cover w-full h-full"
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-transparent"
                  animate={{
                    borderColor: [
                      "rgba(99, 102, 241, 0)",
                      "rgba(99, 102, 241, 0.8)",
                      "rgba(99, 102, 241, 0)",
                    ],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            )}

            {/* Social Links with staggered animation */}
            <motion.div className="flex gap-5 mt-8 justify-center">
              {[
                {
                  icon: <FaFacebook />,
                  label: "Facebook",
                  color: "text-blue-600",
                  link: "https://www.facebook.com/Official.DhananjoyCD",
                },
                {
                  icon: <FaLinkedin />,
                  label: "LinkedIn",
                  color: "text-blue-700",
                  link: "https://www.linkedin.com/in/dhananjoycd/",
                },
                {
                  icon: <FaGithub />,
                  label: "GitHub",
                  color: "text-gray-800",
                  link: "https://github.com/dhananjoycd",
                },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  custom={i}
                  variants={socialIconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Info Section */}
          {isVisible && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-left max-w-2xl"
            >
              {/* Name with typing animation */}
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 min-h-[3rem]"
                variants={itemVariants}
              >
                {nameText}
                {!nameComplete && (
                  <motion.span
                    className="inline-block w-1 h-8 bg-indigo-600 align-middle ml-1"
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.h3>

              {/* Description with animated highlights */}
              <motion.p
                variants={itemVariants}
                className="text-gray-700 mb-6 text-lg leading-relaxed"
              >
                I&apos;m a{" "}
                <span className="font-semibold text-indigo-600 relative inline-block">
                  Mathematics student
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
                    variants={textHighlightVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.4 }}
                  />
                </span>{" "}
                at the University of Rajshahi, a passionate{" "}
                <span className="font-semibold text-indigo-600 relative inline-block">
                  MERN Stack Web Developer
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
                    variants={textHighlightVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.6 }}
                  />
                </span>
                , a{" "}
                <span className="font-semibold text-indigo-600 relative inline-block">
                  teacher
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
                    variants={textHighlightVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.8 }}
                  />
                </span>{" "}
                at Anirban coaching center, and a rising{" "}
                <span className="font-semibold text-indigo-600 relative inline-block">
                  researcher
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
                    variants={textHighlightVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 2.0 }}
                  />
                </span>{" "}
                focused on social epidemic diseases and the technological impact
                of AI.
              </motion.p>

              {/* Info cards with staggered animation */}
              <motion.div
                variants={containerVariants}
                className="space-y-4 mb-8"
              >
                {[
                  {
                    icon: (
                      <GraduationCap className="flex-shrink-0 text-indigo-600 w-5 h-5 mt-0.5" />
                    ),
                    text: "B.Sc. (Hons.) in Mathematics, University of Rajshahi",
                    delay: 1.4,
                  },
                  {
                    icon: (
                      <Briefcase className="flex-shrink-0 text-indigo-600 w-5 h-5 mt-0.5" />
                    ),
                    text: "Junior MERN Stack Developer & Educator",
                    delay: 1.6,
                  },
                  {
                    icon: (
                      <Lightbulb className="flex-shrink-0 text-indigo-600 w-5 h-5 mt-0.5" />
                    ),
                    text: "Executive Member, RU Research Society",
                    delay: 1.8,
                  },
                  {
                    icon: (
                      <BookOpenCheck className="flex-shrink-0 text-indigo-600 w-5 h-5 mt-0.5" />
                    ),
                    text: "Passionate about motivation, productivity & tech education",
                    delay: 2.0,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -5, 0],
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <p className="text-gray-700">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Resume Download Button with pulse animation */}
      <motion.div
        className="mt-2 flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.a
          href="../../../../public/Dhananjoy_Chandra_Das_CV Final.pdf"
          download
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 4px 14px 0 rgba(99, 102, 241, 0.3)",
              "0 6px 20px 0 rgba(99, 102, 241, 0.4)",
              "0 4px 14px 0 rgba(99, 102, 241, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <FaFileDownload className="text-lg" />
          <span>Download Resume</span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default AboutMe;
