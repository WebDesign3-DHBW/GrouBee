import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { MdCheck, MdClose, MdDelete, MdPlayArrow, MdStar } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  line: {
    display: "flex",
  },
  icon: {
    fontSize: "1.5rem",
  },
  text: {
    width: "95%",
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function InfoPanel() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.line}>
        <MdCheck className={classes.icon} />
        <Typography className={classes.text}>
          Mit Klick auf dieses Icon kannst du Filme, die du bis zum Ende gesehen hast, in die
          "abgeschlossen" Kategorie verschieben.
        </Typography>
      </div>
      <div className={classes.line}>
        <MdClose className={classes.icon} />
        <Typography className={classes.text}>
          Hat dir ein Film nicht gefallen? <br />
          Mit Klick auf dieses Icon werden Filme in die "abgebrochen" Kategorie verschieben.
        </Typography>
      </div>
      <div className={classes.line}>
        <MdDelete className={classes.icon} />
        <Typography className={classes.text}>
          Filme, die du nicht mehr in den Listen haben möchtest, kannst du hiermit löschen.
        </Typography>
      </div>
      <div className={classes.line}>
        <MdPlayArrow className={classes.icon} />
        <Typography className={classes.text}>
          Du hast einen Film begonnen? <br />
          Klick auf dieses Icon, damit er zur Kategorie "begonnen" verschoben wird.
        </Typography>
      </div>
      <div className={classes.line}>
        <MdStar className={classes.icon} />
        <Typography className={classes.text}>Bewerte Filme, die du gesehen hast.</Typography>
      </div>
    </div>
  );
}

export default InfoPanel;
