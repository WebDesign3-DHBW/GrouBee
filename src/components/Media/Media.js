import { Link } from "@reach/router";
import ButtonAppBar from "../AppBar";

function Media() {
  return (
    <>
      <Link to="/">Home</Link>
      <ButtonAppBar title="Media" />

      <h1>Media</h1>
    </>
  );
}

export default Media;
