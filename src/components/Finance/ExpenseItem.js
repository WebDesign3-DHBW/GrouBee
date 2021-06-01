import {
  Avatar,
  Divider,
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
  const [settled, setSettled] = useState(false);
  const [nextSettled, setNextSettled] = useState(false);
  const [settledDate, setSettledDate] = useState();
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
    function checkSettled() {
      if (Object(props.settlementData).length !== 0 && props.settlementData !== null) {
        props.settlementData.map((data, i) => {
          if (props.groupID === data.groupID) {
            //console.log("settleDate: " + data.settleDate + " currentDate: " + props.currentDate);
            setSettled(new Date(data.settleDate) > new Date(props.currentDate));
            //console.log(settled);
          }
          return null;
        });
      }
    }
    checkSettled();
    function getNext() {
      const sortedDataLength = Object(props.sortedData).length;
      let nextKey = 1;
      try {
        while (sortedDataLength - props.ID !== nextKey) {
          if (props.ID !== sortedDataLength) {
            let nextGroupID = props.sortedData[props.ID + nextKey].groupID;
            const nextDate = props.sortedData[props.ID + nextKey].currentDate;
            if (props.groupID !== nextGroupID) {
              nextKey = nextKey + 1;
            }
            if (props.groupID === nextGroupID) {
              nextKey = sortedDataLength + 1;
              props.settlementData.map((data, i) => {
                setNextSettled(new Date(data.settleDate) > new Date(nextDate));
                new Date(data.settleDate) > new Date(nextDate) && setSettledDate(data.settleDate);
                return null;
              });
            }
          }
        }
      } catch {}
    }
    getNext();
  }, [props]);

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
            className={`${settled && classes.crossedOut} ${!settled && classes.textPrimary}`}
          >
            {props.expense} €
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
      {!settled && nextSettled && (
        <>
          <Divider />
          <Typography variant="overline" color="primary">
            {groupName} beglichen{" "}
            {new Date(settledDate).toLocaleDateString("de-DE", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </>
      )}
    </>
  );
}

export default ExpenseItem;
