import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const array = [
  {
    date: "2020-05-16",
    done: true,
    assignedTo: "ASJdfaöo",
    list: "einkaufen",
    title: "wichtige Todo1",
    groupID: "ALKSDJSA",
  },
  {
    date: "2020-05-14",
    done: true,
    assignedTo: "ASJdfaöo",
    list: "einkaufen",
    title: "wichtige Todo2",
    groupID: "ALKSDJSA",
  },
  {
    date: "2020-05-15",
    done: false,
    assignedTo: "ASJdfaöo",
    list: "einkaufen",
    title: "wichtige Todo3",
    groupID: "ALKSDJSA",
  },
];

const sortedArray = array.sort(function (a, b) {
  const dateA = new Date(a.date),
    dateB = new Date(b.date);
  return dateA - dateB;
});

const isDone = array.filter((task) => task.done === true);
console.log(isDone);

const isOpen = array.filter((task) => task.done === false);
console.log(isOpen);

const profileImage =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";

export default function Tasks() {
  const classes = useStyles();

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
  const [checked, setChecked] = React.useState(false);
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
        <Checkbox edge="end" onChange={() => setChecked(!checked)} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
