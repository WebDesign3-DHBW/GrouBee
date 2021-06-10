import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { addMedia } from "../../firebase/addMedia";
import Snackbar from "../Snackbar";
import { str2bool } from "../../utils";

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
  form: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function MediaPopup({ open, close, triggerUpdate, mediaType, expandAccordion }) {
  const classes = useStyles();
  const [selectedGroup, setSelectedGroup] = useState({ groupID: "", color: "" });
  const [title, setTitle] = useState("");
  const [isMovie, setIsMovie] = useState(mediaType);
  const [userData, isLoading] = useCurrentUser();
  const [snackbarContent, setSnackbarContent] = useState();

  const handleDropDown = (e) => {
    const groupID = e.target.value.substring(0, e.target.value.indexOf("/"));
    const color = e.target.value.substring(e.target.value.indexOf("/") + 1);
    setSelectedGroup({ groupID, color });
  };
  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleMedia = (e) => {
    setIsMovie(str2bool(e.target.value));
  };

  useEffect(() => {
    if (mediaType === 0) {
      setIsMovie(true);
    } else {
      setIsMovie(false);
    }
  }, [mediaType]);

  const handleSave = async (e) => {
    const mediaType = isMovie ? "Dein Film" : "Deine Serie";
    if (!title || !selectedGroup.groupID) {
      e.preventDefault();
      setSnackbarContent({
        message: "Bitte fülle alle Felder aus",
        status: "error",
        open: true,
      });
      return;
    }
    await addMedia({
      title,
      groupID: selectedGroup.groupID,
      color: selectedGroup.color,
      isMovie,
    });
    triggerUpdate();
    close();
    setTitle("");
    setSnackbarContent({
      message: `${mediaType} wurde erfolgreich hinzugefügt`,
      status: "success",
      open: true,
    });
    expandAccordion(1);
  };

  return (
    <>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Dialog open={open} onClose={close}>
        <DialogTitle id="filme-serien-hinzufügen" className={classes.dialogTitle}>
          Film / Serie hinzufügen
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField id="movie title" label="Titel" onChange={handleTitle} value={title} />
            <FormControl>
              <InputLabel htmlFor="selectGroup">Gruppe</InputLabel>
              <Select
                native
                value={`${selectedGroup.groupID}/${selectedGroup.color}`}
                onChange={handleDropDown}
              >
                <option aria-label="None" value="" />
                {!isLoading &&
                  Object.entries(userData.groups).map((group, idx) => (
                    <option key={idx} value={`${group[0]}/${group[1].color}`}>
                      {group[1].name}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="selectGroup">Medien Typ</InputLabel>
              <Select native value={isMovie} onChange={handleMedia}>
                <option value={true}>Film</option>
                <option value={false}>Serie</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button onClick={close}>Abbrechen</Button>
          <Button autofocus onSubmit={handleSave} color="primary">
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
