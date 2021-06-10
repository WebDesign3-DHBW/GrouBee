import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { updateItem } from "../../firebase/updateItem";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    width: "100%",
    height: "100%",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  dialogTitle: {
    textAlign: "center",
    minWidth: 311,
    "& h2": {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.h2.fontWeight,
    },
  },
  textField: {
    display: "flex",
    paddingBottom: theme.spacing(2),
  },
  formControl: {
    display: "flex",
    paddingBottom: theme.spacing(2),
  },
}));

function UpdatePopup({ open, close, clickedItem, update, collection, setSnackbarContent }) {
  const classes = useStyles();
  const [title, setTitle] = useState(clickedItem?.title ?? "");
  const [selectedGroup, setSelectedGroup] = useState({
    groupID: clickedItem?.groupID,
    color: clickedItem?.color,
  });
  const [userData, isUserData] = useCurrentUser();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDropDown = (e) => {
    const groupID = e.target.value.substring(0, e.target.value.indexOf("/"));
    const color = e.target.value.substring(e.target.value.indexOf("/") + 1);
    setSelectedGroup({ groupID, color });
  };

  const handleConfirm = () => {
    updateItem(
      clickedItem.docID,
      { title, groupID: selectedGroup.groupID, color: selectedGroup.color },
      collection
    );
    setSnackbarContent({
      message: `Du hast den Eintrag erfolgreich aktualisiert`,
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
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        Eintrag ändern
      </DialogTitle>
      <DialogContent dividers>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="update item"
            label="Titel"
            onChange={handleTitle}
            value={title}
            style={{ marginBottom: 10 }}
            className={classes.textField}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="selectGroup" shrink={true}>
              Gruppe
            </InputLabel>
            <NativeSelect
              native
              value={`${selectedGroup.groupID}/${selectedGroup.color}`}
              onChange={handleDropDown}
            >
              {!isUserData &&
                Object.entries(userData.groups).map((group, idx) => (
                  <option key={idx} value={`${group[0]}/${group[1].color}`}>
                    {group[1].name}
                  </option>
                ))}
            </NativeSelect>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button autoFocus onClick={handleCancel}>
          Abbrechen
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Aktualisieren
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdatePopup;
