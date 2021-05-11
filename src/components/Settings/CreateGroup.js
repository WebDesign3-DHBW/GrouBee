import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles, Typography } from "@material-ui/core";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { addGroupToUser } from "../../firebase/addGroupToUser";
import Snackbar from "../Snackbar";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& label.Mui-focused": {
      color: theme.palette.text.primary,
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    paddingTop: 20,
  },
  button: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  generatedID: {
    fontWeight: 500,
    textAlign: "center",
    display: "inline-block",
    width: "100%",
    margin: `${theme.spacing(5)}px 0`,
  },
}));

function CreateGroup({ close, updateBubbles }) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [generatedID, setGeneratedID] = useState();
  const [snackbarContent, setSnackbarContent] = useState();

  function generateGroupID() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  async function addGroupToDB(groupname) {
    const groupID = generateGroupID();
    let user = await getCurrentUserData();
    user.groups[groupID] = groupname;
    addGroupToUser(user.groups);
    setGeneratedID(groupname + "/" + groupID);
    updateBubbles();
    setSnackbarContent({
      message: "Du hast erfolgreich eine Gruppe erstellt. Kopiere den Code, um Andere einzuladen!",
      status: "success",
      open: true,
    });
  }

  const inputRef = useRef();

  function copyToClipboard() {
    inputRef.current.style.display = "block";
    inputRef.current.select();
    document.execCommand("copy");
    inputRef.current.style.display = "none";
    setSnackbarContent({
      message: "Gruppencode kopiert!",
      status: "success",
      open: true,
    });
  }

  const handleCreate = () => {
    if (value) {
      addGroupToDB(value);
    } else {
      setSnackbarContent({
        message: "Deine Gruppe braucht einen Namen.",
        status: "error",
        open: true,
      });
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      {!generatedID && <DialogContentText>Gib deiner neuen Gruppe einen Namen</DialogContentText>}
      {!generatedID && (
        <TextField
          autoFocus
          className={classes.textField}
          margin="dense"
          id="name"
          label="Name"
          type="textfield"
          fullWidth
          value={value}
          onChange={handleChange}
        />
      )}

      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />

      {generatedID && (
        <Typography variant="h1" className={classes.generatedID}>
          {generatedID}
        </Typography>
      )}
      <input value={generatedID} ref={inputRef} readOnly hidden />
      <DialogActions className={classes.buttons}>
        <Button onClick={close} className={classes.button}>
          Schließen
        </Button>
        {generatedID ? (
          <Button color="primary" onClick={copyToClipboard} className={classes.button}>
            Kopieren
          </Button>
        ) : (
          <Button onClick={handleCreate} color="primary" className={classes.button}>
            Code generieren
          </Button>
        )}
      </DialogActions>
    </>
  );
}

export default CreateGroup;
