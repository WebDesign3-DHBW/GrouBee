import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { getUserData } from "../../firebase/getUserData";

const useStyles = makeStyles((theme) => ({
  crossedOut: {
    textDecoration: "line-through",
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
}));

function ExpenseItem(props) {
  const [profileImage, setProfileImage] = useState();
  const [profileName, setProfileName] = useState();
  const [groupName, setGroupName] = useState();
  const classes = useStyles();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserData(props.paidBy);
      try {
        setProfileImage(userData.profileImage);
        setProfileName(userData.userName);
        setGroupName(props.currentUserData.groups[props.groupID]);
      } catch {}
    };
    loadUserData();
  }, [props.paidBy, props.currentUserData.groups, props.groupID]);

  return (
    <>
      <ListItem className="nplr">
        <ListItemAvatar>
          <Avatar alt="Avatar" src={profileImage} />
        </ListItemAvatar>
        <ListItemText
          primary={props.title}
          secondary={`${profileName} ${
            props.multipleSelected ? "@" + groupName + " | " : "|"
          } ${new Date(props.currentDate).toLocaleDateString("de-DE", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
        />
        <ListItemSecondaryAction className="nr">
          <Typography
            className={`${props.settled && classes.crossedOut} ${
              !props.settled && classes.textPrimary
            }`}
          >
            {props.expense} €
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}

export default ExpenseItem;
