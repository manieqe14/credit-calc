import { BiPlus, BiMinus } from "react-icons/bi";
import { rounder } from "../../Utils/Helpers";

export const Period = ({ value, onPeriodChange }) => {
  return (
    <div>
      <label>Okres kredytowania</label>
      <span>
        <BiMinus onClick={() => onPeriodChange(rounder(value - 1))} />
      </span>
      <input
        type="number"
        min="1"
        step="1"
        value={value}
        onChange={(event) => onPeriodChange(parseFloat(event.target.value))}
      />
      <span>
        <BiPlus onClick={() => onPeriodChange(rounder(value + 1))} />
      </span>
      <span>miesięcy</span>
    </div>
  );
};
