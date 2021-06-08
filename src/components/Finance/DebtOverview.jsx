import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { addSettlement } from "../../firebase/addSettlement";

const useStyles = makeStyles((theme) => ({
  box: {
    variant: "outlined",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
  },
  debt: {
    marginBottom: "0",
  },
  group: {
    margin: theme.spacing(1),
  },
  calculate: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

function DebtOverview({ financeData, settlementData, group, currentUserID }) {
  const classes = useStyles();
  const [allUserInGroup, setAllUserInGroup] = useState();
  const [latestSettleDate, setLatestSettleDate] = useState();

  function getLatestSettleDate() {
    settlementData.map((data) =>
      // if(data.groupID === group[0]) {
      //   if(new Date(data.settleDate) > new Date(latestSettleDate)) {
      //     setLatestSettleDate(data.settleDate)
      //   }
      // }
      setLatestSettleDate(new Date().toISOString().split("T")[0])
    );
  }

  function calculateDebt() {
    // getLatestSettleDate();

    var groupsize = allUserInGroup !== 0 ? allUserInGroup.length : 1;

    const filteredFinanceData = financeData;

    const sumPaidByMe = filteredFinanceData
      .filter((entry) => entry.paidBy === currentUserID)
      .reduce((sumValue, entry) => {
        return sumValue + entry.expense;
      }, 0);

    const sumNotPaidByMe = filteredFinanceData
      .filter((entry) => entry.paidBy !== currentUserID)
      .reduce((sumValue, entry) => {
        return sumValue + entry.expense;
      }, 0);

    console.log("pbd", sumPaidByMe);
    console.log("npbm", sumNotPaidByMe);

    let debt = sumNotPaidByMe / groupsize - sumPaidByMe / groupsize;

    if (debt > 0) {
      debt = "-" + debt;
    }

    if (sumPaidByMe > sumNotPaidByMe) {
      debt = debt * -1;
    }
    return debt;
  }

  function handleSettle() {
    const settleDate = new Date().toISOString().split("T")[0];
    const groupID = group[0];
    const entry = { groupID, settleDate };
    addSettlement(entry);
  }

  return (
    <Card className={classes.box}>
      <h2 className={classes.debt}>{calculateDebt()}</h2>
      {/* wenn debt negativ ist, muss das - angezeigt werden, sonst nicht */}
      <Typography className={classes.group}>offen an {group[1].name}</Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.calculate}
        onClick={handleSettle}
      >
        Abrechnen
      </Button>
    </Card>
  );
}

export default DebtOverview;
