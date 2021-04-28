import { Link } from "@reach/router";
import ButtonAppBar from "../AppBar";

function Finance() {
  return (
    <>
      <Link to="/home">Home</Link>
      <ButtonAppBar title="Finanzen" />

      <h1>Finance</h1>
    </>
  );
}

export default Finance;
