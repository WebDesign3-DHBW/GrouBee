import {
  Avatar,
  CardActionArea,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { getUserData } from "../../firebase/getUserData";
import ExpenseItemSkeleton from "./ExpenseItemSkeleton";
import { MdDelete } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  crossedOut: {
    textDecoration: "line-through",
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
}));

function ExpenseItem(props, open) {
  const classes = useStyles();
  const [dataLoading, setDataLoading] = useState(true);
  const [profileImage, setProfileImage] = useState();
  const [profileName, setProfileName] = useState();
  const [groupName, setGroupName] = useState();
  const [settled, setSettled] = useState(false);
  const [nextSettled, setNextSettled] = useState(false);
  const [settledDate, setSettledDate] = useState();
  const [settledDateDocID, setSettledDateDocID] = useState();

  useEffect(() => {
    console.log("settledDate" + settledDate);
    const loadUserData = async () => {
      const userData = await getUserData(props.paidBy);
      try {
        setProfileImage(userData.profileImage);
        setProfileName(userData.userName);
        setGroupName(props.currentUserData.groups[props.groupID].name);
      } catch {}
    };
    loadUserData();
    function checkSettled() {
      if (props.settlementData?.length !== 0 && props.settlementData !== null) {
        props.settlementData.map((data, i) => {
          if (props.groupID === data.groupID) {
            setSettled(new Date(data.settleDate) >= new Date(props.currentDate));
          }
          return null;
        });
      }
    }
    checkSettled();
    function getNext() {
      const sortedDataLength = props.sortedData.length;
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
                if (new Date(data.settleDate) > new Date(nextDate)) {
                  setSettledDate(data.settleDate);
                  setSettledDateDocID(data.docId);
                }
                return null;
              });
            }
          }
        }
      } catch {}
    }
    getNext();
    setDataLoading(false);
  }, [
    props.update,
    props.settlementData,
    props.ID,
    props.currentDate,
    props.currentUserData.group,
    props.groupID,
    props.paidBy,
    props.sortedData,
    props.currentUserData.groups,
  ]);

  const SettlementDivider = () => {
    return (
      <div style={{ display: "flex" }}>
        <Typography variant="overline" color="primary">
          zul. {groupName} beglichen{" "}
          {new Date(settledDate).toLocaleDateString("de-DE", {
            weekday: "short",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </Typography>
        <div style={{ marginLeft: "auto", display: "flex" }}>
          <IconButton
            edge="end"
            aria-label="Delete"
            onClick={() => {
              props.clicked([settledDateDocID, settledDate, groupName]);
              props.openConfirm(true);
            }}
            size="small"
            color="primary"
          >
            <MdDelete />
          </IconButton>
        </div>
      </div>
    );
  };

  const handleClick = (e) => {
    e.stopPropagation();
    props.handleUpdatePopup(props.docID, props.title, props.groupID, props.color);
  };

  if (dataLoading) {
    return <ExpenseItemSkeleton />;
  } else {
    return (
      <>
        <CardActionArea style={{ padding: "0px 5px" }} onClick={handleClick}>
          {settled && props.ID === 0 && (
            <>
              <Divider />
              <SettlementDivider />
              <Divider />
            </>
          )}
          <ListItem className="nplr">
            <ListItemAvatar>
              <Avatar alt="Avatar" src={profileImage} />
            </ListItemAvatar>
            <ListItemText
              primary={props.title}
              secondary={
                groupName &&
                `${profileName} ${
                  props.multipleSelected ? "@" + groupName + " | " : "|"
                } ${new Date(props.currentDate).toLocaleDateString("de-DE", {
                  weekday: "short",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}`
              }
            />
            <ListItemSecondaryAction className="nr">
              <Typography
                className={`${settled && classes.crossedOut} ${!settled && classes.textPrimary}`}
              >
                {String(props.expense)
                  .replace(".", ",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                €
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </CardActionArea>
        {!settled && nextSettled && (
          <>
            <Divider />
            <SettlementDivider />
          </>
        )}
      </>
    );
  }
}

export default ExpenseItem;
