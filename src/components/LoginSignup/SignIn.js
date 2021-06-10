import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { signIn, resendLink, resetPassword } from "../../auth/signIn";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Slide,
  SnackbarContent,
  Box,
  InputAdornment,
  IconButton,
} from "@material-ui/core/";
import { Snackbar as MuiSnackbar } from "@material-ui/core/";
import Snackbar from "../Snackbar";
import { Container } from "./Container";
import { signOut } from "../../auth/signOut";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";

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
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showResendButton, setResendButton] = useState(false);
  const [showResetButton, setResetButton] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmCase, setConfirmCase] = useState("");
  const [snackbarContent, setSnackbarContent] = useState();

  useEffect(() => {
    if (location.state.signUpSuccessful) {
      setSnackbarContent({
        message:
          "Bitte bestätige deine E-Mail-Adresse. Dir wurde ein Bestätigungslink gesendet. Rufe diesen auf, um deinen Account zu verwenden.",
        status: "success",
        open: true,
      });
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
          signInSuccessful.error && console.log("Fehlercode: " + signInSuccessful.error);
      }
    } catch (e) {
      throw new Error("Signing in failed. Please try again later.");
    }
  };

  const onResendLinkButtonClicked = () => {
    setConfirmMessage("Dir wird ein neuer Bestätigungslink an deine E-Mail-Adresse gesendet.");
    setSnackbarContent({
      open: false,
    });
    setConfirmCase("onResendLinkClicked");
    setOpenConfirm(true);
  };

  const onResendLinkClicked = async () => {
    setOpenConfirm(false);
    const resendSuccessful = resendLink(emailValue, passwordValue);
    if (resendSuccessful) {
      setSnackbarContent({
        message:
          "Dir wurde ein Link an deine E-Mail-Adresse gesendet. Öffne diesen, um deinen Account zu verifizieren.",
        status: "success",
        open: true,
      });
    }
  };

  const onResetPasswordButtonClicked = () => {
    setConfirmMessage(
      "Dir wird ein Link für das Zurücksetzen des Passworts an deine unten angegebene E-Mail-Adresse gesendet."
    );
    setSnackbarContent({
      open: false,
    });
    setConfirmCase("onResetPasswordClicked");
    setOpenConfirm(true);
  };

  const onResetPasswordClicked = async () => {
    setOpenConfirm(false);
    const resetSuccessful = await resetPassword(emailValue);
    if (resetSuccessful) {
      setSnackbarContent({
        message:
          "Dir wurde ein Link an deine E-Mail-Adresse gesendet. Öffne diesen, um ein neues Passwort festzulegen.",
        status: "success",
        open: true,
      });
    }
  };

  const SnackbarConfirm = () => {
    return (
      <MuiSnackbar
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
                  onClick={() => {
                    setOpenConfirm(false);
                    setResendButton(false);
                    setResetButton(false);
                  }}
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
      </MuiSnackbar>
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

  return (
    <>
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
      {openConfirm && <SnackbarConfirm />}
      <Container>
        <div>
          {errorMessage && <div className={classes.errorMessage}> {errorMessage} </div>}
          <form noValidate autoComplete="off">
            <TextField
              inputProps={{
                autoComplete: "email",
              }}
              type="email"
              label="E-Mail"
              fullWidth
              className={classes.textField}
              onChange={(e) => setEmailValue(e.target.value)}
              disabled={openConfirm}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              label="Passwort"
              fullWidth
              className={classes.textField}
              onChange={(e) => setPasswordValue(e.target.value)}
              disabled={openConfirm}
              InputProps={{
                autoComplete: "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
