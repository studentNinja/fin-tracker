import React from 'react';
import deleteBtn from "../../assets/delete-btn.svg";

const MonthStatsBlock = () => {
    let incomeNumber=140000
    let putAwayNumber=10000
    let spentNumber= 48000
    let spentWithoutFixedExpensesNumber= 11000
    let leftNUmber= incomeNumber-(putAwayNumber+spentNumber+spentWithoutFixedExpensesNumber)




    return (
        <div className="block block-flex-1 block-column-content">
            <div className="block-title">Статистика за місяць</div>
            <div className="income-number-container">
                <div className="income-container-title">Дохід:</div>
                <div className="income-number income-number-profile">
                    {
                        incomeNumber.toLocaleString("uk-UA")
                    }
                </div>

            </div>
            <div className="line"></div>
            <div className="list">
                <div
                    style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <div className="list-elem">
                        <div className="font-weight-300">Відкладено</div>
                        <div className="list-elem-end-block">
                            <div>{putAwayNumber.toLocaleString("uk-UA")}</div>
                        </div>
                    </div>
                    <div className="list-line"></div>
                </div>
                <div
                    style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <div className="list-elem">
                        <div className="font-weight-300" >Витрачено всього</div>
                        <div className="list-elem-end-block">
                            <div>{spentNumber.toLocaleString("uk-UA")}</div>
                        </div>
                    </div>
                    <div className="list-line"></div>
                </div>
                <div
                    style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <div className="list-elem">
                        <div className="font-weight-300">Витрачено без постійних витрат</div>
                        <div className="list-elem-end-block">
                            <div>{spentWithoutFixedExpensesNumber.toLocaleString("uk-UA")}</div>
                        </div>
                    </div>
                    <div className="list-line"></div>
                </div>
                <div
                    style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <div className="list-elem">
                        <div className="font-weight-300" >Залишок</div>
                        <div className="list-elem-end-block">
                            <div>{leftNUmber.toLocaleString("uk-UA")}</div>
                        </div>
                    </div>
                </div>





            </div>



        </div>
    );
};

export default MonthStatsBlock;