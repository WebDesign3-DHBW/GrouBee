//import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "../base/Wrapper";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import { Divider } from "@material-ui/core";
import BalanceCard from "./BalanceCard";
import ExpenseItem from "./ExpenseItem";

//const useStyles = makeStyles((theme) => ({}));

function Finance() {
  //const classes = useStyles();
  const [financeData, isLoading] = usePageData("Finance");

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log("financeData", financeData);

  return (
    <>
      <ButtonAppBar title="Finanzen" />
      <Bubbles />
      <Wrapper>
        <BalanceCard value="9,80" />
        <BalanceCard value="15,20" group="WG" />
        <BalanceCard value="-5,40" group="Friends" />
        {financeData.map((data) => (
          <>
            <ExpenseItem
              title="Snacks"
              name="Hannes"
              date="Mi., 28. April 2021"
              value={data.value}
              settled={false}
            />
            <Divider />
          </>
        ))}
      </Wrapper>
    </>
  );
}

export default Finance;
