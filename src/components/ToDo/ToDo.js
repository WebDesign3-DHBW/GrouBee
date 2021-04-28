import ButtonAppBar from "../AppBar";
import { Link } from "@reach/router";
import Bubbles from "../Bubbles";
import usePageData from "../../hooks/usePageData";

function ToDo() {
  const [todos, isLoading] = usePageData("ToDo");

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ButtonAppBar title="ToDo" />
      <Link to="/">Home</Link>
      <Bubbles />
      <h1>ToDo</h1>
      {todos.map((todo, idx) => (
        <li key={idx}>{todo.title}</li>
      ))}
    </>
  );
}

export default ToDo;
