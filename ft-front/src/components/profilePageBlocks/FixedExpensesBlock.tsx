import React, {useState} from 'react';
import deleteBtn from "../../assets/delete-btn.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

const FixedExpensesBlock = (props: {
    showConfirmDeletePopUp: (deleteFunct: () => void) => void;
    showPopUpAddFixedExpense: (
        addFunct: (title: string, number: number) => void
    ) => void;
}) => {
    let user = useSelector(
        (state: RootState) => state.user
    );
    console.log(user)



    let moneyLeft=71000
    let [arrayFixedExpenses, setArrayFixedExpenses]=useState([
        {_id:1, name: "Інтернет", amount: 300},
        {_id:2, name: "Абонплата", amount: 250},
        {_id:3, name: "Підписки", amount: 1000},
        {_id:4, name: "Chat GPT", amount: 1300},
        {_id:5, name: "Оренда квартири", amount: 1300},
    ])

    function addFixedExpense(name: string, amount: number){
        if (name.length === 0) throw new Error("Введіть назву");
        if (!validateSpendingNumber(amount))
            throw new Error("Недостатньо коштів для здійснення операції");

        if (amount <= 0) throw new Error("Неправильне значення суми");

        let newExpense = {
            _id: arrayFixedExpenses.length + 1,
            name,
            amount
        };
        setArrayFixedExpenses([...arrayFixedExpenses, newExpense]);



        //to do: POST
    }

    function validateSpendingNumber(number: number) {
        return moneyLeft >= number;
    }
    function deleteFixedExpense(id: number) {
        setArrayFixedExpenses(arrayFixedExpenses.filter((expense) => expense._id !== id));

        /// to do: DELETE
    }

    return (
        <div className="block block-flex-1 block-column-content">
            <div className="block-title">Дохід за місяць</div>
            <div className="income-number-container">
                <div className="income-number">
                    {
                        // calc general income
                        arrayFixedExpenses
                            .reduce((res, curr) => res + curr.amount, 0)
                            .toLocaleString("uk-UA")
                    }
                </div>
                <div
                    className="add-btn"
                    onClick={() => props.showPopUpAddFixedExpense(addFixedExpense)}
                >
                    +
                </div>
            </div>
            <div className="line"></div>

            <div className="list">
                {arrayFixedExpenses.map((expense) => {
                    return (
                        <div
                            key={expense._id}
                            style={{ display: "flex", gap: "5px", flexDirection: "column" }}
                        >
                            <div className="list-elem">
                                <div>{expense.name}</div>
                                <div className="list-elem-end-block">
                                    <div className="delete-btn">
                                        <img
                                            src={deleteBtn}
                                            onClick={() =>
                                                props.showConfirmDeletePopUp(() =>
                                                    deleteFixedExpense(expense._id)
                                                )
                                            }
                                            alt="delete"
                                        />
                                    </div>
                                    <div>{expense.amount.toLocaleString("uk-UA")}</div>
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

export default FixedExpensesBlock;