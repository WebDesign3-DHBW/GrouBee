import { makeStyles } from "@material-ui/core";
import { activeGroupsState } from "../utils/recoil";
import { useRecoilState } from "recoil";
import Skeleton from "@material-ui/lab/Skeleton";
import { motion } from "framer-motion";

import Bubble from "./Bubble";
import { useCurrentUser } from "../hooks/useCurrentUser";

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

function Bubbles({ updateMe, updateBubbles }) {
  const classes = useStyles();
  const [activeGroups, setActiveGroups] = useRecoilState(activeGroupsState);
  const [userData, isLoading] = useCurrentUser(updateMe);

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

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ delay: 1 }}>
        <div style={{ display: "flex" }}>
          <Skeleton variant="circle" width={64} height={64} className={classes.skeleton} />
          <Skeleton variant="circle" width={64} height={64} className={classes.skeleton} />
          <Skeleton variant="circle" width={64} height={64} className={classes.skeleton} />
        </div>
      </motion.div>
    );
  }

  return (
    <div className={classes.root}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: [0, 1], x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {Object.entries(userData.groups)
          // Sort by group name
          .sort((a, b) => a[1].name.localeCompare(b[1].name))
          // Place "ICH" at the beginning
          .sort((a, b) => (b[1].name === "ICH") - (a[1].name === "ICH"))
          .map((group, idx) => {
            return (
              <Bubble
                key={idx}
                group={group}
                allGroups={userData.groups}
                toggleElement={toggleElement}
                activeGroups={activeGroups}
                update={updateBubbles}
              />
            );
          })}
      </motion.div>
    </div>
  );
}

export default Bubbles;
