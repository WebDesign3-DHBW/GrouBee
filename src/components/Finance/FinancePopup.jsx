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
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  dialogTitle: {
    textAlign: "center",
    minWidth: 311,
    "& h2": {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.h2.fontWeight,
    },
  },
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textField: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
}));

export default function FinancePopup({ open, close, update }) {
  const classes = useStyles();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [allUserInGroup, setAllUserInGroup] = useState();
  const [title, setTitle] = useState("");
  const [expense, setExpense] = useState("0.00");
  const [userData, isUserData] = useCurrentUser();
  const [snackbarContent, setSnackbarContent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleDropDown = (e) => {
    const groupID = e.target.value.substring(0, e.target.value.indexOf("/"));
    const color = e.target.value.substring(e.target.value.indexOf("/") + 1);
    setSelectedGroup({ groupID, color });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleExpense = (e) => {
    setExpense(parseFloat(e.target.value.replace(".", "").replace(",", ".")));
  };
  const handleSelectUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSave = async (e) => {
    if (!title || !selectedGroup || !expense) {
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
      groupID: selectedGroup.groupID,
      color: selectedGroup.color,
      paidBy: selectedUser,
    });
    close();
    setSelectedGroup("");
    setTitle("");
    setExpense("");
    setSnackbarContent({
      message: `Der Eintrag wurde erfolgreich hinzugefügt`,
      status: "success",
      open: true,
    });
    update();
  };

  useEffect(() => {
    const getUserInGroup = async () => {
      setIsLoading(true);
      const allUserData = await getAllUserData();
      const groupUserNames = allUserData
        .filter((user) => Object.keys(user.groups).some((id) => id === selectedGroup.groupID))
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
        <DialogTitle id="ausgaben-hinzufügen" className={classes.dialogTitle}>
          Ausgaben hinzufügen
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              id="expense title"
              label="Ausgabe"
              onChange={handleTitle}
              value={title}
              className={classes.textField}
            />
            <CurrencyTextField
              id="expense"
              label="Betrag"
              onChange={handleExpense}
              value={expense}
              decimalCharacter=","
              digitGroupSeparator="."
              currencySymbol="€"
              minimumValue={0}
              className={classes.textField}
            />
            <FormControl>
              <InputLabel htmlFor="selectGroup">Gruppe</InputLabel>
              <Select
                native
                value={`${selectedGroup.groupID}/${selectedGroup.color}`}
                onChange={handleDropDown}
                className={classes.textField}
              >
                <option aria-label="None" value="" />
                {!isUserData &&
                  Object.entries(userData.groups).map((group, idx) => (
                    <option key={idx} value={`${group[0]}/${group[1].color}`}>
                      {group[1].name}
                    </option>
                  ))}
              </Select>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="zuständig">Bezahlt von</InputLabel>
                <Select
                  native
                  value={selectedUser}
                  onChange={handleSelectUser}
                  className={classes.textField}
                >
                  <option aria-label="None" value="" />
                  {!isLoading &&
                    allUserInGroup.map((user, idx) => (
                      <option key={idx} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button onClick={close}>Abbrechen</Button>
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
