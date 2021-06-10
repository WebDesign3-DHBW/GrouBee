import React from "react";
import { useState } from "react";
import { navigate } from "@reach/router";
import { signUp } from "../../auth/signUp";
import { validate as isEmail } from "isemail";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, InputAdornment, IconButton } from "@material-ui/core/";
import { Container } from "./Container";
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
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  errorMessage: {
    marginBottom: theme.spacing(2),
    color: theme.palette.error.main,
  },
}));

function SignUp({ location }) {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSignUpClicked = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const signUpSuccessful = await signUp(usernameValue, emailValue, passwordValue);
      signUpSuccessful && navigate(`/signin`, { state: { signUpSuccessful } });
    } catch (e) {
      switch (e.message) {
        case "auth/email-already-in-use":
          setErrorMessage("Die angegebene E-Mail Adresse wird bereits verwendet.");
          break;
        case "auth/weak-password":
          setErrorMessage("Dein Passwort muss mindestens 6 Zeichen haben.");
          break;
        default:
          setErrorMessage(
            "Leider ist ein Fehler aufgetreten. Bitte überprüfe deine Eingabe oder probiere es später noch einmal."
          );
      }
    }
  };

  const validateForm = () => {
    if (!usernameValue) return "Bitte gib einen Nutzernamen ein.";
    if (!emailValue) return "Bitte gib E-Mail Adresse ein.";
    if (!isEmail(emailValue)) return "Bitte gib eine gültige E-Mail Adresse an.";
    if (passwordValue !== confirmPassword) return "Die Passwörter stimmen nicht überein.";
    return null;
  };

  return (
    <Container>
      <div>
        {errorMessage && <div className={classes.errorMessage}> {errorMessage} </div>}
        <form noValidate autoComplete="off">
          <TextField
            inputProps={{
              autoComplete: "given-name",
            }}
            type="text"
            label="Nutzername"
            fullWidth
            className={classes.textField}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
          <TextField
            inputProps={{
              autoComplete: "email",
            }}
            type="email"
            label="E-Mail"
            fullWidth
            className={classes.textField}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Passwort"
            fullWidth
            className={classes.textField}
            onChange={(e) => setPasswordValue(e.target.value)}
            InputProps={{
              autoComplete: "new-password",
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
          <TextField
            type={showPassword ? "text" : "password"}
            label="Passwort wiederholen"
            fullWidth
            className={classes.textField}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              autoComplete: "new-password",
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth={true}
            className={classes.btnContained}
            onClick={onSignUpClicked}
          >
            Registrieren
          </Button>
        </form>
        <Button
          variant="outlined"
          color="primary"
          fullWidth={true}
          className={classes.btnOutlined}
          onClick={async (event) => {
            navigate("/signin");
          }}
        >
          Einloggen
        </Button>
      </div>
    </Container>
  );
}

export default SignUp;
