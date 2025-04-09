/* eslint-disable no-unused-vars */
import {
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiMenu,
  FiUser,
  FiX,
  FiLogOut,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import useOperation from "../../../../hooks/useOperation";

// eslint-disable-next-line react/prop-types
const HomeNav = ({ children }) => {
  const { user, signOutUser } = useOperation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //  Menu Items here
  const menuItems = [
    {
      name: "My Profile",
      path: "/profile",
      icon: <FiUser className="text-lg" />,
    },
    {
      name: "Money Management",
      path: "/money",
      icon: <FiDollarSign className="text-lg" />,
    },
    {
      name: "Time Analytics",
      path: "/time",
      icon: <FiClock className="text-lg" />,
    },
  ];

  const additionalMenuItems = [
    // { name: "Settings", icon: <FiSettings className="text-lg" /> },
    // { name: "Help Center", icon: <FiHelpCircle className="text-lg" /> },
    {
      name: "Sign Out",
      icon: <FiLogOut className="text-lg" />,
      isSignOut: true,
    },
  ];

  return (
    <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around h-16 items-center">
          {/* Logo and Desktop Menu */}
          <Link
            to="/"
            onClick={() => {
              setActiveTab("Home");
              setIsMobileMenuOpen(false);
            }}
            className="text-2xl font-bold tracking-wide text-white/90 hover:text-white transition-colors"
          >
            Focus Nest
          </Link>
          <div className="flex items-center">
            <div className="hidden md:block ml-10">
              <div className="flex space-x-1">
                {menuItems.map((item) => (
                  <Link
                    to={item.path}
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base font-medium ${
                      activeTab === item.name
                        ? "bg-indigo-700 text-white shadow-md"
                        : "text-indigo-100 hover:bg-indigo-500/50 hover:text-white"
                    }`}
                    aria-current={activeTab === item.name ? "page" : undefined}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="hidden sm:inline">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          {user ? (
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 rounded-full transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                id="user-menu"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <img
                  className="h-10 w-10 rounded-full ring-2 ring-white/80 hover:ring-indigo-300 transition duration-300"
                  src={user.photoURL}
                  alt="User profile"
                />
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown className="ml-1 text-xl text-white/80" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-xl py-1 bg-white ring-1 ring-black/10 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        <p className="text-xs text-indigo-600">
                          {user.displayName}
                        </p>
                        ({user.email})
                      </p>
                    </div>
                    <div className="py-1">
                      {[...menuItems, ...additionalMenuItems].map((item) => (
                        <Link
                          key={item.name}
                          to={item.path || "#"}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                            item.isSignOut
                              ? "text-red-600 hover:bg-red-50"
                              : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-900"
                          }`}
                          onClick={() => {
                            setActiveTab(item.name);
                            if (item.isSignOut) {
                              signOutUser();
                            }
                            setIsMenuOpen(false);
                          }}
                        >
                          <span
                            className={`text-lg ${
                              item.isSignOut
                                ? "text-red-500"
                                : "text-indigo-600"
                            }`}
                          >
                            {item.icon}
                          </span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link
                to="/signin"
                className="px-2 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-indigo-600 hover:to-pink-600 shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-2 py-2 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-indigo-700 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${
                    activeTab === item.name
                      ? "bg-indigo-800 text-white"
                      : "text-indigo-100 hover:bg-indigo-600"
                  } transition-colors`}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile profile area */}
            <div className="pt-4 pb-3 border-t border-indigo-600/50">
              <div className="flex items-center px-5 pb-3">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full ring-2 ring-indigo-300"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-bold text-white">
                    User Name
                  </div>
                  <div className="text-sm font-medium text-indigo-200">
                    user@focusnest.com
                  </div>
                </div>
              </div>
              <div className="px-2 space-y-1">
                {additionalMenuItems.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base ${
                      item.isSignOut
                        ? "text-red-200 hover:bg-red-600/30"
                        : "text-indigo-200 hover:bg-indigo-600"
                    } font-medium transition-colors`}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HomeNav;
