import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogTitle, Typography, withStyles } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Snackbar from "../Snackbar";
import { Rating } from "@material-ui/lab";
import { updateMedia } from "../../firebase/updateMedia";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  dialogTitle: {
    textAlign: "center",
    "& h2": {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.h2.fontWeight,
    },
  },
  rating: {
    marginTop: theme.spacing(2),
  },
}));

export default function RatingPopup({ open, close, data, update }) {
  const classes = useStyles();
  const [snackbarContent, setSnackbarContent] = useState();
  const [rating, setRating] = useState(data.rating || 0);

  const handleSave = async () => {
    updateMedia(data.docId, { rating });
    update();
    close();
  };

  return (
    <>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Dialog open={open} onClose={close}>
        <DialogTitle id="filme-serien-bewerten" className={classes.dialogTitle}>
          Film / Serie bewerten
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          <Typography variant="h2">{data.title}</Typography>
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
