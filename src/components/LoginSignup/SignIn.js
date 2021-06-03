import React from "react";
import { useState } from "react";
import { navigate } from "@reach/router";
import { resendLink, signIn } from "../../auth/signIn";
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
}));

function SignIn({ location }) {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [showResendButton, setResendButton] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const onSignInClicked = async (e) => {
    e.preventDefault();
    try {
      const signInSuccessful = await signIn(emailValue, passwordValue);
      signInSuccessful.successful && navigate(`/`);
      switch (signInSuccessful.error) {
        case "auth/invalid-email":
          setErrorMessage("Die angegebene E-Mail Adresse ist falsch formatiert.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Das angegebene Passwort ist falsch.");
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

  const onResendLinkClicked = async () => {
    resendLink(emailValue, passwordValue);
    setOpenReset(false);
    setOpenSuccess(true);
  };

  const action = (
    <>
      <Box m={0.5}>
        <Button color="inherit" size="small" disableRipple onClick={() => setOpenReset(false)}>
          Abbrechen
        </Button>
      </Box>
      <Box m={0.5}>
        <Button color="secondary" size="small" disableRipple onClick={onResendLinkClicked}>
          Bestätigen
        </Button>
      </Box>
    </>
  );

  return (
    <>
      {location?.state?.signUpSuccessful && (
        <Snackbar
          open={open}
          autoHideDuration={7000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Slide}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={() => setOpen(false)}
          >
            E-Mail-Adresse bestätigen. Dir wurde ein Bestätigungslink gesendet. Rufe diesen auf, um
            dein Account zu verwenden.
          </MuiAlert>
        </Snackbar>
      )}
      {openSuccess && (
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
            Dir wurde ein Link an deine E-Mail-Adresse gesendet. Öffne diesen, um deinen Account zu
            verifizieren.
          </MuiAlert>
        </Snackbar>
      )}
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
                  onClick={() => setOpenReset(true)}
                >
                  LINK ERNEUT SENDEN
                </Button>
                <Snackbar
                  open={openReset}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  TransitionComponent={Slide}
                >
                  <SnackbarContent
                    message={
                      "Dir wird ein neuer Bestätigungslink an deine E-Mail-Adresse gesendet."
                    }
                    action={action}
                  />
                </Snackbar>
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
