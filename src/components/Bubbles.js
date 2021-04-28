import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { activeGroupsState } from "../utils/recoil";
import { useRecoilState } from "recoil";
import Skeleton from "@material-ui/lab/Skeleton";

import Bubble from "./Bubble";
import { getCurrentUserData } from "../firebase/getCurrentUserData";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Bubbles() {
  const classes = useStyles();
  const [activeGroups, setActiveGroups] = useRecoilState(activeGroupsState);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // add or delete active group
  const toggleElement = (group) => {
    const groupID = group[0];
    // Check if group already in Array
    if (activeGroups.some((el) => el[0] === groupID)) {
      // if in array -> remove
      setActiveGroups((prevArray) => [...prevArray.filter((groupArr) => groupArr[0] !== groupID)]);
    } else {
      // else -> add
      setActiveGroups((prevArray) => [...prevArray, group]);
    }
  };

  // load all groupes
  useEffect(() => {
    const loadInitialFeedData = async () => {
      setIsLoading(true);
      const currentUserData = await getCurrentUserData();
      setGroups(currentUserData.groups);
      setIsLoading(false);
    };

    loadInitialFeedData();
  }, []);

  // Todo: styles
  if (isLoading) {
    return <Skeleton variant="circle" width={40} height={40} />;
  }

  return (
    <div className={classes.root}>
      {Object.entries(groups).map((group, idx) => {
        return (
          <Bubble
            key={idx}
            group={group}
            toggleElement={toggleElement}
            activeGroups={activeGroups}
          />
        );
      })}
    </div>
  );
}

export default Bubbles;
