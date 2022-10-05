import { BiPlus, BiMinus } from "react-icons/bi";

export const Amount = ({ value, onAmountChange }) => {
  return (
    <div>
      <label>Kwota</label>
      <span>
        <BiMinus onClick={() => onAmountChange(value - 1000)} />
      </span>
      <input
        type="number"
        value={value}
        onChange={(event) => onAmountChange(parseFloat(event.target.value))}
      />
      <span>
        <BiPlus onClick={() => onAmountChange(value + 1000)} />
      </span>
      <span>PLN</span>
    </div>
  );
};
