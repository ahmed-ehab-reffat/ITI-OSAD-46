import {Outlet} from 'react-router';
import MainNavigation from '../components/MainNavigation';
import Footer from '../components/Footer';

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MainNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
