import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "../base/Wrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
}));

export const Container = (props) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <div className={classes.root}>
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
    </Wrapper>
  );
};
