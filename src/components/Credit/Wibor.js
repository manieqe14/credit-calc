import { BiPlus, BiMinus } from "react-icons/bi";
import { rounder } from "../../Utils/Helpers";

export const Wibor = ({ value, onWiborChange }) => {
  return (
    <div>
      <label>WIBOR</label>
      <span>
        <BiMinus onClick={() => onWiborChange(rounder(value - 0.1))} />
      </span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => onWiborChange(parseFloat(event.target.value))}
      />
      <span>
        <BiPlus onClick={() => onWiborChange(rounder(value + 0.1))} />
      </span>
      <span>%</span>
    </div>
  );
};
