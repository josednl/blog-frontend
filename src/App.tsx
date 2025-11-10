import { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

function App() {
  const navigation = useNavigation();

  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      {/* <Navbar /> */}
      <main className='grow'>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App
