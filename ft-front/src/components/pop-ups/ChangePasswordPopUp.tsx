import React from "react";
import "../../styles/pop-up.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  cancel: () => void;
  confirmChange: (currentPassword: string, newPassword: string) => void;
}

interface FormValues {
  currentPassword: string;
  newPassword: string;
}

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Введіть поточний пароль")
    .min(8, "Пароль має містити щонайменше 8 символів"),
  // .matches(
  //   /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/,
  //   "Пароль повинен містити хоча б одну літеру та одну цифру"
  // ),
  newPassword: yup
    .string()
    .required("Введіть новий пароль")
    .min(8, "Пароль має містити щонайменше 8 символів")
    // .matches(
    //   /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/,
    //   "Пароль повинен містити хоча б одну літеру та одну цифру"
    // )
    .notOneOf(
      [yup.ref("currentPassword"), null],
      "Новий пароль не може бути таким же, як поточний"
    ),
});

const ChangeNumberPopUp: React.FC<Props> = ({ cancel, confirmChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    confirmChange(data.currentPassword, data.newPassword);
    cancel();
  };

  return (
    <div
      className="pop-up-bg"
      onClick={(e) => {
        cancel();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="form-body pop-up shadow"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="pop-up-h">Змінити пароль</div>
          <div className="input-title-pop-up">
            Введіть поточний пароль
            <input
              type="password"
              {...register("currentPassword")}
              className="input-pop-up"
              required
            />
            {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
          </div>
          <div className="input-title-pop-up">
            Введіть новий пароль
            <input
              type="password"
              {...register("newPassword")}
              className="input-pop-up"
              required
            />
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>
          <div className="button-container">
            <div
              className="btn form-button btn-pop-up btn-pop-up-cancel"
              onClick={(e) => {
                cancel();
              }}
            >
              Скасувати
            </div>
            <button className="btn form-button btn-pop-up" type="submit">
              Змінити
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeNumberPopUp;
