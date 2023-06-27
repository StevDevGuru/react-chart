import { ChangeEvent } from "react";
import { createUseStyles } from "react-jss";

interface RadioButtonProps {
  label?: string;
  checked: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = createUseStyles({
  radioButtonContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  radioLabel: {
    margin: "5px 0px 0px 4px",
  },
  checkboxInput: {
    height: 18,
    width: 18,
  },
});

function RadioButton(props: RadioButtonProps) {
  const classes = useStyles();
  return (
    <label className={classes.radioButtonContainer}>
      <input
        className={classes.checkboxInput}
        type="radio"
        onChange={props.onChange}
        value={props.value}
        checked={props.checked}
      />
      <span className={classes.radioLabel}>{props.label}</span>
    </label>
  );
}

export default RadioButton;
