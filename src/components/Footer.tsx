const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        
        <div className="flex space-x-4">
          <a
            href="/"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            About
          </a>
          <a
            href="/login"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Login
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
