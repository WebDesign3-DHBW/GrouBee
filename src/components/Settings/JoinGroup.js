import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core";
import { addGroupToUser } from "../../firebase/addGroupToUser";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  button: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default function JoinGroup() {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [groupObject, setGroupObject] = useState();

  async function addGroupToDB(groupObject) {
    let user = await getCurrentUserData();
    user.groups[groupObject[1]] = groupObject[0];
    addGroupToUser(user.groups);
  }

  function generateGroupObject(inputValue) {
    const groupID = inputValue.substring(inputValue.indexOf("/") + 1);
    const groupName = inputValue.substring(0, inputValue.indexOf("/"));
    return [groupName, groupID];
  }

  const handleJoin = () => {
    const groupObject = generateGroupObject(value);
    addGroupToDB(groupObject);
    setGroupObject(groupObject);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <DialogContentText>Gib deinen Gruppencode ein, um einer Gruppe beizutreten</DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Gruppencode"
        type="textfield"
        value={value}
        onChange={handleChange}
        fullWidth
      />
      {groupObject && (
        <Alert severity="success" color="success">
          Du bist der Gruppe erfolgreich beigetreten!
        </Alert>
      )}
      <DialogActions className={classes.button}>
        <Button onClick={handleJoin} color="primary">
          Beitreten
        </Button>
      </DialogActions>
    </div>
  );
}
