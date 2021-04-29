import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
    padding: theme.spacing(2.5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
}));

export const Wrapper = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div>
        <Typography variant="h1" style={{ fontSize: "350%", fontWeight: "bold" }}>
          GrouBee
        </Typography>
        <hr />
        <Typography variant="h2" style={{ fontSize: "150%" }}>
          Zusammen einfacher planen
        </Typography>
      </div>
      {props.children}
    </div>
  );
};
