import React, { useRef, useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const {
    user,
    setUser,
    validUser,
    email,
    setEmail,
    validEmail,
    password,
    setPassword,
    validPassword,
    confirmPassword,
    setConfirmPassword,
    isMatch,
    submitErrorMsg,
    setSubmitErrorMsg,
    isAuthenticated,
    handleRegisterForm
  } = useBlog();

  useEffect(() => {
    if (isAuthenticated?.accessToken) navigate('/');
  }, [isAuthenticated]);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setSubmitErrorMsg('');
  }, [user, email, password, confirmPassword]);

  return (
    <>
      <section className="w-full max-w-420 min-h-400 flex flex-col justify-start p-4 bg-opacity-40 bg-gray-400">
        {submitErrorMsg && (
          <p className="submitError" ref={errorRef}>
            {submitErrorMsg}
          </p>
        )}

        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleRegisterForm} className="flex flex-col space-y-4 flex-grow pb-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="font-bold">
              Username
              {user && validUser ? (
                <span className="text-green-500">✔️</span>
              ) : user && !validUser ? (
                <span className="text-red-500">❌</span>
              ) : null}
            </label>
            <input
              className="font-nunito text-lg p-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              id="username"
              required
              ref={userRef}
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            {user && !validUser ? (
              <p className="text-xs bg-black text-white rounded-md py-1 px-2 bottom-10">
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold">
              Email
              {email && validEmail ? (
                <span className="text-green-500">✔️</span>
              ) : email && !validEmail ? (
                <span className="text-red-500">❌</span>
              ) : null}
            </label>
            <input
              className="font-nunito text-lg p-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && !validEmail ? (
              <p className="text-xs bg-black text-white rounded-md py-1 px-2 bottom-10">
                Enter a valid email address fromat
              </p>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold">
              Password
              {password && validPassword ? (
                <span className="text-green-500">✔️</span>
              ) : password && !validPassword ? (
                <span className="text-red-500">❌</span>
              ) : null}
            </label>
            <input
              className="font-nunito text-lg p-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && !validPassword ? (
              <p className="text-xs bg-black text-white rounded-md py-1 px-2 bottom-10">
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a special character from '!@#$%'.
              </p>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmpassword" className="font-bold">
              Confirm Password
              {confirmPassword && isMatch ? (
                <span className="text-green-500">✔️</span>
              ) : confirmPassword && !isMatch ? (
                <span className="text-red-500">❌</span>
              ) : null}
            </label>
            <input
              className="font-nunito text-lg p-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              type="password"
              id="confirmpassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && !isMatch ? (
              <p className="text-xs bg-black text-white rounded-md py-1 px-2 bottom-10">Passwords do not match </p>
            ) : null}
          </div>
          <button
            className="font-nunito text-xl mt-4 px-4 py-2 rounded-lg bg-lime-500"
            disabled={validUser && validPassword && isMatch ? false : true}
          >
            Sign Up
          </button>
        </form>

        <p>
          Already registered?
          <br />
          <span className="text-blue-500 hover:underline">
            <Link to="/login">Log In</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Register;
