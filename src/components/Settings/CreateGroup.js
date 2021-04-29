import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles, Typography } from "@material-ui/core";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { addGroupToUser } from "../../firebase/addGroupToUser";

const useStyles = makeStyles({
  button: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0px 0px 0px",
  },
});

function CreateGroup() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    addGroupToDB(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <DialogContentText>Gib deiner neuen Gruppe einen Namen</DialogContentText>
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

      {generatedID && <Typography>{generatedID}</Typography>}
      <DialogActions className={classes.button}>
        <Button onClick={handleClose}>Abbrechen</Button>
        {generatedID ? (
          <Button color="primary"> Kopieren </Button>
        ) : (
          <Button onClick={handleCreate} color="primary">
            {" "}
            Einladungscode generieren{" "}
          </Button>
        )}
      </DialogActions>
    </>
  );
}

export default CreateGroup;
