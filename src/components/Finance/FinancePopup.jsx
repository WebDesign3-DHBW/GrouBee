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
import { addFinance } from "../../firebase/addFinance";
import { getAllUserData } from "../../firebase/getAllUserData";
import Snackbar from "../Snackbar";

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

export default function FinancePopup({ open, close }) {
  const classes = useStyles();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [allUserInGroup, setAllUserInGroup] = useState();
  const [title, setTitel] = useState("");
  const [expense, setExpense] = useState("");
  const [userData, isUserData] = useCurrentUser();
  const [snackbarContent, setSnackbarContent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleDropDown = (e) => {
    setSelectedGroup(e.target.value);
  };
  const handleTitel = (e) => {
    setTitel(e.target.value);
  };
  const handleExpense = (e) => {
    setExpense(e.target.value);
  };
  const handleSelectDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSelectUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSave = async (e) => {
    if (!title || !selectedGroup || !expense || !selectedDate) {
      setSnackbarContent({
        message: "Bitte fülle alle Felder aus",
        status: "error",
        open: true,
      });
      return;
    }
    await addFinance({
      title,
      expense,
      selectedDate,
      groupID: selectedGroup,
      selectedUser,
    });
    close();
    setSelectedGroup("");
    setTitel("");
    setSnackbarContent({
      message: `Der Eintrag wurde erfolgreich hinzugefügt`,
      status: "success",
      open: true,
    });
  };

  useEffect(() => {
    const getUserInGroup = async () => {
      console.log("infinite loop warning");
      setIsLoading(true);
      const allUserData = await getAllUserData();
      const groupUserNames = allUserData
        .filter((user) => Object.keys(user.groups).some((id) => id === selectedGroup))
        .map((user) => ({
          name: user.userName,
          id: user.userId,
        }));
      setAllUserInGroup(groupUserNames);
      setIsLoading(false);
    };
    getUserInGroup();
  }, [selectedGroup]);

  return (
    <>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      <Dialog open={open} onClose={close}>
        <DialogTitle id="filme-serien-hinzufügen" className={classes.dialogTitle}>
          Ausgaben hinzufügen
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField id="expense title" label="Ausgabe" onChange={handleTitel} value={title} />
            <TextField
              id="expense"
              label="Betrag in €"
              type="number"
              onChange={handleExpense}
              value={expense}
            />
            <FormControl>
              <InputLabel htmlFor="selectGroup">Gruppe</InputLabel>
              <Select native value={selectedGroup} onChange={handleDropDown}>
                <option aria-label="None" value="" />
                {!isUserData &&
                  Object.entries(userData.groups).map((group, idx) => (
                    <option key={idx} value={group[0]}>
                      {group[1]}
                    </option>
                  ))}
              </Select>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="zuständiger">Bezahlt von</InputLabel>
                <Select native value={selectedUser} onChange={handleSelectUser}>
                  <option aria-label="None" value="" />
                  {!isLoading &&
                    allUserInGroup.map((user, idx) => (
                      <option key={idx} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <TextField
                id="date"
                onChange={handleSelectDate}
                type="date"
                value={selectedDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
