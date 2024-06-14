import React from 'react';
import deleteBtn from "../../../assets/delete-btn.svg";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
};

const SpendingsHistoryPart = (props: {
    arraySpendings: Array<{
        id: string;
        date: string;
        description: string;
        number: number;
        category: number;
    }>;
    deleteSpending: (id: string) => void;
    clickAddSpendingBtn: () => void;
}) => {
    return (
        <div className="spendings-history-part">
            <div className="list-elem-start-block">
                <div className="block-title">Історія витрат</div>
                <div className="list-elem-end-block">
                    <div className="add-btn" onClick={() => props.clickAddSpendingBtn()}>
                        +
                    </div>
                </div>
            </div>

            <div className="list">
                {props.arraySpendings.map((spending) => {
                    return (
                        <div
                            key={spending.id}
                            style={{ display: "flex", gap: "5px", flexDirection: "column" }}
                        >
                            <div className="list-elem">
                                <div className="list-elem-start-block">
                                    <div>{formatDate(spending.date)}</div>
                                    <div>{spending.description}</div>
                                </div>
                                <div className="list-elem-end-block">
                                    <div className="delete-btn">
                                        <img
                                            onClick={() => props.deleteSpending(spending.id)}
                                            src={deleteBtn}
                                            alt="delete"
                                        />
                                    </div>
                                    <div>{spending.number.toLocaleString("uk-UA")}</div>
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

export default SpendingsHistoryPart;



