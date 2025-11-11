import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let title = "Something went wrong";
  let message = "An unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page not found";
      message = "Sorry, the page you're looking for doesn't exist.";
    } else if (error.status === 500) {
      title = "Internal server error";
      message = "Something went wrong on our side. Please try again later.";
    } else {
      title = `Error ${error.status}`;
      message = error.statusText || message;
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
      <div className="max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">{message}</p>

        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700 dark:hover:bg-indigo-500 transition"
        >
          Go back home
        </Link>
      </div>

      <p className="text-gray-400 dark:text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} My Blog
      </p>
    </main>
  );
};

export default ErrorPage;
