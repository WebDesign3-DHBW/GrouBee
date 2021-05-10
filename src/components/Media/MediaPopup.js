import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { addMedia } from "../../firebase/addMedia";
import Snackbar from "../Snackbar";

const useStyles = makeStyles(() => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  dialogTitle: {
    textAlign: "center",
  },
  form: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function MediaPopup({ open, close, triggerUpdate }) {
  const classes = useStyles();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [title, setTitel] = useState("");
  const [isMovie, setIsMovie] = useState(true);
  const [userData, isLoading] = useCurrentUser();
  const [snackbarContent, setSnackbarContent] = useState();

  const handleDropDown = (e) => {
    setSelectedGroup(e.target.value);
  };
  const handleTitel = (e) => {
    setTitel(e.target.value);
  };
  const handleMedia = (e) => {
    setIsMovie(e.target.value);
  };

  const handleSave = async (e) => {
    const mediaType = isMovie ? "Dein Film" : "Deine Serie";
    if (!title || !selectedGroup) {
      setSnackbarContent({
        message: "Bitte fülle alle Felder aus",
        status: "error",
        open: true,
      });
      return;
    }
    await addMedia({
      title,
      groupID: selectedGroup,
      isMovie,
    });
    triggerUpdate();
    close();
    setSelectedGroup("");
    setTitel("");
    setSnackbarContent({
      message: `${mediaType} wurde erfolgreich hinzugefügt`,
      status: "success",
      open: true,
    });
  };

  console.log(title, selectedGroup, isMovie);

  return (
    <>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Dialog open={open} onClose={close}>
        <DialogTitle id="filme-serien-hinzufügen" className={classes.dialogTitle}>
          <Typography variant="h1">Film / Serie Hinzufügen</Typography>
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField id="movie title" label="Titel" onChange={handleTitel} value={title} />
            <FormControl>
              <InputLabel htmlFor="selectGroup">Gruppe</InputLabel>
              <Select native value={selectedGroup} onChange={handleDropDown}>
                <option aria-label="None" value="" />
                {!isLoading &&
                  Object.entries(userData.groups).map((group, idx) => (
                    <option key={idx} value={group[0]}>
                      {group[1]}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="selectGroup">Media Typ</InputLabel>
              <Select native value={isMovie} onChange={handleMedia}>
                <option value={true}>Film</option>
                <option value={false}>Serie</option>
              </Select>
            </FormControl>
          </form>
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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
