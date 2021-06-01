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
// import BalanceCard from "./BalanceCard";
import ExpenseItem from "./ExpenseItem";
import { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRecoilValue } from "recoil";
import { activeGroupsState } from "../../utils/recoil";

function Finance() {
  const [currentUserData, setCurrentUserData] = useState();
  const [financeData, isLoading] = usePageData("Finance");
  const [multipleSelected, setMultipleSelected] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
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
    try {
      setSortedData(
        financeData.sort(function (a, b) {
          var dateA = new Date(a.currentDate),
            dateB = new Date(b.currentDate);
          return dateB - dateA;
        })
      );
      function multipleGroupsSelected() {
        if (1 < Object.keys(activeGroupIDs).length) {
          return true;
        }
      }
      if (multipleGroupsSelected()) {
        setMultipleSelected(true);
      } else {
        setMultipleSelected(false);
      }
      let sData = Object.keys(activeGroupIDs).length !== 0 && getSettlementData(activeGroupIDs);
      sData.then((data) => {
        setSettlementData([...data]);
      });
    } catch {}
    setDataLoading(false);
  }, [financeData, activeGroups]);

  //if (dataLoading && isLoading) {
  if (false) {
    return (
      <>
        <ButtonAppBar title="Finanzen" />
        <Bubbles />
        <Wrapper>
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
        </Wrapper>
      </>
    );
  } else {
    return (
      <>
        <ButtonAppBar title="Finanzen" />
        <Bubbles />
        <Wrapper>
          {/* <BalanceCard value="9,80" />
        <BalanceCard value="15,20" group="WG" />
        <BalanceCard value="-5,40" group="Friends" /> */}
          {Object(sortedData).length !== 0 &&
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
}

export default Finance;
