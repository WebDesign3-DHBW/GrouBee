import Bubbles from "../Bubbles";
import FAB from "../FAB";
import ButtonAppBar from "../AppBar";
import Popup from "../Settings/Popup";
import { useState } from "react";
import { Button } from "@material-ui/core";
import ProfilePopup from "./ProfilePopup";

function Settings() {
  const [open, setOpen] = useState(false);
  const [tiggerUpdate, setTriggerUpdate] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
      <Button onClick={handleClickOpen}>Profil bearbeiten</Button>
      <ProfilePopup open={open} close={() => setOpen(false)} />
    </>
  );
}

export default Settings;
