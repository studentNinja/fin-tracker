import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { loginUser } from "../features/auth/authThunks";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  return (
    <div className="form-container">
      <div className="form-body shadow">
        <div className="form-h-holder">
          <div className="center-div form-h">УВІЙДІТЬ</div>
          <Link to="/register" className="center-div change-option">
            Немає акаунту?
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container input-container-1-in-row">
            <label>Пошта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container input-container-1-in-row">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? "Відбувається вхід..." : "Увійти"}
          </button>
          {error && (
            <div className="error-message">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
