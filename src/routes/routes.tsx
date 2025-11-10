import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
      }
    ]
  }
]);

export default router;
