import Bubbles from "../Bubbles";
import usePageData from "../../hooks/usePageData";
import ButtonAppBar from "../AppBar";
import FAB from "../FAB";
import { useState } from "react";
import ListPopup from "./ListPopup";
import { useLocation } from "@reach/router";
import Tasks from "./Tasks";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Snackbar from "../Snackbar";
import ConfirmPopup from "./ConfirmPopup";
import UpdatePopup from "../base/UpdatePopup";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing(12),
  },
}));

function List() {
  const [update, setUpdate] = useState(false);
  const [tasks, isLoading] = usePageData("ToDo", update);
  const [openAddCard, setOpenAddCard] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState();
  const location = useLocation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [clickedItem, setClickedItem] = useState();

  let listName = "";
  let cardTitle = "";
  let listType = "";
  if (location.pathname === "/clean") {
    listName = "Putzen";
    cardTitle = "Haushaltsaufgabe";
    listType = "die Haushaltsaufgabe";
  } else if (location.pathname === "/todo") {
    listName = "ToDo";
    cardTitle = "Aufgabe";
    listType = "die Aufgabe";
  } else if (location.pathname === "/shopping") {
    listName = "Einkaufen";
    cardTitle = "Artikel";
    listType = "den Artikel";
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "45vh" }}>
        <CircularProgress />
      </div>
    );
  }

  const handleConfirmPopup = (task) => {
    setOpen(true);
    setClickedTask(task);
  };

  const handleUpdatePopup = (docID, title, groupID, color) => {
    setOpenUpdatePopup(true);
    setClickedItem({ docID, title, groupID, color });
  };

  return (
    <div className={classes.wrapper}>
      <ButtonAppBar title={listName} />
      <Bubbles />
      <ConfirmPopup
        open={open}
        close={() => setOpen(false)}
        clickedItem={clickedTask}
        update={() => setUpdate(!update)}
        collection="ToDo"
        mediaType={listType}
        setSnackbarContent={setSnackbarContent}
      />
      {openUpdatePopup && (
        <UpdatePopup
          open={openUpdatePopup}
          close={() => setOpenUpdatePopup(false)}
          clickedItem={clickedItem}
          update={() => setUpdate(!update)}
          collection={"ToDo"}
          setSnackbarContent={setSnackbarContent}
        />
      )}
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Tasks
        tasks={tasks}
        update={() => setUpdate(!update)}
        category={listName.toLocaleLowerCase()}
        handleConfirmPopup={handleConfirmPopup}
        handleUpdatePopup={handleUpdatePopup}
      />
      <FAB open={() => setOpenAddCard(true)} />
      <ListPopup
        open={openAddCard}
        close={() => setOpenAddCard(false)}
        cardTitle={cardTitle}
        list={listName.toLocaleLowerCase()}
        triggerUpdate={() => setUpdate(!update)}
      />
    </div>
  );
}

export default List;
