import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { registerUser } from "../features/auth/authSlice";

const UserForm: React.FC = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialCapital, setInitialCapital] = useState<number>(0);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password, initial_capital:initialCapital, saving_goal:0 }));
  };

  return (

    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength={4}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div>
        <label>Initial Capital</label>
        <input
          type="number"
          value={initialCapital}
          onChange={(e) => setInitialCapital(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && typeof error === "object" && error !== null ? (
        <p>{error.msg}</p>
      ) : (
        <p>{error}</p>
      )}
    </form>
  );
};

export default UserForm;
