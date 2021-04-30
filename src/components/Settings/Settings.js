import Bubbles from "../Bubbles";
import FAB from "../FAB";
import ButtonAppBar from "../AppBar";
import Popup from "../Settings/Popup";
import { useState } from "react";
import { Button } from "@material-ui/core";
import ProfilePopup from "./ProfilePopup";

function Settings() {
  const [openGroupPopup, setOpenGroupPopup] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [tiggerUpdate, setTriggerUpdate] = useState(false);

  return (
    <>
      <ButtonAppBar title="Einstellungen" />
      <Bubbles updateMe={tiggerUpdate} />
      <FAB open={() => setOpenGroupPopup(true)} />
      <h1>Settings</h1>
      <Popup
        open={openGroupPopup}
        close={() => setOpenGroupPopup(false)}
        updateBubbles={() => setTriggerUpdate(!tiggerUpdate)}
      />
      <Button onClick={() => setOpenEditProfile(true)}>Profil bearbeiten</Button>
      <ProfilePopup open={openEditProfile} close={() => setOpenEditProfile(false)} />
    </>
  );
}

export default Settings;
