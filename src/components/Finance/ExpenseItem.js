import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  crossedOut: {
    textDecoration: "line-through",
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
}));

function ExpenseItem(props) {
  const classes = useStyles();

  return (
    <>
      <ListItem className="nplr">
        <ListItemAvatar>
          <Avatar
            alt="Avatar"
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
          />
        </ListItemAvatar>
        <ListItemText primary={props.title} secondary={`${props.name} | ${props.date}`} />
        <ListItemSecondaryAction className="nr">
          <Typography
            className={`${props.settled && classes.crossedOut} ${
              !props.settled && classes.textPrimary
            }`}
          >
            {props.value} €
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}

export default ExpenseItem;
