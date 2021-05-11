import Bubbles from "../Bubbles";
import FAB from "../FAB";
import ButtonAppBar from "../AppBar";
import Popup from "../Settings/Popup";
import { useState } from "react";
import { Button, Divider, makeStyles } from "@material-ui/core";
import ProfilePopup from "./ProfilePopup";
import GroupLink from "./GroupLink";
import Wrapper from "../base/Wrapper";
import { navigate } from "@reach/router";
const useStyles = makeStyles((theme) => ({
  button: {
    padding: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function Settings() {
  const [openGroupPopup, setOpenGroupPopup] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [tiggerUpdate, setTriggerUpdate] = useState(false);
  const [openGroupLink, setOpenGroupLink] = useState(false);
  const classes = useStyles();

  return (
    <>
      <ButtonAppBar title="Einstellungen" />
      <Bubbles updateMe={tiggerUpdate} />
      <Wrapper>
        <FAB open={() => setOpenGroupPopup(true)} />
        <Divider />
        <Button className={classes.button} onClick={() => setOpenEditProfile(true)}>
          Profil bearbeiten
        </Button>
        <Divider />
        <Button
          className={classes.button}
          onClick={() => {
            navigate("/impressum");
          }}
        >
          Impressum
        </Button>
        <Divider />
        <Button
          className={classes.button}
          onClick={() => {
            navigate("/datenschutz");
          }}
        >
          Datenschutz
        </Button>
        <Divider />
        <Popup
          open={openGroupPopup}
          close={() => setOpenGroupPopup(false)}
          updateBubbles={() => setTriggerUpdate(!tiggerUpdate)}
        />
        <ProfilePopup open={openEditProfile} close={() => setOpenEditProfile(false)} />

        <GroupLink open={openGroupLink} close={() => setOpenGroupLink(false)} />
      </Wrapper>
    </>
  );
}

export default Settings;
