import Bubbles from "../Bubbles";
import usePageData from "../../hooks/usePageData";
import ButtonAppBar from "../AppBar";
import FAB from "../FAB";
import { useState } from "react";
import AddCard from "../ToDo/AddCard";

function Cleaning() {
  const [todos, isLoading] = usePageData("Putzen");
  const [openAddCard, setOpenAddCard] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ButtonAppBar title="Putzen" />
      <Bubbles />
      <h1>Putzen</h1>
      {todos.map((todo, idx) => (
        <li key={idx}>{todo.title}</li>
      ))}
      <FAB open={() => setOpenAddCard(true)} />
      <AddCard
        open={openAddCard}
        close={() => setOpenAddCard(false)}
        cardTitle="Haushaltsaufgabe"
      ></AddCard>
    </>
  );
}

export default Cleaning;
