import { useEffect, useState } from "react";
import Wrapper from "../base/Wrapper";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import FAB from "../FAB";
import FinancePopup from "./FinancePopup";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import ExpenseItem from "./ExpenseItem";
import { useRecoilValue } from "recoil";
import { activeGroupsState } from "../../utils/recoil";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ExpenseItemSkeleton from "./ExpenseItemSkeleton";
import DebtOverview from "./DebtOverview";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Skeleton from "@material-ui/lab/Skeleton";
import { motion } from "framer-motion";
import UpdatePopup from "../base/UpdatePopup";
import Snackbar from "../Snackbar";

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
  info: {
    display: "flex",
    marginTop: "20vh",
    justifyContent: "center",
    alignItems: "center",
  },
  infoIcon: {
    fontSize: "1.5rem",
    marginRight: theme.spacing(1),
  },
  skeleton: {
    margin: "12px",
  },
}));

function Finance() {
  const classes = useStyles();
  const [dataLoading, setDataLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [pageData, isLoading] = usePageData("Finance", update);
  const [openFinancePopup, setOpenFinancePopup] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [currentUserData, userIsLoading] = useCurrentUser();
  const [clickedItem, setClickedItem] = useState();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState();

  const activeGroups = useRecoilValue(activeGroupsState);

  useEffect(() => {
    const financeData = pageData ? pageData[0] : [];

    activeGroups.length > 1 ? setMultipleSelected(true) : setMultipleSelected(false);

    financeData &&
      setSortedData(
        financeData.sort(function (a, b) {
          var dateA = new Date(a.currentDate),
            dateB = new Date(b.currentDate);
          return dateB - dateA;
        })
      );

    setDataLoading(false);
  }, [pageData, activeGroups.length]);

  const handleUpdatePopup = (docID, title, groupID, color) => {
    setOpenUpdatePopup(true);
    setClickedItem({ docID, title, groupID, color });
  };

  if (isLoading || userIsLoading) {
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

  function loadingSkeleton() {
    const n = 6;
    return [...Array(n)].map((e, i) => (
      <div key={i}>
        <ExpenseItemSkeleton />
      </div>
    ));
  }

  const financeData = pageData[0];
  const settlementData = pageData[1];

  return (
    <>
      <ButtonAppBar title="Finanzen" />
      <Bubbles />
      <FAB open={() => setOpenFinancePopup(true)} />
      <FinancePopup
        open={openFinancePopup}
        close={() => setOpenFinancePopup(false)}
        update={() => setUpdate(!update)}
      />
      {openUpdatePopup && (
        <UpdatePopup
          open={openUpdatePopup}
          close={() => setOpenUpdatePopup(false)}
          clickedItem={clickedItem}
          update={() => setUpdate(!update)}
          collection={"Finance"}
          setSnackbarContent={setSnackbarContent}
        />
      )}
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Wrapper>
        {activeGroups.map((group) => {
          const groupID = group[0];
          const groupFinanceData = financeData.filter((doc) => doc.groupID === groupID);
          const groupSettlementData = settlementData.filter((doc) => doc.groupID === groupID);
          return (
            <DebtOverview
              financeData={groupFinanceData}
              settlementData={groupSettlementData}
              group={group}
              currentUserID={currentUserData.userId}
              update={() => setUpdate(!update)}
            />
          );
        })}
        {dataLoading && isLoading && activeGroups.length !== 0
          ? loadingSkeleton()
          : sortedData?.length !== 0 &&
            sortedData !== null &&
            sortedData.map((data, i) => (
              <div key={i}>
                <ExpenseItem
                  currentUserData={currentUserData}
                  title={data.title}
                  currentDate={data.currentDate}
                  expense={data.expense}
                  paidBy={data.paidBy}
                  groupID={data.groupID}
                  docID={data.docId}
                  color={data.color}
                  multipleSelected={multipleSelected}
                  settlementData={settlementData}
                  sortedData={sortedData}
                  ID={i}
                  handleUpdatePopup={handleUpdatePopup}
                  update={() => setUpdate(!update)}
                />
                <Divider />
              </div>
            ))}
        {activeGroups.length === 0 && (
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={`${classes.info} ${classes.center}`}
          >
            <AiOutlineInfoCircle className={classes.infoIcon} />
            Gruppe/-n auswählen
          </Typography>
        )}
      </Wrapper>
    </>
  );
}

export default Finance;
