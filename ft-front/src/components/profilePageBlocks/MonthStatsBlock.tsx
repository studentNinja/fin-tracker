import React, {useEffect} from 'react';
import deleteBtn from "../../assets/delete-btn.svg";
import {useDispatch, useSelector} from "react-redux";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {
    getBalance,
    getGoalTransactionsAmountCurrentMonth,
    getIncomeAmountCurrentMonth, getTransactionsAmountByCategoryId,
    getTransactionsAmountCurrentMonth
} from "../../utils/dataUtils";
import {fetchUserProfile} from "../../features/user/userThunks";
import {
    fetchAllGoalTransactions,
    fetchCurrentGoalTransactions
} from "../../features/goalTransactions/goalTransactionsThunks";
import {categoryMap} from "../../utils/categoryData";

const MonthStatsBlock = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
    const transactions = useSelector(
        (state: RootState) => state.transactions.transactions
    );
    const user = useSelector((state: RootState) => state.user.userInfo);

    const goalTransactionsAll = useSelector(
        (state: RootState) => state.goalTransactions.goalTransactionsAll
    );

    let transactionsTotalSum = getTransactionsAmountCurrentMonth(user);
    let goalTransactionsTotalSum = getGoalTransactionsAmountCurrentMonth(goalTransactionsAll);
    let incomeAmount = getIncomeAmountCurrentMonth(user);
    let balance = getBalance(user, goalTransactionsAll);
    let fixedExpensesAmount = getTransactionsAmountByCategoryId(user,
        1,
        categoryMap)
    let transactionsTotalSumWithoutFixed= transactionsTotalSum - fixedExpensesAmount


    useEffect(() => {
        dispatch(fetchUserProfile());
        dispatch(fetchAllGoalTransactions());
        dispatch(fetchCurrentGoalTransactions());
    }, [dispatch, transactions]);






    return (
        <div className="block block-flex-1 block-column-content">
            <div className="block-title">Статистика за місяць</div>
            <div className="income-number-container">
                <div className="income-container-title">Дохід:</div>
                <div className="income-number income-number-profile">
                    {
                        incomeAmount.toLocaleString("uk-UA")
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
                            <div>{goalTransactionsTotalSum.toLocaleString("uk-UA")}</div>
                        </div>
                    </div>
                    <div className="list-line"></div>
                </div>
                <div
                    style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <div className="list-elem">
                        <div className="font-weight-300" >Витрачено всього</div>
                        <div className="list-elem-end-block">
                            <div>{transactionsTotalSum.toLocaleString("uk-UA")}</div>
                        </div>
                    </div>
                    <div className="list-line"></div>
                </div>
                <div
                    style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <div className="list-elem">
                        <div className="font-weight-300">Витрачено без постійних витрат</div>
                        <div className="list-elem-end-block">
                            <div>{transactionsTotalSumWithoutFixed.toLocaleString("uk-UA")}</div>
                        </div>
                    </div>
                    <div className="list-line"></div>
                </div>
                <div
                    style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <div className="list-elem">
                        <div className="font-weight-300" >Залишок</div>
                        <div className="list-elem-end-block">
                            <div>{balance.toLocaleString("uk-UA")}</div>
                        </div>
                    </div>
                </div>





            </div>



        </div>
    );
};

export default MonthStatsBlock;