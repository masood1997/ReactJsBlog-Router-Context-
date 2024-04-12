import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Layout.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Error from './components/Error.jsx';
import Github, { gitHubLoader } from './components/Github/Github.jsx';
import PostPage from './components/PostPage/PostPage.jsx';
import NewPost from './components/NewPost/NewPost.jsx';
import EditPost from './components/EditPost/EditPost.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Logout from './components/Logout/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

// import { useBlog } from './context/BlogContext.js';
// const {isLoggedIn} = useBlog()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="post/:id" element={isLoggedIn ? <PostPage /> : <Login />} /> */}
      //Protected Routes
      <Route element={<ProtectedRoute />}>
        <Route path="" element={<Home />} />
        <Route path="github" loader={gitHubLoader} element={<Github />} />
        <Route path="new" element={<NewPost />} />
        <Route path="post/:_id" element={<PostPage />} />
        <Route path="edit/:_id" element={<EditPost />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
