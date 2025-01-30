
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../ultilities/providers/AuthProvider";
import useUser from "../../hooks/useUser";

// Navigation links
const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];

// MUI Theme
const theme = createTheme({
  palette: {
    primary: { main: "#ff0000" },
    secondary: { main: "#00ff00" },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  const { currentUser } = useUser();

  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navBg, setNavBg] = useState("bg-transparent");

  // Mobile menu toggle
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Handle Dark Mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Scroll handling for Navbar background
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      setNavBg("bg-white dark:bg-black");
    } else {
      setNavBg(location.pathname === "/" ? "bg-transparent" : "bg-white dark:bg-black");
    }
  }, [scrollPosition, location.pathname]);

  // Logout function
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout me!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => Swal.fire("Logged Out!", "You Successfully Logged Out.", "success"))
          .catch((err) => Swal.fire("Error!", err.message, "error"));
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${navBg} fixed top-0 w-full z-10 transition-colors duration-500 ease-in-out`}
    >
      <div className="max-w-[95%] mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div onClick={() => navigate("/")} className="flex items-center cursor-pointer">
            <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3">
              Yoga Master <img src="/yoga-logo.png" alt="logo" className="w-8 h-8" />
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white focus:outline-none" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6 text-primary" /> : <FaBars className="w-6 h-6 hover:text-primary" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-black dark:text-white">
            {navLinks.map((link) => (
              <NavLink
                key={link.route}
                to={link.route}
                className={({ isActive }) =>
                  `font-bold hover:text-secondary transition duration-300 ${
                    isActive ? "text-secondary" : navBg.includes("bg-transparent") ? "text-white" : "text-black dark:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Authentication Links */}
            {user ? (
              <>
                <NavLink to="/dashboard" className="font-bold hover:text-secondary transition duration-300">
                  Dashboard
                </NavLink>
                <button onClick={handleLogout} className="font-bold px-3 py-2 bg-secondary text-white rounded-xl">
                  Logout
                </button>
                {currentUser?.photoURL && <img src={currentUser.photoURL} alt="User" className="h-10 w-10 rounded-full" />}
              </>
            ) : location.pathname === "/login" ? (
              <NavLink to="/register" className="font-bold hover:text-secondary transition duration-300">
                Register
              </NavLink>
            ) : (
              <NavLink to="/login" className="font-bold hover:text-secondary transition duration-300">
                Login
              </NavLink>
            )}

            {/* Dark Mode Toggle */}
            <ThemeProvider theme={theme}>
              <div className="flex flex-col items-center">
                <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                <h1 className="text-xs">Light/Dark</h1>
              </div>
            </ThemeProvider>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-75 flex items-center justify-center md:hidden">
          <div className="bg-white dark:bg-gray-900 w-3/4 max-w-sm rounded-lg shadow-lg p-6 relative">
            <button className="absolute top-4 right-4 text-gray-800 dark:text-white" onClick={toggleMobileMenu}>
              <FaTimes size={26} />
            </button>
            <ul className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <li key={link.route}>
                  <NavLink
                    to={link.route}
                    className="text-lg font-medium text-gray-700 dark:text-white hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {user ? (
                <>
                  <li>
                    <NavLink to="/dashboard" className="text-lg font-medium dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to={location.pathname === "/login" ? "/register" : "/login"} className="text-lg font-medium dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                    {location.pathname === "/login" ? "Register" : "Login"}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
