import { Avatar, makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  circle: {
    width: "64px",
    height: "64px",
  },
  active: {
    background: "linear-gradient(left top, red 0%, #f90 100%)",
    borderRadius: "1000px",
    padding: "4px",
  },
  inactive: {
    padding: "4px",
  },
}));

function Bubble({ group, toggleElement, activeGroups }) {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  const checked = activeGroups.some((groupArr) => groupArr[0] === group[0]);

  const styles = checked ? classes.active : classes.inactive;

  return (
    <span
      onClick={() => {
        setActive(!active);
        toggleElement(group);
      }}
      className={styles}
    >
      <Avatar className={classes.circle}>{group[1]}</Avatar>
    </span>
  );
}

export default Bubble;
