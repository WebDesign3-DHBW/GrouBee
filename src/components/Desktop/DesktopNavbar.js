import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from "@reach/router";
import Logo from "../../media/logo.svg";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.common.black,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function DesktopNavbar() {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <img src={Logo} style={{ height: "3rem", marginRight: ".75rem" }} alt="logo" />
        </Link>
        <Typography variant="h4" component="h2" noWrap>
          <Link to="/" className={classes.link}>
            GrouBee
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default DesktopNavbar;
