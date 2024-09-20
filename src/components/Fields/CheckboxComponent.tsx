import React from "react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

function CheckboxComponent({ handleChange, checked }: CheckBoxComponentProps) {
  return (
    <div>
      <Checkbox
        variant="filled"
        onChange={handleChange}
        checked={checked}
      ></Checkbox>
    </div>
  );
}

export default CheckboxComponent;

interface CheckBoxComponentProps {
  checked: boolean;
  handleChange: (e: CheckboxChangeEvent) => void;
}
