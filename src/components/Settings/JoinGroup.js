import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core";

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

export default function JoinGroup() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
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
        value=""
        fullWidth
      />
      <DialogActions className={classes.buttons}>
        <Button onClick={handleClose} color="lightgrey" className={classes.button}>
          Abbrechen
        </Button>

        <Button onClick={handleClose} color="primary" className={classes.button}>
          Beitreten
        </Button>
      </DialogActions>
    </div>
  );
}
