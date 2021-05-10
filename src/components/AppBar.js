import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { MdHome } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { navigate, useLocation } from "@reach/router";
import { signOut } from "../auth/signOut";
import { BiLogOut } from "react-icons/bi";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
  },
}));

function ButtonAppBar({ title }) {
  const classes = useStyles();

  const location = useLocation();

  const onClickSignOut = async () => {
    try {
      await signOut();
      navigate(`/signin`);
    } catch (e) {
      alert(e.message);
    }
  };

  const isHome = location.pathname === "/";
  return (
    <>
      <div className={classes.root}>
        <AppBar elevation={0} className={classes.appbar} position="static" color="transparent">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h4" component="h2" style={!isHome ? { display: "none" } : null}>
              {new Date().toLocaleDateString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <IconButton
              edge="start"
              style={isHome ? { visibility: "hidden" } : null}
              color="inherit"
              aria-label="Home"
              onClick={() => {
                navigate("/");
              }}
            >
              <MdHome />
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              className={classes.title}
              style={isHome ? { visibility: "hidden" } : null}
            >
              {title}
            </Typography>
            {location.pathname === "/settings" ? (
              <IconButton edge="end" color="inherit" aria-label="Logout" onClick={onClickSignOut}>
                <BiLogOut />
              </IconButton>
            ) : (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="Settings"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                <MdSettings />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Divider />
      </div>
    </>
  );
}

export default ButtonAppBar;
