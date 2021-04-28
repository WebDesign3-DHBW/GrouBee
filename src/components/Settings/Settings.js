import { Link } from "@material-ui/core";
import JoinGroup from "./JoinGroup";

function Settings() {
  return (
    <>
      <Link to="/home">Home</Link>
      <h1>Settings</h1>
      <JoinGroup />
    </>
  );
}

export default Settings;
