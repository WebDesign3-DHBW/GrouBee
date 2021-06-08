import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles, Typography } from "@material-ui/core";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { addGroupToUser } from "../../firebase/addGroupToUser";
import { materialColor } from "../../theme/bubbleColors";

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
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: "center",
    display: "inline-block",
    width: "100%",
    margin: `${theme.spacing(2)}px 0`,
  },
}));

function CreateGroup({ close, updateBubbles, setSnackbarContent }) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [generatedID, setGeneratedID] = useState();

  function generateGroupID() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  async function addGroupToDB(groupname) {
    const groupID = generateGroupID();
    const groupColor = materialColor();
    let user = await getCurrentUserData();
    user.groups[groupID] = { name: groupname, color: "#" + groupColor };
    addGroupToUser(user.groups);
    setGeneratedID(groupname + "/" + groupID + groupColor);
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
    close();
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

      {generatedID && (
        <Typography variant="h2" className={classes.generatedID}>
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
