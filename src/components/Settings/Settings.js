import Bubbles from "../Bubbles";
import FAB from "../FAB";
import ButtonAppBar from "../AppBar";
import GroupPopup from "./GroupPopup";
import { useState } from "react";
import { Divider, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import ProfilePopup from "./ProfilePopup";
import GroupLink from "./GroupLink";
import Wrapper from "../base/Wrapper";
import { navigate } from "@reach/router";
const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1, 0),
  },
  info: {
    display: "flex",
    alignItems: "center",
    position: "fixed",
    color: theme.palette.text.main,
    bottom: 70,
    right: theme.spacing(12),
    zIndex: 2,
    textAlign: "right",
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
      <FAB open={() => setOpenGroupPopup(true)} />
      <GroupPopup
        open={openGroupPopup}
        close={() => setOpenGroupPopup(false)}
        updateBubbles={() => setTriggerUpdate(!tiggerUpdate)}
      />
      <Wrapper>
        <List component="nav" aria-label="settings options">
          <Divider />
          <ListItem button className={classes.button} onClick={() => setOpenEditProfile(true)}>
            <ListItemText primary="Profil bearbeiten" />
          </ListItem>
          <Divider />
          <ListItem
            button
            className={classes.button}
            onClick={() => {
              navigate("/impressum");
            }}
          >
            <ListItemText primary="Impressum" />
          </ListItem>
          <Divider />
          <ListItem
            button
            className={classes.button}
            onClick={() => {
              navigate("/datenschutz");
            }}
          >
            <ListItemText primary="Datenschutz" />
          </ListItem>
          <Divider />
        </List>
        <Typography className={classes.info}>
          Gruppe erstellen <br />& beitreten
        </Typography>
        <FAB open={() => setOpenGroupPopup(true)} />
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
