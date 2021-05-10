import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2.5),
  },
}));

function Wrapper(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.wrapper}>{props.children}</div>
    </>
  );
}

export default Wrapper;
