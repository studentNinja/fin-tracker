import React from "react";
import "../../styles/pop-up.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  title: string;
  cancel: () => void;
  confirmChange: (number: number) => void;
}

interface FormValues {
  number: number;
}

const schema = yup.object().shape({
  number: yup
    .number()
    .required("Введіть суму")
    .min(1, "Сума має бути не менше 1")
    .typeError("Сума має бути числом")
    .max(10),
});

const ChangeNumberPopUp: React.FC<Props> = ({
  title,
  cancel,
  confirmChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    confirmChange(data.number);
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
          <div className="pop-up-h">{title}</div>
          <div className="input-title-pop-up">
            Введіть суму
            <input
              type="number"
              {...register("number")}
              className="input-pop-up"
              required
            />
            {errors.number && <p>{errors.number.message}</p>}
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
              {title.split(" ")[0]}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeNumberPopUp;
