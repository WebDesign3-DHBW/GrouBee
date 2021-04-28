import { Link } from "@reach/router";
import ButtonAppBar from "../AppBar";

function Settings() {
  return (
    <>
      <Link to="/home">Home</Link>

      <ButtonAppBar title="Settings" />
      <h1>Settings</h1>
    </>
  );
}

export default Settings;
