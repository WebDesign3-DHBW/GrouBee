import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.common.black,
  },
}));

function DesktopNavbar() {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
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
