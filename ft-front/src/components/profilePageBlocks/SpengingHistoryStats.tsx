import React from 'react';
import BarChart from "../BarChart";

const SpengingHistoryStats = () => {
    let estimationDate="12.2024"
    let averagePutAwayNumber=15000
    return (
        <div className="block block-flex-3 block-column-content">
            <div className="block-title">Історія відкладень</div>
            <div className=" block-row-content">
                <BarChart></BarChart>
                <div className="spendings-history-info">
                    <div><span  className="font-size-32">{averagePutAwayNumber.toLocaleString('uk-ua')}</span>
                        <div> у середньому відкладається за місяць</div>
                    </div>

                    <div>
                        {/*to do: change to month name*/}
                        <b>Досягнення цілі</b><br/> очікується {estimationDate} </div>
                </div>
            </div>
        </div>
    );
};

export default SpengingHistoryStats;