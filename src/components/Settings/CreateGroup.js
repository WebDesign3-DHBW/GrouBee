import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles, Typography } from "@material-ui/core";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { addGroupToUser } from "../../firebase/addGroupToUser";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
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
});

function CreateGroup() {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [generatedID, setGeneratedID] = useState();

  function generateGroupID() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  async function addGroupToDB(groupname) {
    const groupID = generateGroupID();
    let user = await getCurrentUserData();
    user.groups[groupID] = groupname;
    addGroupToUser(user.groups);
    setGeneratedID(groupname + "/" + groupID);
  }

  const inputRef = useRef();

  function copyToClipboard() {
    inputRef.current.style.display = "block";
    inputRef.current.select();
    document.execCommand("copy");
    inputRef.current.style.display = "none";
  }

  const handleCreate = () => {
    addGroupToDB(value);
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
        <Alert severity="success" color="success">
          Du hast erfolgreich eine Gruppe erstellt. Kopiere den Code, um Andere einzuladen!
        </Alert>
      )}
      {generatedID && <Typography variant="body1">{generatedID}</Typography>}
      <input value={generatedID} ref={inputRef} readOnly hidden />
      <DialogActions className={classes.buttons}>
        <Button onClick={handleClose} className={classes.button}>
          Abbrechen
        </Button>
        {generatedID ? (
          <Button color="primary" className={classes.button} onClick={copyToClipboard()}>
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
