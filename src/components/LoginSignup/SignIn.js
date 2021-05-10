import React from "react";
import { useState } from "react";
import { navigate } from "@reach/router";
import { signIn } from "../../auth/signIn";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { Container } from "./Container";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
    "& label.Mui-focused": {
      color: theme.palette.grey[900],
    },
  },
  button: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[900],
  },
  link: {
    textDecoration: "none",
    color: theme.palette.grey[900],
  },
  errorMessage: {
    marginBottom: theme.spacing(2),
    color: theme.palette.error.main,
  },
}));

function SignIn() {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        default:
          setErrorMessage(
            "Leider ist ein Fehler aufgetreten. Bitte überprüfe deine Eingabe oder probiere es später noch einmal."
          );
      }
    } catch (e) {
      throw new Error("Signing in failed. Please try again later.");
    }
  };

  return (
    <>
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth={true}
              className={classes.button}
              onClick={onSignInClicked}
            >
              Einloggen
            </Button>
          </form>
          <Button
            variant="outlined"
            color="primary"
            fullWidth={true}
            className={classes.button}
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
