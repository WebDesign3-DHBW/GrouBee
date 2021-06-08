import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { signIn, resendLink, resetPassword } from "../../auth/signIn";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Snackbar, Slide, SnackbarContent, Box } from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";
import { Container } from "./Container";
import { signOut } from "../../auth/signOut";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
    "& label.Mui-focused": {
      color: theme.palette.text.primary,
    },
  },
  btnContained: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[900],
  },
  btnOutlined: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  btnAlert: {
    marginTop: theme.spacing(2),
    color: theme.palette.error.main,
  },
  link: {
    textDecoration: "none",
  },
  errorMessage: {
    marginBottom: theme.spacing(2),
    color: theme.palette.error.main,
  },
  resetLinkSpacing: {
    paddingTop: theme.spacing(2),
  },
}));

function SignIn({ location }) {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResendButton, setResendButton] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [showResetButton, setResetButton] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmCase, setConfirmCase] = useState("");

  useEffect(() => {
    if (location.state.signUpSuccessful) {
      setSuccessMessage(
        "Bitte bestätige deine E-Mail-Adresse. Dir wurde ein Bestätigungslink gesendet. Rufe diesen auf, um deinen Account zu verwenden."
      );
      setOpenSuccess(true);
    }
  }, [location.state]);

  const onSignInClicked = async (e) => {
    e.preventDefault();
    showResendButton && setResendButton(false);
    showResetButton && setResetButton(false);
    try {
      const signInSuccessful = await signIn(emailValue, passwordValue);
      signInSuccessful.successful && navigate(`/`);
      switch (signInSuccessful.error) {
        case "auth/invalid-email":
          setErrorMessage("Die angegebene E-Mail Adresse ist falsch formatiert.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Das angegebene Passwort ist falsch.");
          setResetButton(true);
          break;
        case "auth/user-not-found":
          setErrorMessage(
            "Der Account existiert leider nicht. Bitte überprüfe deine Eingabe oder registriere dich."
          );
          break;
        case "email/notverified":
          try {
            await signOut();
            navigate("/signin");
          } catch {}
          setErrorMessage(
            "Deine E-Mail-Adresse ist noch nicht verifiziert. Bitte klicke auf den zugesandten Link, um deinen Account nutzen zu können."
          );
          setResendButton(true);
          break;
        default:
          setErrorMessage(
            "Leider ist ein Fehler aufgetreten. Bitte überprüfe deine Eingabe oder probiere es später noch einmal."
          );
      }
    } catch (e) {
      throw new Error("Signing in failed. Please try again later.");
    }
  };

  const onResendLinkButtonClicked = () => {
    setConfirmMessage("Dir wird ein neuer Bestätigungslink an deine E-Mail-Adresse gesendet.");
    setOpenSuccess(false);
    setConfirmCase("onResendLinkClicked");
    setOpenConfirm(true);
  };

  const onResendLinkClicked = async () => {
    setOpenConfirm(false);
    const resendSuccessful = resendLink(emailValue, passwordValue);
    if (resendSuccessful) {
      setSuccessMessage(
        "Dir wurde ein Link an deine E-Mail-Adresse gesendet. Öffne diesen, um deinen Account zu verifizieren."
      );
      setOpenSuccess(true);
    }
  };

  const onResetPasswordButtonClicked = () => {
    setConfirmMessage(
      "Dir wird ein Link für das Zurücksetzen des Passworts an deine unten angegebene E-Mail-Adresse gesendet."
    );
    setOpenSuccess(false);
    setConfirmCase("onResetPasswordClicked");
    setOpenConfirm(true);
  };

  const onResetPasswordClicked = async () => {
    setOpenConfirm(false);
    const resetSuccessful = await resetPassword(emailValue);
    if (resetSuccessful) {
      setSuccessMessage(
        "Dir wurde ein Link an deine E-Mail-Adresse gesendet. Öffne diesen, um ein neues Passwort festzulegen."
      );
      setOpenSuccess(true);
    }
  };

  const SnackbarConfirm = () => {
    return (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <SnackbarContent
          message={confirmMessage}
          action={
            <>
              <Box m={0.5}>
                <Button
                  color="inherit"
                  size="small"
                  disableRipple
                  onClick={() => setOpenConfirm(false)}
                >
                  Abbrechen
                </Button>
              </Box>
              <Box m={0.5}>
                <Button
                  color="secondary"
                  size="small"
                  disableRipple
                  onClick={() => doConfirmCase()}
                >
                  Bestätigen
                </Button>
              </Box>
            </>
          }
        />
      </Snackbar>
    );
  };

  function doConfirmCase() {
    switch (confirmCase) {
      case "onResendLinkClicked":
        onResendLinkClicked();
        break;
      case "onResetPasswordClicked":
        onResetPasswordClicked();
        break;
      default:
        break;
    }
  }

  const SnackbarSuccess = () => {
    return (
      <Snackbar
        open={openSuccess}
        autoHideDuration={12000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => setOpenSuccess(false)}
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    );
  };

  return (
    <>
      {openSuccess && <SnackbarSuccess />}
      {openConfirm && <SnackbarConfirm />}
      <Container>
        <div>
          {errorMessage && <div className={classes.errorMessage}> {errorMessage} </div>}
          <form noValidate autoComplete="off">
            <TextField
              type="email"
              label="E-Mail"
              fullWidth
              className={classes.textField}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <TextField
              type="password"
              label="Passwort"
              fullWidth
              className={classes.textField}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            {showResendButton && (
              <>
                <Button
                  variant="outlined"
                  fullWidth={true}
                  className={classes.btnAlert}
                  onClick={onResendLinkButtonClicked}
                >
                  LINK ERNEUT SENDEN
                </Button>
              </>
            )}
            {showResetButton && (
              <>
                <div className={classes.resetLinkSpacing}>
                  <Button size="small" onClick={onResetPasswordButtonClicked} color="primary">
                    Passwort vergessen?
                  </Button>
                </div>
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth={true}
              className={classes.btnContained}
              onClick={onSignInClicked}
            >
              Einloggen
            </Button>
          </form>
          <Button
            variant="outlined"
            color="primary"
            fullWidth={true}
            className={classes.btnOutlined}
            onClick={async (event) => {
              navigate("/signup");
            }}
          >
            Registrieren
          </Button>
        </div>
      </Container>
    </>
  );
}

export default SignIn;
