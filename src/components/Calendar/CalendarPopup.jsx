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
  withStyles,
} from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { addCalendar } from "../../firebase/addCalendar";
import Snackbar from "../Snackbar";
import { str2bool } from "../../utils";
import { addListEntry } from "../../firebase/addListEntry";

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

export default function MediaPopup({ open, close, triggerUpdate }) {
  const classes = useStyles();
  const [selectedGroup, setSelectedGroup] = useState({ groupID: "", color: "" });
  const [title, setTitle] = useState("");
  const [isAppointment, setIsAppointment] = useState(true);
  const [userData, isLoading] = useCurrentUser();
  const [snackbarContent, setSnackbarContent] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDropDown = (e) => {
    const groupID = e.target.value.substring(0, e.target.value.indexOf("/"));
    const color = e.target.value.substring(e.target.value.indexOf("/") + 1);
    setSelectedGroup({ groupID, color });
  };
  const handleTitel = (e) => {
    setTitel(e.target.value);
  };
  const handleAppointment = (e) => {
    setIsAppointment(str2bool(e.target.value));
  };

  const handleSelectDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSelectTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSave = async (e) => {
    const mediaType = isAppointment ? "Dein Termin" : "Dein ToDo";
    if (!title || !selectedGroup || !selectedTime || !selectedDate) {
      setSnackbarContent({
        message: "Bitte fülle alle Felder aus",
        status: "error",
        open: true,
      });
      return;
    }

    if (isAppointment) {
      await addCalendar({
        date: selectedDate,
        time: selectedTime,
        groupID: selectedGroup.groupID,
        color: selectedGroup.color,
        title: title,
      });
    } else {
      await addListEntry({
        title: title,
        date: selectedDate,
        groupID: selectedGroup.groupID,
        assignedTo: userData.userId,
        list: "todo",
      });
    }
    close();
    setSelectedGroup("");
    setTitle("");
    setSelectedDate("");
    setSelectedTime("");
    setSnackbarContent({
      message: `${mediaType} wurde erfolgreich hinzugefügt`,
      status: "success",
      open: true,
    });
  };

  return (
    <>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Dialog open={open} onClose={close}>
        <DialogTitle id="termine-todos-hinzufügen" className={classes.dialogTitle}>
          Termin/ToDos hinzufügen
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField id="title" label="Titel" onChange={handleTitel} value={title} />
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
            <TextField
              id="date"
              onChange={handleSelectDate}
              label="Tag"
              type="date"
              value={selectedDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="time"
              onChange={handleSelectTime}
              label="Zeit"
              type="time"
              value={selectedTime}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl>
              <InputLabel htmlFor="selectGroup">Eintragstyp</InputLabel>
              <Select native value={isAppointment} onChange={handleAppointment}>
                <option value={true}>Termin</option>
                <option value={false}>ToDos</option>
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
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
