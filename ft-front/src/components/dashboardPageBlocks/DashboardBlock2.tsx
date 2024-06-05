import React, {useState} from 'react';

import deleteBtn from "../../assets/delete-btn.svg";

const DashboardBlock1 = () => {

    const [goalNumber]= useState(600000)
    const [goalPrevMonthsNumber]= useState(90000)
    const [goalCurrMonthNumber]= useState(10000)

    let goalLeftNumber= goalNumber-goalPrevMonthsNumber-goalCurrMonthNumber
    let goalPrevMonthsPercent=Math.round(goalPrevMonthsNumber/goalNumber*100)
    let goalCurrMonthPercent=Math.round(goalCurrMonthNumber/goalNumber*100)
    let goalLeftPercent=100-goalPrevMonthsPercent-goalCurrMonthPercent

    return (
        <div className="block block-2">
            <div className="block-title">Прогрес цілі
            </div>
            <div className="goal-diagram-container">
                <div style={{width:`${goalPrevMonthsPercent}%`}} className="goal-diagram-prev-months">
                    <div className="goal-diagram-percent">{goalPrevMonthsPercent!==0?goalPrevMonthsPercent+"%":""}</div>
                    <div  className={`goal-diagram-part blue 
                    ${goalPrevMonthsPercent!==0?"diagram-part-first":""} 
                    ${goalLeftPercent===0&&goalCurrMonthPercent===0?"diagram-part-last":""}     `
                    }></div>
                </div>
                <div style={{width:`${goalCurrMonthPercent}%`}} className="goal-diagram-curr-months">
                    <div className="goal-diagram-percent">{goalCurrMonthPercent!==0?goalCurrMonthPercent+"%":""}</div>
                    <div className={`goal-diagram-part yellow 
                    ${goalPrevMonthsPercent===0?"diagram-part-first":""} 
                    ${goalLeftPercent===0?"diagram-part-last":""}       `
                    } ></div>
                </div>
                <div style={{width:`${goalLeftPercent}%`}} className="goal-diagram-left">
                    <div className="goal-diagram-percent">{goalLeftPercent!==0?goalLeftPercent+"%":""}</div>
                    <div className={`goal-diagram-part grey 
                    ${goalPrevMonthsPercent===0&&goalCurrMonthPercent===0?"diagram-part-first":""} 
                    ${goalLeftPercent!==0?"diagram-part-last":""}                
                    `
                    }
                    ></div>
                </div>
            </div>
            <div className="text">
                Вже зібрано {(goalPrevMonthsNumber+goalCurrMonthNumber).toLocaleString('uk-UA')}
            </div>
            <div className="goal-diagram-info-container">
                <div className="goal-diagram-info-left">

                    <div className="goal-diagram-info-elem">
                        <div className="goal-diagram-info-point yellow"></div>
                        Результат за попередні місяці: {goalPrevMonthsNumber.toLocaleString('uk-UA')}
                    </div>
                    <div className="goal-diagram-info-elem">
                        <div className="goal-diagram-info-point blue"></div>
                        Відкладено цього місяця: {goalCurrMonthNumber.toLocaleString('uk-UA')}
                    </div>
                    <div className="goal-diagram-info-elem">
                        <div className="goal-diagram-info-point grey"></div>
                        Залишилось зібрати {goalLeftNumber.toLocaleString('uk-UA')}
                    </div>
                </div>
                <div className="goal-diagram-info-number">
                    {goalNumber.toLocaleString('uk-UA')}
                </div>

            </div>
            <div className="goal-buttons-container">
                <div className="btn">Відкласти</div>
                <div className="btn btn-2">Зняти</div>
            </div>
        </div>

    );
};

export default DashboardBlock1;