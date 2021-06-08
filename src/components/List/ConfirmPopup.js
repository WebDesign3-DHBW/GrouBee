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

function ConfirmPopup({
  open,
  close,
  clickedItem,
  update,
  collection,
  mediaType,
  setSnackbarContent,
}) {
  const classes = useStyles();

  const handleConfirm = () => {
    deleteItem(clickedItem, collection);
    setSnackbarContent({
      message: `Du hast ${mediaType} gelöscht`,
      status: "success",
      open: true,
    });
    update();
    close();
  };
  const handleCancel = () => {
    close();
  };
  return (
    <Dialog open={open} onClose={close} aria-labelledby="responsive-dialog-title">
      <DialogContent>
        <DialogContentText>Willst du {mediaType} wirklich löschen?</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button autoFocus onClick={handleCancel}>
          Abbrechen
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmPopup;
