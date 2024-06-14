import React, { useEffect } from "react";
import deleteBtn from "../../assets/delete-btn.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  fetchIncomes,
  addIncome,
  deleteIncome,
} from "../../features/income/incomeThunks";
import { Income } from "../../types/incomeTypes";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import {Data} from "../../utils/dataUtils";
import {fetchUserProfile} from "../../features/user/userThunks";

interface Props {
  showPopUpAddIncome: (
    addFunct: (title: string, number: number) => void
  ) => void;
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
}

const IncomeBlock: React.FC<Props> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const data = useSelector((state: RootState) => {
        return new Data(state.user.userInfo ,state.goalTransactions.goalTransactionsCurrent, state.goalTransactions.goalTransactionsAll);
  });

  let arrayIncome= data.getIncomeArrayCurrentMonth()
  let incomeAmount= data.getIncomeAmountCurrentMonth()



  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);





  async function handleDeleteIncome(id: string) {
    try {
      await dispatch(deleteIncome(id));
      await dispatch(fetchUserProfile());
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  }

  async function handleAddIncome(title: string, number: number) {
    try {
      const result = await dispatch(
        addIncome({
          source: title,
          amount: number,
          userId: "",
          date: "",
          createdAt: "",
          updatedAt: "",
        })
      );
      await dispatch(fetchUserProfile());

    } catch (error) {
      console.error("Error adding income:", error);
    }
  }

  return (
    <div className="block block-1">
      <div className="block-title">Дохід за місяць</div>
      <div className="income-number-container">
        <div className="income-number">
          {incomeAmount
            .toLocaleString("uk-UA")}
        </div>
        <div
          className="add-btn"
          onClick={() => {
            props.showPopUpAddIncome(handleAddIncome);
          }}
        >
          +
        </div>
      </div>
      <div className="line"></div>
      <div className="list">
        {arrayIncome.map((income) => (
          <div
            key={income._id}
            style={{ display: "flex", gap: "5px", flexDirection: "column" }}
          >
            <div className="list-elem">
              <div>{(income as Income).source}</div>
              <div className="list-elem-end-block">
                <div className="delete-btn">
                  <img
                    src={deleteBtn}
                    onClick={() =>
                      props.showConfirmDeletePopUp(() =>
                        handleDeleteIncome(income._id)
                      )
                    }
                    alt="delete"
                  />
                </div>
                <div>{income.amount.toLocaleString("uk-UA")}</div>
              </div>
            </div>
            <div className="list-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeBlock;
