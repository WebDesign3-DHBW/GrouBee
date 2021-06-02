import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles,
} from "@material-ui/core";
import { deleteListItem } from "../../firebase/deleteListItem";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
}));

function ConfirmPopup({ open, close, clickedTask, update }) {
  const classes = useStyles();

  const handleConfirm = () => {
    deleteListItem(clickedTask);
    update();
    close();
  };
  const handleCancel = () => {
    close();
  };
  return (
    <Dialog open={open} onClose={close} aria-labelledby="responsive-dialog-title">
      <DialogContent>
        <DialogContentText>Willst du das Todo wirklich löschen?</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button autoFocus onClick={handleCancel}>
          Abbrechen
        </Button>
        <Button autoFocus onClick={handleConfirm} color="primary">
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmPopup;
