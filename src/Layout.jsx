import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import BlogContextProvider from './context/BlogContextProvider';

function Layout() {
  return (
    <main>
      <BlogContextProvider>
        <div className="flex flex-col h-screen">
          <Header title="ReactJs Blog" />
          <Navbar />
          <Outlet className="flex-grow overflow-y-auto"/>
          {/* <Footer /> */}
        </div>
      </BlogContextProvider>
    </main>
  );
}

export default Layout;
