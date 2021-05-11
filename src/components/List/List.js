import Bubbles from "../Bubbles";
import usePageData from "../../hooks/usePageData";
import ButtonAppBar from "../AppBar";
import FAB from "../FAB";
import { useState } from "react";
import AddCard from "./AddCard";
import { useLocation } from "@reach/router";

function List() {
  const [update, setUpdate] = useState(false);
  const [list, isLoading] = usePageData("ToDo", update);
  const [openAddCard, setOpenAddCard] = useState(false);
  const location = useLocation();

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
    return <p>Loading...</p>;
  }
  return (
    <>
      <ButtonAppBar title={listName} />
      <Bubbles />
      <h1>{listName}</h1>
      {list.map((list, idx) => (
        <li key={idx}>{list.title}</li>
      ))}
      <FAB open={() => setOpenAddCard(true)} />
      <AddCard
        open={openAddCard}
        close={() => setOpenAddCard(false)}
        cardTitle={cardTitle}
        list={listName.toLocaleLowerCase()}
        triggerUpdate={() => setUpdate(!update)}
      />
    </>
  );
}

export default List;