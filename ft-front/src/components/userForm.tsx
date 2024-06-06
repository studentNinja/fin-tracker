import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { registerUser } from "../features/auth/authSlice";

const UserForm: React.FC = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialCapital, setInitialCapital] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, userInfo } = useSelector(
    (state: RootState) => state.user
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password, initialCapital }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Initial Capital</label>
        <input
          type="number"
          value={initialCapital}
          onChange={(e) => setInitialCapital(Number(e.target.value))}
        />
      </div>
      <button type="submit">Register</button>
      {loading && <p>Loading...</p>}
      {error && typeof error === "object" && error !== null ? (
        <p>{error.msg}</p>
      ) : (
        <p>{error}</p>
      )}
      {userInfo && <p>Registered successfully!</p>}
    </form>
  );
};

export default UserForm;
