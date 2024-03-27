import { BlogContext } from './BlogContext';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

import React from 'react';

const BlogContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const { data, fetchError } = useAxiosFetch('http://localhost:4000/posts');
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchError) setPosts(data);
    setError(fetchError);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleDeletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== Number(id)));
      navigate('/');
    } catch (error) {
      console.log(`Error:${error.message}`);
    }
  };

  const handleAddNewPost = async (e) => {
    e.preventDefault();
    try {
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const response = await api.post('/posts', { id, title, author, description });
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setTitle('');
      setAuthor('');
      setDescription('');
      navigate('/');
    } catch (error) {
      console.log(`Error occured while creating post: ${error.message}`);
    }
  };

  const handleEditPost = async (id) => {
    try{
      const response = await api.put(`/posts/${id.toString()}`,{id,title:editTitle,description:editDescription,author});
      setPosts((prevPost)=>prevPost.map(post=>post.id===id ? response.data : post ))
      setEditTitle('')
      setEditDescription('')
      navigate('/');
    }catch(error){
      console.log(`Error occured while updating post: ${error.message}`);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        setPosts,
        search,
        setSearch,
        searchResults,
        setSearchResults,
        error,
        setError,
        title,
        setTitle,
        description,
        setDescription,
        author,
        setAuthor,
        editTitle,
        setEditTitle,
        editDescription,
        setEditDescription,
        handleDeletePost,
        handleAddNewPost,
        handleEditPost
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
