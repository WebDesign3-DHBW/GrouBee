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
  root: {
    flexGrow: 1,
  },

  menuButton1: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "white",
    "&:after": {
      margin: "0 1rem",
      border: "0.25px solid black",
      content: "''",
    },
  },
}));

function ButtonAppBar({ title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar elevation={0} className={classes.appbar} position="static">
            <Toolbar>
              <div className={classes.menuButton1}>
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
              </div>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                edge="start"
                className={classes.menuButton2}
                color="inherit"
                aria-label="menu"
              >
                <MdSettings />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  );
}

export default ButtonAppBar;
