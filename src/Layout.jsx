import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import  BlogContextProvider from './context/BlogContextProvider';

function Layout() {
  return (
    <main>
      <BlogContextProvider>
        <Header title="ReactJs Blog" />
        <Navbar/>
        <Outlet />
        {/* <Footer /> */}
      </BlogContextProvider>
    </main>
  );
}

export default Layout;
