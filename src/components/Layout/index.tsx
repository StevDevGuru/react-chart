import React, { ReactNode } from "react";
import { createUseStyles } from "react-jss";

interface SizeProps {
  span?: number;
  sm?: number;
}

const useStyles = createUseStyles({
  container: {
    width: "100%",
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
  },
  col: {
    flex: (props: SizeProps) =>
      props.span ? `0 0 ${(100 * props.span) / 12}%` : "0 0 100%",
    maxWidth: ({ span }: SizeProps) =>
      span ? `${(100 * span) / 12}%` : "100%",
    "@media (max-width: 768px)": {
      flex: (props: SizeProps) =>
        props.sm ? `0 0 ${(100 * props.sm) / 12}%` : "0 0 100%",
      maxWidth: ({ sm }: SizeProps) => (sm ? `${(100 * sm) / 12}%` : "100%"),
    },
  },
});

interface ChildrenProps {
  children: ReactNode;
}

export const Container: React.FC<ChildrenProps> = ({ children }) => {
  const classes = useStyles({});
  return <div className={classes.container}>{children}</div>;
};

export const Row: React.FC<ChildrenProps> = ({ children }) => {
  const classes = useStyles({});
  return <div className={classes.row}>{children}</div>;
};

interface ColProps extends ChildrenProps {
  span?: number;
  sm?: number;
}

export const Col: React.FC<ColProps> = ({ span, sm, children }) => {
  const classes = useStyles({ span, sm });
  return <div className={classes.col}>{children}</div>;
};
