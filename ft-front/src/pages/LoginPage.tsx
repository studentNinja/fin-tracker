import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppDispatch, RootState } from '../app/store';
import { loginUser } from '../features/auth/authThunks';
// import {toast} from "react-toastify";
import { clearError } from '../features/auth/authSlice';

interface ILoginFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Введіть пошту')
    .email('Некоректна пошта')
    .matches(
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
      'Некоректна пошта'
    ),
  password: yup
    .string()
    .required('Введіть пароль')
    .min(8, 'Пароль повинен мати мінімум 8 символів'),
  // .matches(
  //   /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/,
  //   "Пароль повинен містити хоча б одну літеру та одну цифру"
  // ),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(schema) as any,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (error == '403') {
      navigate('/payment');
    }
  }, [error, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    await dispatch(loginUser({ email: data.email, password: data.password }));
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container input-container-1-in-row">
            <label>Пошта</label>
            <input type="email" {...register('email')} required />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="input-container input-container-1-in-row">
            <label>Пароль</label>
            <input type="password" {...register('password')} required />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? 'Відбувається вхід...' : 'Увійти'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
