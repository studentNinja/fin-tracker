import React, {useState} from 'react';

const GoalProgressBlock = (props:{showChangeGoalNumber:(title: string,
                                                        changeFunct: (number:number)=>void)=>void}) => {
    let [goalNumber, setGoalNumber]=useState(600000)
    let putAwayNumber=90000
    let putAwayPercent=Math.round(putAwayNumber/goalNumber*100)
    function changeGoalNumber(number: number) {
        if (!validateChangeGoalNumber(number))
            throw new Error("Сума цілі має бути більша, аніж вже відкладені кошти");
        if (number <= 0) throw new Error("Неправильне значення суми");
        setGoalNumber(number)

        // to do: POST
    }


    function validateChangeGoalNumber(number:number){
        return putAwayNumber<=number


    }
    return (
        <div className="block block-flex-1 block-column-content">
            <div className="block-title">Прогрес цілі</div>
            <div className="months-spendings-diagram" id="months-spendings-diagram">
                <div
                    className="pie "
                    style={{
                        backgroundImage: `conic-gradient(var(--purple-diagram-color) ${putAwayPercent}%, var(--grey-diagram-color) ${putAwayPercent}%)`,
                    }}
                >
                    <div className="pie-hole">{putAwayPercent}%</div>
                </div>
            </div>
            <div className="font-weight-300"><span className="font-size-32">{putAwayNumber.toLocaleString('uk-ua')}</span>/{goalNumber.toLocaleString('uk-ua')}</div>
            <div
                className="btn btn-pop-up"
                onClick={() =>
                    props.showChangeGoalNumber("Змінити суму цілі", changeGoalNumber)
                }
            >
                Змінити суму
            </div>
        </div>
    );
};

export default GoalProgressBlock;