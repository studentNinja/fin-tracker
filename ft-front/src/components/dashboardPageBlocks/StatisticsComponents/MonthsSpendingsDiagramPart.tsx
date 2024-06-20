import "../../../styles/pie-diagram.css";

const MonthsSpendingsDiagramPart = (props: {
  spentNumber: number;
  putAwayNumber: number;
  income: number;
}) => {
  let leftNumber = props.income - props.spentNumber - props.putAwayNumber;
  let spentPercent =
    props.income !== 0
      ? Math.round((props.spentNumber / props.income) * 100)
      : 0;
  let putAwayPercent =
    props.income !== 0
      ? Math.round((props.putAwayNumber / props.income) * 100)
      : 0;

  return (
    <div className="months-spendings-diagram-part">
      <div className="block-title">Витрати за місяць</div>
      <div className="months-spendings-diagram" id="months-spendings-diagram">
        <div
          className="pie "
          style={{
            backgroundImage: `conic-gradient(var(--orange-diagram-color) ${spentPercent}%, var(--purple-diagram-color) ${spentPercent}% ${
              spentPercent + putAwayPercent
            }%, var(--grey-diagram-color) ${spentPercent + putAwayPercent}%)`,
          }}
        >
          <div className="pie-hole">{spentPercent + putAwayPercent}%</div>
        </div>
      </div>
      <div className="list list-3">
        <div className="list-elem">
          <div className="list-elem-start-block">
            <div className="list-elem-line-2 orange"></div>
            <div className="list-elem-title months-spendings-diagram-info-title">
              Витрачено
            </div>
          </div>
          <div className="list-elem-end-block">
            {props.spentNumber.toLocaleString("uk-UA")}
          </div>
        </div>
        <div className="list-line"></div>
        <div className="list-elem">
          <div className="list-elem-start-block">
            <div className="list-elem-line-2 purple"></div>
            <div className="list-elem-title months-spendings-diagram-info-title">
              Відкладено
            </div>
          </div>
          <div className="list-elem-end-block">
            {props.putAwayNumber.toLocaleString("uk-UA")}
          </div>
        </div>
        <div className="list-line"></div>
        <div className="list-elem">
          <div className="list-elem-start-block">
            <div className="list-elem-line-2 grey"></div>
            <div className="list-elem-title months-spendings-diagram-info-title">
              Залишок
            </div>
          </div>
          <div className="list-elem-end-block">
            {leftNumber.toLocaleString("uk-UA")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthsSpendingsDiagramPart;
