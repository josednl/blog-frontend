import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import PostDetail from '@/pages/PostDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { Profile } from '@/pages/Profile';

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
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ]
  }
]);

export default router;
