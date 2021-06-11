import {
  Avatar,
  CardActionArea,
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

function ExpenseItem({ expenseItem, multipleSelected, groupName, settled, handleUpdatePopup }) {
  const { title, currentDate, expense, paidBy, groupID, color } = expenseItem;

  const classes = useStyles();
  const [profileImage, setProfileImage] = useState();
  const [profileName, setProfileName] = useState();

  useEffect(() => {
    console.log(`rendered`);
    const loadUserData = async () => {
      const userData = await getUserData(paidBy);
      setProfileImage(userData.profileImage);
      setProfileName(userData.userName);
    };
    loadUserData();
  }, [paidBy]);

  const handleClick = (e) => {
    e.stopPropagation();
    handleUpdatePopup(expenseItem.docID, title, groupID, color);
  };

  return (
    <>
      <CardActionArea style={{ padding: "0px 5px" }} onClick={handleClick}>
        <ListItem className="nplr">
          <ListItemAvatar>
            <Avatar alt="Avatar" src={profileImage} />
          </ListItemAvatar>
          <ListItemText
            primary={title}
            secondary={
              groupName &&
              `${profileName} ${multipleSelected ? "@" + groupName + " | " : "|"} ${new Date(
                currentDate
              ).toLocaleDateString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}`
            }
          />
          <ListItemSecondaryAction className="nr">
            <Typography className={settled ? classes.crossedOut : classes.textPrimary}>
              {String(expense)
                .replace(".", ",")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              €
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </CardActionArea>
    </>
  );
}

export default ExpenseItem;
