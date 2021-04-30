import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles, Snackbar, Slide } from "@material-ui/core";
import { addGroupToUser } from "../../firebase/addGroupToUser";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& label.Mui-focused": {
      color: theme.palette.grey[900],
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
}));

export default function JoinGroup({ close }) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState();

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
    if (value.includes("/")) {
      const groupObject = generateGroupObject(value);
      addGroupToDB(groupObject);
      setSnackbarContent({
        message: "Du bist der Gruppe erfolgreich beigetreten!",
        status: "success",
      });
    } else {
      setSnackbarContent({
        message: "Dein Gruppencode ist nicht valide",
        status: "error",
      });
    }
    setOpen(true);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <DialogContentText>Gib deinen Gruppencode ein, um einer Gruppe beizutreten</DialogContentText>
      <TextField
        autoFocus
        className={classes.textField}
        margin="dense"
        id="name"
        label="Gruppencode"
        type="textfield"
        value={value}
        onChange={handleChange}
        fullWidth
      />

      {open && (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Slide}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            className={classes.snackbar}
            severity={snackbarContent.status}
            onClose={() => setOpen(false)}
          >
            {snackbarContent.message}
          </MuiAlert>
        </Snackbar>
      )}

      <DialogActions className={classes.buttons}>
        <Button onClick={close} className={classes.button}>
          Schließen
        </Button>

        <Button onClick={handleJoin} className={classes.button} color="primary">
          Beitreten
        </Button>
      </DialogActions>
    </div>
  );
}
