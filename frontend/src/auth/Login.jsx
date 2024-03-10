import { useEffect, useState } from "react";
import "./auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.auth.error);
  const submitLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    // If user is logged in, navigate to homepage
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="auth-form">
        <div className="login-form">
          <div className="auth-heading">
            <h1>Welcome back!</h1>
            <p>Please sign in to continue.</p>
          </div>
          <form className="form-fields" onSubmit={submitLogin}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button>Log in</button>
            <p style={{ textAlign: "center" }}>
              Are u new user? <NavLink to="/signup">sign up here</NavLink>
            </p>

            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};
