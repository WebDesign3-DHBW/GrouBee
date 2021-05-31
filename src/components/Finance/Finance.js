//import { makeStyles } from "@material-ui/core/styles";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import Wrapper from "../base/Wrapper";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import { Divider } from "@material-ui/core";
// import BalanceCard from "./BalanceCard";
import ExpenseItem from "./ExpenseItem";
import { useEffect, useState } from "react";

//const useStyles = makeStyles((theme) => ({}));

function Finance() {
  //const classes = useStyles();
  const [currentUserData, setCurrentUserData] = useState();
  const [financeData, isLoading] = usePageData("Finance");
  const [sortedData, setSortedData] = useState();
  const [multipleSelected, setMultipleSelected] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getCurrentUserData();
      setCurrentUserData(userData);
    };
    loadUserData();
    function multipleGroupsSelected() {
      const firstGroupID = Object.values(financeData)[0].groupID;
      let isTrue = false;
      financeData.map((data) => {
        if (firstGroupID !== data.groupID) {
          isTrue = true;
        }
        return null;
      });
      return isTrue;
    }
    try {
      setSortedData(
        financeData.sort(function (a, b) {
          var dateA = new Date(a.currentDate),
            dateB = new Date(b.currentDate);
          return dateB - dateA;
        })
      );
      if (multipleGroupsSelected()) {
        setMultipleSelected(true);
      } else {
        setMultipleSelected(false);
      }
    } catch {}
  }, [financeData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ButtonAppBar title="Finanzen" />
      <Bubbles />
      <Wrapper>
        {/* <BalanceCard value="9,80" />
        <BalanceCard value="15,20" group="WG" />
        <BalanceCard value="-5,40" group="Friends" /> */}
        {sortedData.map((data) => (
          <>
            <ExpenseItem
              currentUserData={currentUserData}
              title={data.title}
              currentDate={data.currentDate}
              expense={data.expense}
              paidBy={data.paidBy}
              groupID={data.groupID}
              settled={false}
              multipleSelected={multipleSelected}
            />
            <Divider />
          </>
        ))}
      </Wrapper>
    </>
  );
}

export default Finance;
