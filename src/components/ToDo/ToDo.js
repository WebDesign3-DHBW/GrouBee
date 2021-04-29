import { Link } from "@reach/router";
import ButtonAppBar from "../AppBar";
function ToDo() {
  return (
    <>
      <Link to="/">Home</Link>
      <ButtonAppBar title="ToDo" />
      <h1>ToDo</h1>
    </>
  );
}

export default ToDo;
