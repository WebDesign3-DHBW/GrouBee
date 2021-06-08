import Bubbles from "../Bubbles";
import usePageData from "../../hooks/usePageData";
import ButtonAppBar from "../AppBar";
import FAB from "../FAB";
import { useState } from "react";
import ListPopup from "./ListPopup";
import { useLocation } from "@reach/router";
import Skeleton from "@material-ui/lab/Skeleton";
import Tasks from "./Tasks";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing(12),
  },
}));

function List() {
  const [update, setUpdate] = useState(false);
  const [tasks, isLoading] = usePageData("ToDo", update);
  const [openAddCard, setOpenAddCard] = useState(false);
  const location = useLocation();
  const classes = useStyles();

  let listName = "";
  let cardTitle = "";
  if (location.pathname === "/clean") {
    listName = "Putzen";
    cardTitle = "Haushaltsaufgabe";
  } else if (location.pathname === "/todo") {
    listName = "ToDo";
    cardTitle = "Aufgabe";
  } else if (location.pathname === "/shopping") {
    listName = "Einkaufen";
    cardTitle = "Artikel";
  }

  if (isLoading) {
    return <Skeleton variant="text" animation="wave" />;
  }
  return (
    <>
      <div className={classes.wrapper}>
        <ButtonAppBar title={listName} />
        <Bubbles />
        <Tasks
          tasks={tasks}
          update={() => setUpdate(!update)}
          category={listName.toLocaleLowerCase()}
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
    </>
  );
}

export default List;
