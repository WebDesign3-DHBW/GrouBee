import { Avatar, makeStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { useLocation } from "@reach/router";
import { useState } from "react";
import GroupLink from "./Settings/GroupLink";
import { AiFillCloseCircle } from "react-icons/ai";
import { removeGroupFromCurrentUser } from "../firebase/removeGroupFromCurrentUser";

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
  badge: {
    fontSize: theme.typography.h3.fontSize,
    color: theme.palette.secondary.dark,
  },
}));

function Bubble({ group, toggleElement, activeGroups, allGroups, update }) {
  const classes = useStyles();

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isSettings = location.pathname === "/settings";

  const checked = activeGroups.some((groupArr) => groupArr[0] === group[0]);

  const styles = checked ? classes.active : classes.inactive;

  const ellipsis = group[1].name.length > 7 ? "…" : "";

  return (
    <>
      <GroupLink
        groupID={`${group[1].name}/${group[0]}${group[1].color.replace("#", "")}`}
        open={open}
        close={() => setOpen(false)}
      />
      {isSettings ? (
        <>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            variant="standard"
            badgeContent={
              <AiFillCloseCircle
                className={classes.badge}
                style={group[1].name === "ICH" ? { display: "none" } : null}
                onClick={() => {
                  if (group[1] !== "ICH") {
                    removeGroupFromCurrentUser(group[0], allGroups);
                    update();
                  } else {
                    return;
                  }
                }}
              />
            }
          >
            <span
              onClick={() => {
                if (group[1].name !== "ICH") {
                  setOpen(true);
                } else {
                  return;
                }
              }}
              className={classes.bubble}
            >
              <Avatar className={classes.avatar} style={{ backgroundColor: group[1].color }}>
                {group[1].name.substring(0, 7).concat(ellipsis)}
              </Avatar>
            </span>
          </Badge>
        </>
      ) : (
        <span
          onClick={() => {
            setActive(!active);
            toggleElement(group);
          }}
          className={`${styles} ${classes.bubble}`}
        >
          <Avatar className={classes.avatar} style={{ backgroundColor: group[1].color }}>
            {group[1].name.substring(0, 7).concat(ellipsis)}
          </Avatar>
        </span>
      )}
    </>
  );
}

export default Bubble;
