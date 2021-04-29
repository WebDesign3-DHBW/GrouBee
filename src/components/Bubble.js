import { Avatar, makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "64px",
    height: "64px",
    color: "#000",
    fontSize: "0.75rem",
  },
  bubble: {
    display: "inline-block",
    margin: theme.spacing(1),
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

function Bubble({ group, toggleElement, activeGroups, color }) {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  const checked = activeGroups.some((groupArr) => groupArr[0] === group[0]);

  const styles = checked ? classes.active : classes.inactive;

  const ellipsis = group[1].length > 7 ? "…" : "";

  return (
    <>
      <span
        onClick={() => {
          setActive(!active);
          toggleElement(group);
        }}
        className={`${styles} ${classes.bubble}`}
      >
        <Avatar className={classes.avatar} style={{ backgroundColor: color }}>
          {group[1].substring(0, 7).concat(ellipsis)}
        </Avatar>
      </span>
    </>
  );
}

export default Bubble;
