import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import { MdDelete, MdUpdate } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import { updateListmodul } from "../firebase/updateListmodul";
import { getCurrentUserData } from "../firebase/getCurrentUserData";
import { getUserData } from "../firebase/getUserData";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2.5),
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Tasks({ tasks }) {
  console.log(tasks, "hfhdfhdjhfdjskhfjs");
  const classes = useStyles();

  const sortByDate = tasks.sort(function (a, b) {
    const dateA = new Date(a.date),
      dateB = new Date(b.date);
    return dateA - dateB;
  });

  const isDone = sortByDate.filter((task) => task.done === true);
  console.log(isDone);

  const isOpen = sortByDate.filter((task) => task.done === false);
  console.log(isOpen);

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4">Aufgaben</Typography>
      <List dense className={classes.root}>
        {isOpen.map((task, idx) => (
          <Task task={task} />
        ))}
      </List>
      <Typography variant="h4">Erledigt</Typography>
      <List dense className={classes.root}>
        {isDone.map((task, idx) => (
          <Task task={task} />
        ))}
      </List>
    </div>
  );
}

function Task({ task }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const handleChecked = (e) => {
    setChecked(!checked);
    updateListmodul(task.id, checked);
    setChecked();
  };

  // useEffect(() => {
  //   const loadUserData = async () => {
  //     const userData = await getUserData(task.assignedTo);
  //     setProfileImage(userData.profileImage);
  //   };
  //   loadUserData();
  // }, []);

  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt="Avatar" src={profileImage} className={classes.profileImage} />
      </ListItemAvatar>
      <ListItemText primary={task.title} secondary={task.date} />

      <IconButton edge="start" color="inherit" aria-label="Delete">
        <MdDelete />
      </IconButton>

      <ListItemSecondaryAction>
        <Checkbox edge="end" onChange={handleChecked} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
