import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, UserCircle } from "lucide-react";
import { useAuth } from "@/services/auth/authProvider";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-accent dark:text-accent"
        : "text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent/40"
    }`;

  const handleProfileClick = () => navigate("/profile");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const renderProfileImage = () => {
    if (!user) return null;

    let imageUrl: string | null = null;

    if (user.profilePicUrl) {
      imageUrl = user.profilePicUrl.startsWith("http")
        ? user.profilePicUrl
        : `${import.meta.env.VITE_API_URL || ""}${user.profilePicUrl}`;
    }

    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={user.name}
          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://via.placeholder.com/150?text=No+Photo";
          }}
        />
      );
    }

    return (
      <UserCircle className="w-7 h-7 text-gray-600 dark:text-gray-300 group-hover:text-indigo-500 transition" />
    );
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <NavLink
            to="/"
            className="text-xl font-semibold text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            MyBlog
          </NavLink>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              About
            </NavLink>

            {!user ? (
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
            ) : (
              <>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 group"
                >
                  {renderProfileImage()}
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md bg-accent text-white font-medium hover:bg-accent/50 dark:bg-accent/80 dark:hover:bg-accent/40 transition"
                >
                  Log out
                </button>
              </>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-md shadow-sm py-2">
            <NavLink
              to="/"
              className={linkClasses}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={linkClasses}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>

            {!user ? (
              <NavLink
                to="/login"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleProfileClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 w-full"
                >
                  {renderProfileImage()}
                  <span className="ml-2">Profile</span>
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 w-full text-left"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
