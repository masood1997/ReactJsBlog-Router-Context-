import { BlogContext } from './BlogContext';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = '/user/register';
const LOGIN_URL = '/user/login';

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
  
  const [user, setUser] = useState('');
  const [validUser, setValidUser] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const [submitErrorMsg, setSubmitErrorMsg] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState({});
  const [ persistent, setPersistent] = useState(JSON.parse(localStorage.getItem("persist")) || false);
  //const { data, fetchError } = useAxiosFetch('http://localhost:4000/posts');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setIsMatch(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    localStorage.setItem('persist', persistent);
  }, [persistent]);

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(REGISTER_URL, { name: user, password, email });
      // Your backend server sends response which you consume here
      const accessToken = response?.data?.accessToken;
      //console.log(accessToken);
      setIsAuthenticated({ accessToken });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/');
    } catch (error) {
      console.log(error?.response?.status);
      console.log(error?.response?.data?.message);
      setSubmitErrorMsg(error?.response?.data?.message);
    }
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    // setSubmitErrorMsg("Error while logging In")
    try {
      const response = await api.post(LOGIN_URL, { email, password });
      const accessToken = response?.data?.accessToken;
      // console.log("displaying in blogcontext ",accessToken);
      setIsAuthenticated({ accessToken: accessToken });
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error?.response?.status);
      console.log(error?.response?.data?.message);
      setSubmitErrorMsg(error?.response?.data?.message);
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
        user,
        setUser,
        email,
        setEmail,
        validEmail,
        validUser,
        setValidUser,
        password,
        setPassword,
        validPassword,
        setValidPassword,
        confirmPassword,
        setConfirmPassword,
        isMatch,
        setIsMatch,
        submitErrorMsg,
        setSubmitErrorMsg,
        handleRegisterForm,
        handleLoginForm,
        isAuthenticated,
        setIsAuthenticated,
        persistent,
        setPersistent
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
