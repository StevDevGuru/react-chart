import React from "react";
import { createUseStyles } from "react-jss";
import { BORDER_GREY, PRIMARY_COLOR } from "../../style/colors";

interface SpinProps {
  spinning: boolean;
  children: React.ReactNode;
}

const useStyles = createUseStyles({
  spinnerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 1,
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 20,
    height: 20,
    border: `4px solid ${BORDER_GREY}`,
    borderRadius: "50%",
    borderTop: `4px solid ${PRIMARY_COLOR}`,
    animation: "$spin 0.4s linear infinite",
    zIndex: 2000,
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
});

export const Spin = ({ spinning, children }: SpinProps) => {
  const classes = useStyles();
  return (
    <div>
      {spinning && <div className={classes.spinnerOverlay}></div>}
      {spinning && <div className={classes.spinner}></div>}
      {children}
    </div>
  );
};
