import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Gruppenlink kopieren
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dein Gruppenlink</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kopiere deinen Gruppenlink, um weitere Freunde einzuladen.
          </DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Gruppenlink" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Schließen</Button>
          <Button onClick={handleClose} color="primary">
            Kopieren
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
