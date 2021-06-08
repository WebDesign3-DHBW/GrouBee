import { useEffect, useState } from "react";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { getSettlementData } from "../../firebase/getSettlementData";
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
import { getAllUserData } from "../../firebase/getAllUserData";

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
}));

function Finance() {
  const classes = useStyles();
  const [dataLoading, setDataLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState();
  const [update, setUpdate] = useState(false);
  const [financeData, isLoading] = usePageData("Finance", update);
  const [openFinancePopup, setOpenFinancePopup] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState(false);
  const [sortedData, setSortedData] = useState(null);
  const [currentUserId, setUserID] = useState();
  const [settlementData, setSettlementData] = useState([]);

  const activeGroups = useRecoilValue(activeGroupsState);

  useEffect(() => {
    const activeGroupIDs = activeGroups.map((groupArr) => groupArr[0]);
    const loadUserData = async () => {
      const userData = await getCurrentUserData();
      setCurrentUserData(userData);
      setUserID(userData.userId);
    };
    loadUserData();
    function multipleGroupsSelected() {
      activeGroupIDs.length > 1 ? setMultipleSelected(true) : setMultipleSelected(false);
    }
    multipleGroupsSelected();
    financeData &&
      setSortedData(
        financeData.sort(function (a, b) {
          var dateA = new Date(a.currentDate),
            dateB = new Date(b.currentDate);
          return dateB - dateA;
        })
      );
    const handleSettlementData = async () => {
      if (activeGroupIDs.length !== 0) {
        const settlementData = await getSettlementData(activeGroupIDs);
        setSettlementData(settlementData);
      }
    };
    handleSettlementData();
    setDataLoading(false);
  }, [financeData, activeGroups]);

  function loadingSkeleton() {
    const n = 6;
    return [...Array(n)].map((e, i) => (
      <div key={i}>
        <ExpenseItemSkeleton />
      </div>
    ));
  }

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
      <Wrapper>
        {activeGroups.map((group) => (
          <DebtOverview
            financeData={financeData}
            settlementData={settlementData}
            group={group}
            currentUserID={currentUserId}
          />
        ))}
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
                  multipleSelected={multipleSelected}
                  settlementData={settlementData}
                  sortedData={sortedData}
                  ID={i}
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
