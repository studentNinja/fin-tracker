import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { registerUser } from "../features/auth/authThunks";

interface IRegisterFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  initialCapital: number;
  savingGoal: number;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Введіть ім'я")
    .min(3, "Ім'я має містити щонайменше 3 символи")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9]{3,20}$/u,
      "Назва може містити тільки літери (латиниця, кирилиця) та цифри і має бути не більше 20 символів"
    ),

  email: yup
    .string()
    .required("Введіть пошту")
    .email("Некоректна пошта")
    .matches(
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
      "Некоректна пошта"
    ),
  password: yup
    .string()
    .required("Придумайте пароль")
    .min(8, "Пароль має містити щонайменше 8 символів"),
  // .matches(
  //   /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/,
  //   "Пароль повинен містити хоча б одну літеру та одну цифру"
  // ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Паролі не збігаються")
    .required("Повторіть пароль")
    .min(8, "Пароль має містити щонайменше 8 символів"),
  // .matches(
  //   /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/,
  //   "Пароль повинен містити хоча б одну літеру та одну цифру"
  // ),
  initialCapital: yup
    .number()
    .required("Введіть початковий капітал")
    .min(0, "Початковий капітал має бути не менше 0")
    .max(10000000),
  savingGoal: yup
    .number()
    .required("Введіть суму накопичення")
    .min(0, "Сума накопичення має бути не менше 0")
    .max(10000000),
});

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>({
    resolver: yupResolver(schema) as any,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
    dispatch(
      registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        capital: data.initialCapital,
        saving_goal: data.savingGoal,
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
            <input type="text" {...register("username")} />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className="input-container input-container-1-in-row">
            <label>Введіть пошту</label>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="input-container-1-in-row wrapper-row">
            <div className="input-container input-container-2-in-row">
              <label>Придумайте пароль</label>
              <input type="password" {...register("password")} />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="input-container input-container-2-in-row">
              <label>Повторіть пароль</label>
              <input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <div className="input-container input-container-1-in-row">
            <label>Введіть початковий капітал</label>
            <input type="number" {...register("initialCapital")} />
            {errors.initialCapital && <p>{errors.initialCapital.message}</p>}
          </div>
          <div className="input-container input-container-1-in-row">
            <label>Введіть суму накопичення</label>
            <input type="number" {...register("savingGoal")} />
            {errors.savingGoal && <p>{errors.savingGoal.message}</p>}
          </div>
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? "Відбувається реєстрація..." : "Зареєструватись"}
          </button>
          {error && typeof error === "object" && error !== null ? (
            <div>{JSON.stringify(error)}</div>
          ) : (
            <div>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};
