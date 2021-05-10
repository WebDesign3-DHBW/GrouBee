import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    maxWidth: 500,
    width: "100%",
    height: "100%",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  dialogTitle: {
    textAlign: "center",
  },
}));

export default function MediaPopup({ open, close }) {
  const classes = useStyles();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [title, setTitel] = useState("");
  const [userData, isLoading] = useCurrentUser();

  const handleDropDown = (e, newValue) => {
    setSelectedGroup(e.target.value);
  };
  const handleTitel = (e) => {
    setTitel(e.target.value);
  };

  const handleSave = (e) => {
    close();
    setSelectedGroup("");
    setTitel("");
  };

  console.log(title, selectedGroup);

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle id="filme-serien-hinzufügen" className={classes.dialogTitle}>
        <Typography variant="h1">Film / Serie Hinzufügen</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="movie title"
            label="Titel"
            onChange={handleTitel}
            value={title}
            style={{ marginBottom: 10 }}
          />
          <FormControl>
            <InputLabel htmlFor="selectGroup">Gruppe</InputLabel>
            <Select native value={selectedGroup} onChange={handleDropDown}>
              {!isLoading &&
                Object.entries(userData.groups).map((group, idx) => (
                  <option key={idx} value={group[0]}>
                    {group[1]}
                  </option>
                ))}
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
