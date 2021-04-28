import { navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import { signOut } from "../../auth/signOut";
import Bubbles from "../Bubbles";
import FAB from "../FAB";
import ButtonAppBar from "../AppBar";

function Settings() {
  const onClickSignOut = async () => {
    try {
      await signOut();
      navigate(`/signin`);
    } catch (e) {
      alert(e.message);
    }
  };
  const openModal = () => {};

  return (
    <>
      <ButtonAppBar title="Einstellungen" />
      <Bubbles />
      <FAB open={openModal} />
      <h1>Settings</h1>
      <CreateGroup />
      <FAB />
      <Button onClick={onClickSignOut}>Ausloggen</Button>
    </>
  );
}

export default Settings;
