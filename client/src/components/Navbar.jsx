import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/authContext.jsx";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-sm"></div>
              <div className="absolute inset-0.5 bg-black rounded-full flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold text-xl">
                  Q
                </span>
              </div>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              QuizMaster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="#como-funciona"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Cómo Funciona
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/home"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/create-quiz"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Crear Quiz
                  </Link>
                )}
                <Link
                  to="/"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                  onClick={() => logout()}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4 bg-black/70 backdrop-blur-sm p-4 rounded-lg">
            <Link
              to="#como-funciona"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Cómo Funciona
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/home"
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Inicio
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/create-quiz"
                    className="text-slate-300 hover:text-white transition-colors text-left"
                  >
                    Crear Quiz
                  </Link>
                )}
                <Link
                  to="/"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all w-full text-center"
                  onClick={() => logout()}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all w-full text-center"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
