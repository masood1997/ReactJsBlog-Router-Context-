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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="github" loader = {gitHubLoader} element={<Github />} />
      <Route path="new" element={<NewPost />} />
      <Route path="post/:id" element={<PostPage />} />
      <Route path="edit/:id" element = {<EditPost/>}/>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
