import Bubbles from "../Bubbles";
import usePageData from "../../hooks/usePageData";
import ButtonAppBar from "../AppBar";

function ToDo() {
  const [todos, isLoading] = usePageData("ToDo");

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
    </>
  );
}

export default ToDo;
