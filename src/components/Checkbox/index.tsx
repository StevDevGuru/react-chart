import React from "react";
import { createUseStyles } from "react-jss";

interface CheckBoxProps {
  label?: string;
  disabled?: boolean;
  checked: boolean;
  color?: string;
  onChange: (checked: boolean) => void;
  id?: string;
}

const useStyles = createUseStyles({
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
  },
  checkboxInput: {
    marginRight: "8px",
    width: "16px",
    height: "16px",
    borderRadius: "2px",
    border: "1px solid #999",
    cursor: "pointer",
  },
  checkboxLabel: {
    fontSize: "14px",
  },
});

function CheckBox(props: CheckBoxProps) {
  const classes = useStyles();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  };

  // Generate a unique id for this checkbox.
  const checkboxId = props.id || Math.random().toString();
  return (
    <div className={classes.checkboxContainer}>
      <input
        id={checkboxId}
        disabled={props?.disabled || false}
        type="checkbox"
        className={classes.checkboxInput}
        checked={props.checked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={checkboxId}
        className={classes.checkboxLabel}
        style={{ color: props.color }}
      >
        {props.label}
      </label>
    </div>
  );
}

export default CheckBox;
