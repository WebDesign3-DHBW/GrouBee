import ButtonAppBar from "../AppBar";
import { Link, navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import { signOut } from "../../auth/signOut";

function Settings() {
  const onClickSignOut = async () => {
    try {
      await signOut();
      navigate(`/login`);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <ButtonAppBar title="Einstellungen" />
      <h1>Settings</h1>
      <Button onClick={onClickSignOut}>Ausloggen</Button>
    </>
  );
}

export default Settings;
