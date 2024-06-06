import React, { useState } from "react";
import deleteBtn from "../../assets/delete-btn.svg";

const DashboardBlock1 = (props: {
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
  showPopUpAddIncome: (
    addFunct: (title: string, number: number) => void
  ) => void;
}) => {
  // to do: fetch income sources
  const [arrayIncome, setArrayIncome] = useState([
    { id: 1, title: "Зарплата", number: 80000 },
    { id: 2, title: "Повернення боргу", number: 5000 },
    { id: 3, title: "Фріланс", number: 40000 },
    { id: 4, title: "Консультації", number: 10000 },
    { id: 5, title: "Пенсія", number: 5000 },
    { id: 6, title: "Стипендія", number: 2000 },
    { id: 7, title: "Подарунок", number: 6000 },
  ]);

  function deleteIncome(id: number) {
    setArrayIncome(arrayIncome.filter((income) => income.id !== id));

    /// to do: DELETE
  }
  function addIncome(title: string, number: number) {
    if (number <= 0) throw new Error("Неправильне значення суми");
    let newIncome = {
      id: arrayIncome.length + 1,
      title,
      number,
    };
    setArrayIncome([...arrayIncome, newIncome]);

    /// to do: POST
  }

  return (
    <div className="block block-1">
      <div className="block-title">Дохід за місяць</div>
      <div className="income-number-container">
        <div className="income-number">
          {
            // calc general income

            arrayIncome
              .reduce((res, curr) => res + curr.number, 0)
              .toLocaleString("uk-UA")
          }
        </div>
        <div
          className="add-btn"
          onClick={() => props.showPopUpAddIncome(addIncome)}
        >
          +
        </div>
      </div>
      <div className="line"></div>
      <div className="list">
        {arrayIncome.map((income) => {
          return (
            <div
              key={income.id}
              style={{ display: "flex", gap: "5px", flexDirection: "column" }}
            >
              <div className="list-elem">
                <div>{income.title}</div>
                <div className="list-elem-end-block">
                  <div className="delete-btn">
                    <img
                      src={deleteBtn}
                      onClick={() =>
                        props.showConfirmDeletePopUp(() =>
                          deleteIncome(income.id)
                        )
                      }
                      alt="delete"
                    />
                  </div>
                  <div>{income.number.toLocaleString("uk-UA")}</div>
                </div>
              </div>
              <div className="list-line"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardBlock1;
