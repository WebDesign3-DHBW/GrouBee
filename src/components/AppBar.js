import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { MdHome } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import Grid from "@material-ui/core/Grid";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {},

  menuButton1: {},

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  menuButton2: {},

  title: {},
  appbar: {
    backgroundColor: "white",
    "&:after": {
      margin: "0 1.2rem",
      border: "0.5px solid black",
      content: "''",
    },
  },
}));

function ButtonAppBar({ title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton1}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate("/");
            }}
          >
            <MdHome />
          </IconButton>
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            edge="end"
            className={classes.menuButton2}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <MdSettings />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
