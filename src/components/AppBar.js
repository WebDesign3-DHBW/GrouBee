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
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2.2),
    overflow: "hidden",
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
  const isSettings = location.pathname === "/settings";
  return (
    <>
      <div className={classes.root}>
        <AppBar elevation={0} className={classes.appbar} position="static" color="transparent">
          <Toolbar className={classes.toolbar}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1], x: 0 }}
              transition={{ duration: 0.2 }}
              style={!isHome ? { display: "none" } : null}
            >
              <Typography variant="h4" component="h2" style={!isHome ? { display: "none" } : null}>
                {new Date().toLocaleDateString("de-DE", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: [0, 1], x: 0 }}
              transition={{ duration: 0.2 }}
            >
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
            </motion.div>
            <Typography
              variant="h4"
              component="h1"
              className={classes.title}
              style={isHome ? { visibility: "hidden" } : null}
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: [0, 1], x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {title}
              </motion.div>
            </Typography>
            {location.pathname === "/settings" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: [0, 1], x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IconButton edge="end" color="inherit" aria-label="Logout" onClick={onClickSignOut}>
                  <BiLogOut />
                </IconButton>
              </motion.div>
            )}
            {location.pathname !== "/" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: [0, 1], x: 0 }}
                transition={{ duration: 0.2 }}
                style={isSettings ? { display: "none" } : null}
              >
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
              </motion.div>
            )}
            {location.pathname === "/" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.2 }}
                style={isSettings ? { display: "none" } : null}
              >
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
              </motion.div>
            )}
          </Toolbar>
        </AppBar>
        <Divider />
      </div>
    </>
  );
}

export default ButtonAppBar;
