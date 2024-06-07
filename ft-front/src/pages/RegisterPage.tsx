import UserForm from "../components/userForm";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { registerUser } from "../features/auth/authSlice";

interface IRegisterFormInput {
  confirmPassword: string;
  password: string;
}

export const RegisterPage: React.FC = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialCapital, setInitialCapital] = useState<number>(0);
  const [savingGoal, setSavingGoal] = useState<number>(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // const onSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(registerUser({ username, email, password, initialCapital, saving_goal:savingGoal }));
  // };

  const onSubmit: SubmitHandler<IRegisterFormInput> = (
    data: IRegisterFormInput,
    event
  ) => {
    if (event) {
      event.preventDefault();
    }
    dispatch(
      registerUser({
        username,
        email,
        password,
        initial_capital: initialCapital,
        saving_goal: savingGoal,
      })
    );
  };

  return (
    <div className="form-container">
      <div className="form-body shadow">
        <div className="form-h-holder">
          <div className="center-div form-h">
            {"Зареєструєтесь".toUpperCase()}
          </div>
          <Link to="/login" className="center-div change-option">
            Вже є акаунт?
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container input-container-1-in-row">
            <label>Введіть ім'я</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              minLength={4}
            />
          </div>
          <div className="input-container input-container-1-in-row">
            <label>Введіть пошту</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className=" input-container-1-in-row wrapper-row">
            <div className="input-container input-container-2-in-row">
              <label>Придумайте пароль</label>
              <input
                type="password"
                minLength={8}
                value={password}
                {...register("password", { required: "Введіть значення" })}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-container input-container-2-in-row">
              <label>Повторіть пароль</label>
              <input
                type="password"
                minLength={8}
                {...register("confirmPassword", {
                  required: "Введіть значення",
                  validate: (value) =>
                    value === password || "Паролі не збігаються",
                })}
                required
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="input-container input-container-1-in-row">
            <label>Введіть суму накопичення</label>
            <input
              type="number"
              min="0"
              value={savingGoal}
              onChange={(e) => setSavingGoal(Number(e.target.value))}
              required
            />
          </div>
          <div className="input-container input-container-1-in-row">
            <label>Введіть початковий капітал</label>
            <input
              type="number"
              min="0"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              required
            />
          </div>

          <button className=" form-button" type="submit" disabled={loading}>
            {loading ? "Відбувається реєстрація..." : "Зареєструватись"}
          </button>
          {error && typeof error === "object" && error !== null ? (
            <div>{error.msg}</div>
          ) : (
            <div>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
  // <UserForm />;
};
