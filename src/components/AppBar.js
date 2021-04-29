import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { MdHome } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { navigate, useLocation } from "@reach/router";

const useStyles = makeStyles((theme) => ({

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
  date: {
    fontWeight: "700",
    fontSize: 30,
  },
}));

function ButtonAppBar({ title }) {
  const classes = useStyles();

  const location = useLocation();
  console.log("location", location);

  const isHome = location.pathname === "/";
  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h1"
            className={classes.date}
            style={!isHome ? { display: "none" } : null}
          >
            {new Date().toLocaleDateString("de-DE", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton1}
            style={isHome ? { visibility: "hidden" } : null}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate("/");
            }}
          >
            <MdHome />
          </IconButton>
          <Typography
            variant="h1"
            className={classes.title}
            style={isHome ? { visibility: "hidden" } : null}
          >
            {title}
          </Typography>
          <IconButton
            edge="end"
            className={classes.menuButton2}
            style={location.pathname === "/settings" ? { visibility: "hidden" } : null}
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
