import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { activeGroupsState } from "../utils/recoil";
import { useRecoilState } from "recoil";
import Skeleton from "@material-ui/lab/Skeleton";
import { colors } from "../theme/bubbleColors";

import Bubble from "./Bubble";
import { getCurrentUserData } from "../firebase/getCurrentUserData";

const useStyles = makeStyles(() => ({
  root: {
    whiteSpace: "nowrap",
    overflowX: "auto",
    scrollbarWidth: "none" /* Firefox */,
    "&::-webkit-scrollbar": {
      display: "none" /*Chrome, Safari and Opera*/,
    },
  },
  skeleton: {
    margin: "12px",
  },
}));

function Bubbles({ updateMe }) {
  console.log("updateMe", updateMe);
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
  }, [updateMe]);

  // Todo: styles
  if (isLoading) {
    return (
      <div style={{ display: "flex" }}>
        <Skeleton variant="circle" width={64} height={64} className={classes.skeleton} />
        <Skeleton variant="circle" width={64} height={64} className={classes.skeleton} />
        <Skeleton variant="circle" width={64} height={64} className={classes.skeleton} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {Object.entries(groups)
        // Sort by group name
        .sort((a, b) => a[1].localeCompare(b[1]))
        // Place "ICH" at the beginning
        .sort((a, b) => (b[1] === "ICH") - (a[1] === "ICH"))
        .map((group, idx) => {
          return (
            <Bubble
              key={idx}
              group={group}
              toggleElement={toggleElement}
              activeGroups={activeGroups}
              color={colors[idx]}
            />
          );
        })}
    </div>
  );
}

export default Bubbles;
