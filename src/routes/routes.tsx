import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import PostDetail from '@/pages/PostDetail';
import Login from '@/pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "posts/:id",
        element: <PostDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ]
  }
]);

export default router;
