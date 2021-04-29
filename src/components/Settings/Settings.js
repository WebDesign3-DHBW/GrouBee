import React, { useState } from "react";
import Popup from "./Popup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogActions, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default function Settings() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Später durch Kreis mit + ersetzen
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Popup />
          <DialogActions className={classes.button}>
            <Button onClick={handleClose} color="lightgrey">
              Schließen
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
