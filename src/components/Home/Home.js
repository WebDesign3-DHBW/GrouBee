import { Link } from "@reach/router";
import ButtonAppBar from "../AppBar";

function Home() {
  return (
    <>
      <Link to="/todo">Todo</Link> <Link to="/calendar">calendar</Link>{" "}
      <Link to="/finance">finance</Link> <Link to="/media">media</Link>{" "}
      <Link to="/settings">settings</Link>
      <ButtonAppBar title="Home" />
      <h1>Home</h1>
    </>
  );
}

export default Home;
