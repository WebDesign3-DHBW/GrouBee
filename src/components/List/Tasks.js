import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import { updateListmodul } from "../../firebase/updateListmodul";
import { deleteListItem } from "../../firebase/deleteListItem";
import { getUserData } from "../../firebase/getUserData";
import { AiOutlineInfoCircle } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2.5),
  },
  root: {
    width: "100%",
    maxWidth: 360,
  },
  info: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
  },
  infoIcon: {
    fontSize: "1.5rem",
    marginRight: theme.spacing(1),
  },
  center: {
    textAlign: "center",
    margin: theme.spacing(3, 0),
  },
  title: {
    margin: theme.spacing(1, 0),
  },
}));

export default function Tasks({ tasks, update, category }) {
  const classes = useStyles();

  const sortByDateAndCateogry = tasks
    .filter((task) => task.list === category)
    .sort(function (a, b) {
      const dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });

  const renderTaskByCategory = (status) => {
    const isDone = status === "done" ? true : false;
    const taskBycategory = sortByDateAndCateogry
      .filter((task) => task.done === isDone)
      .map((task, idx) => (
        <List dense className={classes.root} key={idx}>
          <Task task={task} update={update} />
        </List>
      ));

    if (taskBycategory.length === 0 && status === "open") {
      return (
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={`${classes.info} ${classes.center}`}
        >
          <AiOutlineInfoCircle className={classes.infoIcon} />
          Du hast keine offenen Aufgaben
        </Typography>
      );
    }
    return taskBycategory;
  };

  return (
    <div className={classes.wrapper}>
      <Typography variant="h2" className={classes.title}>
        Aufgaben
      </Typography>
      {renderTaskByCategory("open")}
      {renderTaskByCategory("done").length !== 0 && (
        <>
          <Typography variant="h2" className={classes.title}>
            Erledigt
          </Typography>
          {renderTaskByCategory("done")}
        </>
      )}
    </div>
  );
}

function Task({ task, update }) {
  const [profileImage, setProfileImage] = useState();

  const handleChecked = (e) => {
    updateListmodul(task.docId, !task.done);
    update();
  };

  const handleDelete = (e) => {
    deleteListItem(task.docId);
    update();
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserData(task.assignedTo);
      setProfileImage(userData.profileImage);
    };
    loadUserData();
  }, [task.assignedTo]);

  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt="Avatar" src={profileImage} />
      </ListItemAvatar>
      <ListItemText
        primary={task.title}
        secondary={new Date(task.date).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />

      <IconButton edge="start" color="inherit" aria-label="Delete" onClick={handleDelete}>
        <MdDelete />
      </IconButton>

      <ListItemSecondaryAction>
        <PrimaryCheckbox edge="end" checked={task.done} onChange={handleChecked} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

const PrimaryCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    "&$checked": {
      color: theme.palette.primary.main,
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);
