import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About - MyBlog";
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          About MyBlog
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          <strong>MyBlog</strong> is a modern blogging platform built for creators, writers,
          and storytellers. Whether you're sharing ideas, tutorials, or personal
          experiences, MyBlog helps you connect with your audience in a beautiful,
          distraction-free environment.
        </p>

        <p>
          This project is developed using <strong>React</strong> on the frontend and
          <strong> Node.js</strong> + <strong>Express</strong> on the backend. It supports
          user authentication, profile management, dark mode, and more.
        </p>

        <p>
          Our goal is to provide a lightweight, extensible foundation for blogs that value
          simplicity, performance, and customization.
        </p>

        <p className="italic text-gray-500 dark:text-gray-400 mt-4">
          “Write freely. Share boldly. Inspire endlessly.”
        </p>
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          Made with ❤️ by the <span className="text-indigo-600 dark:text-indigo-400 font-medium">MyBlog</span> team.
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
