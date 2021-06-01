import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { getSettlementData } from "../../firebase/getSettlementData";
import Wrapper from "../base/Wrapper";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import { Divider } from "@material-ui/core";
// import BalanceCard from "./BalanceCard";
import ExpenseItem from "./ExpenseItem";
import { useEffect, useState } from "react";

function Finance() {
  const [currentUserData, setCurrentUserData] = useState();
  const [multipleSelected, setMultipleSelected] = useState(false);
  const [financeData, isLoading] = usePageData("Finance");
  const [dataLoading, setDataLoading] = useState(true);
  const [sortedData, setSortedData] = useState(null);
  const [settlementData, setSettlementData] = useState(null);

  useEffect(() => {
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
      function getGroupIDs() {
        let IDs = [];
        financeData.map((data) => {
          if (IDs.indexOf(data.groupID)) {
            IDs.push(data.groupID);
          }
          return null;
        });
        return IDs;
      }
      function multipleGroupsSelected() {
        if (1 < Object.keys(getGroupIDs()).length) {
          return true;
        }
      }
      if (multipleGroupsSelected()) {
        setMultipleSelected(true);
      } else {
        setMultipleSelected(false);
      }
      let sData = Object.keys(getGroupIDs()).length !== 0 && getSettlementData(getGroupIDs());
      sData.then((data) => {
        setSettlementData([...data]);
      });
    } catch {}
    setDataLoading(false);
  }, [financeData]);

  if (dataLoading && isLoading) {
    return <p>Loading...</p>;
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
