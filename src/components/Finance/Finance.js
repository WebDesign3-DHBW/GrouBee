import { useState } from "react";
import Wrapper from "../base/Wrapper";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import FAB from "../FAB";
import FinancePopup from "./FinancePopup";
import { CircularProgress, Divider, makeStyles, Typography, IconButton } from "@material-ui/core";
import ExpenseItem from "./ExpenseItem";
import { useRecoilValue } from "recoil";
import { activeGroupsState } from "../../utils/recoil";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ExpenseItemSkeleton from "./ExpenseItemSkeleton";
import DebtOverview from "./DebtOverview";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import UpdatePopup from "../base/UpdatePopup";
import ConfirmPopup from "../List/ConfirmPopup";
import Snackbar from "../Snackbar";
import { MdDelete } from "react-icons/md";

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
  const [update, setUpdate] = useState(false);
  const [pageData, isLoading] = usePageData("Finance", update);
  const [openFinancePopup, setOpenFinancePopup] = useState(false);
  const [currentUserData, userIsLoading] = useCurrentUser();
  const [clickedItem, setClickedItem] = useState();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState();
  const [open, setOpen] = useState(false);
  const [clickedSettlementDate, setClickedSettlementDate] = useState();

  const activeGroups = useRecoilValue(activeGroupsState);

  if (isLoading || userIsLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "45vh" }}>
        <CircularProgress />
      </div>
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

  const handleUpdatePopup = (docID, title, groupID, color) => {
    setOpenUpdatePopup(true);
    setClickedItem({ docID, title, groupID, color });
  };
  const SettlementDivider = ({ groupName, settledDate, settledDateDocID }) => {
    return (
      <>
        <Divider />
        <div style={{ display: "flex" }}>
          <Typography variant="overline" color="primary">
            zul. {groupName} beglichen{" "}
            {new Date(settledDate).toLocaleDateString("de-DE", {
              weekday: "short",
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </Typography>
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <IconButton
              edge="end"
              aria-label="Delete"
              onClick={() => {
                setClickedSettlementDate([settledDateDocID, settledDate, groupName]);
                setOpen(true);
              }}
              size="small"
              color="primary"
            >
              <MdDelete />
            </IconButton>
          </div>
        </div>
        <Divider />
      </>
    );
  };

  const FinanceFeed = () => {
    let renderedDivider = [];
    let firstDivider = false;

    return financeData
      .sort(function (a, b) {
        let dateA = new Date(a.currentDate),
          dateB = new Date(b.currentDate);
        return dateB - dateA;
      })
      .map((financeDoc, i, arr) => {
        const groupName = currentUserData.groups[financeDoc.groupID].name;

        const settlementDoc = settlementData
          .filter((doc) => doc.groupID === financeDoc.groupID)
          .find((doc) => new Date(doc.settleDate) >= new Date(financeDoc.currentDate));

        if (settlementDoc) {
          const dividerID = `${settlementDoc.groupID}-${settlementDoc.settleDate}`;
          renderedDivider.push(dividerID);
          const arrWithSameDivider = renderedDivider.filter((id) => id === dividerID);
          firstDivider = arrWithSameDivider.length <= 1;
        }

        return (
          <div key={i}>
            {settlementDoc && firstDivider && (
              <SettlementDivider
                groupName={groupName}
                settledDate={settlementDoc.settleDate}
                settledDateDocID={`${settlementDoc.groupID}-${settlementDoc.settleDate}`}
              />
            )}
            <ExpenseItem
              expenseItem={financeDoc}
              multipleSelected={activeGroups.length > 1 ? true : false}
              groupName={groupName}
              settled={settlementDoc}
              handleUpdatePopup={handleUpdatePopup}
            />
            <Divider />
          </div>
        );
      });
  };

  const financeData = pageData[0];
  const settlementData = pageData[1];

  return (
    <>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <ConfirmPopup
        open={open}
        close={() => setOpen(false)}
        clickedItem={clickedSettlementDate && clickedSettlementDate[0]}
        update={() => {
          setUpdate(!update);
          console.log("update");
        }}
        collection="Settlement"
        mediaType={
          clickedSettlementDate &&
          "das letzte Begleichen der Gruppe " +
            clickedSettlementDate[2] +
            " am " +
            new Date(clickedSettlementDate[1]).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })
        }
        setSnackbarContent={setSnackbarContent}
      />
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
        {isLoading ? loadingSkeleton() : <FinanceFeed />}
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
