import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogTitle, Typography, withStyles } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Snackbar from "../Snackbar";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  dialogTitle: {
    textAlign: "center",
  },
  rating: {
    marginTop: theme.spacing(2),
  },
}));

export default function RatingPopup({ open, close, title }) {
  const classes = useStyles();
  const [snackbarContent, setSnackbarContent] = useState();
  const [rating, setRating] = useState(0);

  const handleSave = async () => {
    close();
  };

  return (
    <>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Dialog open={open} onClose={close}>
        <DialogTitle id="filme-serien-bewerten" className={classes.dialogTitle}>
          <Typography variant="h1">Film / Serie bewerten</Typography>
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          <Typography variant="h2">{title}</Typography>
          <Rating
            value={rating}
            className={classes.rating}
            onChange={(event, newRating) => {
              setRating(newRating);
            }}
          />
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button autoFocus onClick={close}>
            Abbrechen
          </Button>
          <Button autoFocus onClick={handleSave} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
