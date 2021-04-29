import { Link } from "@reach/router";
import ButtonAppBar from "../AppBar";

function Settings() {
  return (
    <>
      <Link to="/">Home</Link>

      <ButtonAppBar title="Settings" />
      <h1>Settings</h1>
    </>
  );
}

export default Settings;
