import { Avatar, makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  active: {
    border: "1px solid black",
  },
}));

function Bubble({ group, toggleElement, activeGroups }) {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  const checked = activeGroups.some((groupArr) => groupArr[0] === group[0]);

  const styles = checked ? classes.active : null;

  return (
    <>
      <span
        onClick={() => {
          setActive(!active);
          toggleElement(group);
        }}
      >
        <Avatar className={styles}>{group[1]}</Avatar>
      </span>
    </>
  );
}

export default Bubble;
