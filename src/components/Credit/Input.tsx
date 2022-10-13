import { BiPlus, BiMinus } from "react-icons/bi";
import { rounder } from "../../Utils/Helpers";
import React, { ReactElement } from "react";
import { UserInput } from "./types";

export interface OptionConfig {
  userInput: UserInput;
  onChange: (value: number) => void;
}

export const Input = ({ userInput, onChange }: OptionConfig): ReactElement => {
  return (
    <div className="form-section w-equal-3">
      <label>{userInput.name}</label>
      <div>
        <span className="clickable-sign">
          <BiMinus
            onClick={() => onChange(rounder(userInput.value - userInput.step))}
          />
        </span>
        <input
          type="number"
          min="0"
          step={userInput.step}
          value={userInput.value}
          onChange={(event) => onChange(parseFloat(event.target.value))}
        />
        <span className="clickable-sign">
          <BiPlus
            onClick={() => onChange(rounder(userInput.value + userInput.step))}
          />
        </span>
      </div>
      <span>{userInput.unit}</span>
    </div>
  );
};
