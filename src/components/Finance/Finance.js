import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { getSettlementData } from "../../firebase/getSettlementData";
import Wrapper from "../base/Wrapper";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import ExpenseItem from "./ExpenseItem";
import { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRecoilValue } from "recoil";
import { activeGroupsState } from "../../utils/recoil";

function Finance() {
  const [dataLoading, setDataLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState();
  const [financeData, isLoading] = usePageData("Finance");
  const [multipleSelected, setMultipleSelected] = useState(false);
  const [sortedData, setSortedData] = useState(null);
  const [settlementData, setSettlementData] = useState(null);

  const activeGroups = useRecoilValue(activeGroupsState);

  useEffect(() => {
    const activeGroupIDs = activeGroups.map((groupArr) => groupArr[0]);
    const loadUserData = async () => {
      const userData = await getCurrentUserData();
      setCurrentUserData(userData);
    };
    loadUserData();
    function multipleGroupsSelected() {
      1 < Object.keys(activeGroupIDs).length
        ? setMultipleSelected(true)
        : setMultipleSelected(false);
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
      if (Object.keys(activeGroupIDs).length !== 0) {
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
      <>
        <ListItem className="nplr" style={{ marginBottom: 4, marginTop: 4 }}>
          <ListItemAvatar>
            <Skeleton variant="circle">
              <Avatar />
            </Skeleton>
          </ListItemAvatar>
          <ListItemText>
            <Skeleton animation="wave" height={20} width="60%" style={{ marginBottom: 5 }} />
            <Skeleton animation="wave" height={15} width="40%" />
          </ListItemText>
          <ListItemSecondaryAction className="nr">
            <Skeleton animation="wave" height={30} width="2rem" />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </>
    ));
  }

  return (
    <>
      <ButtonAppBar title="Finanzen" />
      <Bubbles />
      <Wrapper>
        {dataLoading && isLoading
          ? loadingSkeleton()
          : Object(sortedData).length !== 0 &&
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
      </Wrapper>
    </>
  );
}

export default Finance;
