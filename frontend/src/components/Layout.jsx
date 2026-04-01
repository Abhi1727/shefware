import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="page-shell">
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
