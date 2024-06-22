import React, { useEffect } from "react";
import "../../styles/pop-up.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  title: string;
  cancel: () => void;
  confirmAdd: (name: string, amount: number) => void;
  errorState: { name: string; amount: string };
}

interface FormValues {
  title: string;
  amount: number;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Введіть назву")
    .min(3, "Назва має містити щонайменше 3 символи"),
  // .matches(
  //   /^[a-zA-Z0-9]{1,20}$/,
  //   "Назва може містити тільки літери та цифри і має бути не більше 20 символів"),
  amount: yup
    .number()
    .required("Введіть суму")
    .min(1, "Сума має бути не менше 1")
    .typeError("Сума має бути числом")
    .max(10),
});

const AddIncomeOrFixedExpensesPopUp: React.FC<Props> = ({
  title: popupTitle,
  cancel,
  confirmAdd,
  errorState,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
  });

  useEffect(() => {
    if (errorState.name) {
      setError("title", {
        type: "manual",
        message: errorState.name,
      });
    }
    if (errorState.amount) {
      setError("amount", {
        type: "manual",
        message: errorState.amount,
      });
    }
  }, [errorState, setError]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    confirmAdd(data.title, data.amount);
    cancel();
  };

  return (
    <div className="pop-up-bg" onClick={cancel}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="form-body pop-up shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pop-up-h">{popupTitle}</div>
          <div className="input-title-pop-up">
            Введіть назву
            <input {...register("title")} className="input-pop-up" />
            {errors.title && (
              <p className="error-message">{errors.title.message}</p>
            )}
          </div>
          <div className="input-title-pop-up">
            Введіть суму
            <input
              type="number"
              {...register("amount")}
              className="input-pop-up"
            />
            {errors.amount && (
              <p className="error-message">{errors.amount.message}</p>
            )}
          </div>
          <div className="button-container">
            <div
              className="btn form-button btn-pop-up btn-pop-up-cancel"
              onClick={cancel}
            >
              Скасувати
            </div>
            <button className="btn form-button btn-pop-up" type="submit">
              Додати
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddIncomeOrFixedExpensesPopUp;
