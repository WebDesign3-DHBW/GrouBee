import Bubbles from "../Bubbles";
import usePageData from "../../hooks/usePageData";
import ButtonAppBar from "../AppBar";
import FAB from "../FAB";
import { useState } from "react";
import AddCard from "./AddCard";

function ToDo() {
  const [todos, isLoading] = usePageData("ToDo");
  const [openAddCard, setOpenAddCard] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ButtonAppBar title="ToDo" />
      <Bubbles />
      <h1>ToDo</h1>
      {todos.map((todo, idx) => (
        <li key={idx}>{todo.title}</li>
      ))}
      <FAB open={() => setOpenAddCard(true)} />
      <AddCard
        open={openAddCard}
        close={() => setOpenAddCard(false)}
        cardTitle="ToDo"
        list="todo"
      />
    </>
  );
}

export default ToDo;
