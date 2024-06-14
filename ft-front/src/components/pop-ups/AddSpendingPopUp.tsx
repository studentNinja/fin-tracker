import React, { useState } from "react";
import "../../styles/pop-up.css";
import {categoryColors, categoryMap, categoryNames} from "../../utils/categoryData";

const AddSpendingPopUp = (props: {
  cancel: () => void;
  confirmAdd: (categoryId: number, title: string, number: number) => void;
}) => {

  const arrayCategories= Object.keys(categoryMap).filter(key=>+key!=1).map(key => {

        return {
          id: Number(key),
          title: categoryNames[categoryMap[Number(key)]],
        };
  });

  const [categoryId, setCategoryId] = useState(2);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(0);

  return (
    <div
      className="pop-up-bg"
      onClick={(e) => {
        props.cancel();
      }}
    ><form onSubmit={(e) => {
      e.preventDefault()
      try {
        props.confirmAdd(categoryId, title, number);
        props.cancel();
      } catch (error) {
        alert((error as Error).message);
      }
    }}>
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

            onChange={(event) => setCategoryId(+event.target.value)}
            className="input-pop-up"
            name="select"
            required
          >
            {arrayCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>

        </div>
        <div className="input-title-pop-up">
          Введіть назву
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input-pop-up"
            required
          />
        </div>
        <div className="input-title-pop-up">
          Введіть суму
          <input
            min="1"
            type="number"
            value={number}
            onChange={(event) => setNumber(+event.target.value)}
            className="input-pop-up"
            required
          />
        </div>
        <div className="button-container">
          <div
            className="btn form-button btn-pop-up btn-pop-up-cancel "
            onClick={(e) => {
              props.cancel();
            }}
          >
            Скасувати
          </div>
          <button
            className="btn form-button btn-pop-up "

          >
            Додати
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default AddSpendingPopUp;
