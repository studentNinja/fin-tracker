import React from "react";
import "../../styles/pop-up.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { categoryMap, categoryNames } from "../../utils/categoryData";

interface Props {
  cancel: () => void;
  confirmAdd: (categoryId: number, title: string, number: number) => void;
}

interface FormValues {
  categoryId: number;
  title: string;
  amount: number;
}

const schema = yup.object().shape({
  categoryId: yup.number().required("Оберіть категорію витрати"),
  title: yup
    .string()
    .required("Введіть назву")
    .min(3, "Назва має містити щонайменше 3 символи")
    .matches(
      /^[a-zA-Z0-9]{1,20}$/,
      "Назва може містити тільки літери та цифри і має бути не більше 20 символів"
    ),
  amount: yup
    .number()
    .required("Введіть суму")
    .min(1, "Сума має бути не менше 1"),
});

const AddSpendingPopUp: React.FC<Props> = ({ cancel, confirmAdd }) => {
  const arrayCategories = Object.keys(categoryMap)
    .filter((key) => +key !== 1)
    .map((key) => {
      return {
        id: Number(key),
        title: categoryNames[categoryMap[Number(key)]],
      };
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    confirmAdd(data.categoryId, data.title, data.amount);
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
          <div className="pop-up-h">Додати витрату</div>
          <div className="input-title-pop-up">
            Оберіть категорію витрати
            <select
              {...register("categoryId")}
              className="input-pop-up"
              required
            >
              {arrayCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            {errors.categoryId && <p>{errors.categoryId.message}</p>}
          </div>
          <div className="input-title-pop-up">
            Введіть назву
            <input {...register("title")} className="input-pop-up" required />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div className="input-title-pop-up">
            Введіть суму
            <input
              type="number"
              {...register("amount")}
              className="input-pop-up"
              required
            />
            {errors.amount && <p>{errors.amount.message}</p>}
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
              Додати
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSpendingPopUp;
