import React, { useState } from "react";
import "../../styles/pop-up.css";

const AddSpendingPopUp = (props: {
  cancel: () => void;
  confirmAdd: (categoryId: number, title: string, number: number) => void;
}) => {
  //TODO: fetch data without Постійні витрати
  const [arrayCategories] = useState([
    { id: 1, title: "Постійні витрати", color: "blue", number: 4500 },
    { id: 2, title: "Краса та одяг", color: "green", number: 2000 },
    { id: 3, title: "Кафе та ресторани", color: "orange", number: 4500 },
    { id: 4, title: "Розваги", color: "purple", number: 5000 },
    { id: 5, title: "Медицина", color: "yellow", number: 2400 },
    { id: 6, title: "Продукти", color: "pink", number: 10000 },
    { id: 7, title: "Транспорт", color: "yellow-green", number: 10000 },
    { id: 8, title: "Інше", color: "grey", number: 1400 },
  ]);

  const [categoryId, setCategoryId] = useState(1);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(0);

  return (
    <div
      className="pop-up-bg"
      onClick={(e) => {
        props.cancel();
      }}
    >
      <div
        className="pop-up-body shadow"
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
          >
            {arrayCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {/*<input value={title}*/}
          {/*       onChange={event=>setTitle(event.target.value)}*/}
          {/*       className="input-pop-up"/>*/}
        </div>
        <div className="input-title-pop-up">
          Введіть назву
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input-pop-up"
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
          />
        </div>
        <div className="button-container">
          <div
            className="btn btn-pop-up btn-pop-up-cancel "
            onClick={(e) => {
              props.cancel();
            }}
          >
            Скасувати
          </div>
          <div
            className="btn btn-pop-up "
            onClick={(e) => {
              try {
                props.confirmAdd(categoryId, title, number);
                props.cancel();
              } catch (error) {
                alert((error as Error).message);
              }
            }}
          >
            Додати
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSpendingPopUp;
