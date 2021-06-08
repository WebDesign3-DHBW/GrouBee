import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, Typography } from "@material-ui/core";
import Snackbar from "../Snackbar";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    padding: 25,
    paddingTop: 20,
  },
  button: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  groupID: {
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: "center",
    display: "inline-block",
    width: "100%",
    margin: `${theme.spacing(2)}px 0`,
  },
  dialogTitle: {
    textAlign: "center",
    "& h2": {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.h2.fontWeight,
    },
  },
}));

function GroupLink({ groupID, open, close }) {
  const classes = useStyles();
  const [snackbarContent, setSnackbarContent] = useState();

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

  return (
    <span>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          Dein Gruppenlink
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kopiere deinen Gruppenlink, um weitere Freunde einzuladen.
          </DialogContentText>
          <Typography variant="h2" className={classes.groupID}>
            {groupID}
          </Typography>
        </DialogContent>
        <input value={groupID} ref={inputRef} readOnly hidden />
        <DialogActions className={classes.buttons}>
          <Button onClick={close} className={classes.button}>
            Schließen
          </Button>
          <Button onClick={copyToClipboard} color="primary" className={classes.button}>
            Kopieren
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
export default GroupLink;
