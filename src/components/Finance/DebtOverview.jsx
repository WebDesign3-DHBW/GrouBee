import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { addSettlement } from "../../firebase/addSettlement";
import { getAllUserData } from "../../firebase/getAllUserData";

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
  const [allUserInGroup, setAllUserInGroup] = useState([]);

  useEffect(() => {
    const getUserInGroup = async () => {
      const allUserData = await getAllUserData();
      const groupUserNames = allUserData
        .filter((user) => Object.keys(user.groups).some((id) => id === group.groupID))
        .map((user) => ({
          name: user.userName,
          id: user.userId,
        }));
      setAllUserInGroup(groupUserNames);
    };
    getUserInGroup();
  }, [group.groupID]);

  function getLatestSettleDate() {
    let currentNewestSettleDate = new Date("2000-01-01");

    settlementData.forEach((data) => {
      if (data.groupID === group[0]) {
        if (new Date(data.settleDate) >= currentNewestSettleDate) {
          currentNewestSettleDate = data.settleDate;
          console.log(currentNewestSettleDate);
        }
      }
    });
    return currentNewestSettleDate;
  }

  function calculateDebt() {
    const settlementDate = getLatestSettleDate();

    var groupsize = allUserInGroup.length !== 0 ? allUserInGroup.length : 1;

    const filteredFinanceData = financeData.filter((entry) => {
      return new Date(entry.currentDate) > new Date(settlementDate);
    });
    console.log(filteredFinanceData);

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
    calculateDebt();
    //muss neu rendern
  }

  return (
    <Card className={classes.box}>
      <h2 className={classes.debt}>{calculateDebt()}</h2>
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
