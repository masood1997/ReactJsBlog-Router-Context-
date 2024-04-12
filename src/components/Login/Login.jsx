import { useRef, useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || '/';

  const { email, setEmail, password, setPassword, submitErrorMsg, setSubmitErrorMsg, isAuthenticated, handleLoginForm } =
    useBlog();

    // console.log("Displaying is authenticated in Login", isAuthenticated?.accessToken)
  useEffect(() => {
    if (isAuthenticated.accessToken) {
      navigate(fromPath);
    }
  }, [isAuthenticated, fromPath]);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setSubmitErrorMsg('');
  }, [email, password]);

  return (
    <section className="w-full max-w-420 min-h-400 flex flex-col justify-start p-4 bg-opacity-40 bg-gray-400">
      {submitErrorMsg && (
        <p ref={errorRef} className="submitError">
          {submitErrorMsg}
        </p>
      )}

      <form className="flex flex-col space-y-4 flex-grow pb-4" onSubmit={handleLoginForm}>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <input
            className="font-nunito text-lg p-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold">
            Password:
          </label>
          <input
            className="font-nunito text-lg p-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button className="font-nunito text-xl mt-4 px-4 py-2 rounded-lg bg-lime-500">Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Register Now</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
