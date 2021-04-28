import { Link } from "@reach/router";

function Home() {
  return (
    <>
      <Link to="/todo">Todo</Link> <Link to="/calendar">calendar</Link>{" "}
      <Link to="/finance">finance</Link> <Link to="/media">media</Link>{" "}
      <Link to="/settings">settings</Link>
      <h1>Home</h1>
    </>
  );
}

export default Home;
