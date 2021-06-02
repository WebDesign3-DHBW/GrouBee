import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles,
} from "@material-ui/core";
import { deleteItem } from "../../firebase/deleteItem";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
}));

function ConfirmPopup({ open, close, clickedItem, update, collection }) {
  const classes = useStyles();

  const handleConfirm = () => {

    deleteItem(clickedItem, collection)

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
