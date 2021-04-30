import { navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import { signOut } from "../../auth/signOut";
import Bubbles from "../Bubbles";
import FAB from "../FAB";
import ButtonAppBar from "../AppBar";
import Popup from "../Settings/Popup";
import { useState } from "react";

function Settings() {
  const [open, setOpen] = useState(false);
  const [tiggerUpdate, setTriggerUpdate] = useState(false);

  const onClickSignOut = async () => {
    try {
      await signOut();
      navigate(`/signin`);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <ButtonAppBar title="Einstellungen" />
      <Bubbles updateMe={tiggerUpdate} />
      <FAB open={() => setOpen(true)} />
      <h1>Settings</h1>
      <Popup
        open={open}
        close={() => setOpen(false)}
        updateBubbles={() => setTriggerUpdate(!tiggerUpdate)}
      />
      <Button onClick={onClickSignOut}>Ausloggen</Button>
    </>
  );
}

export default Settings;
