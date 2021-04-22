import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    backgroundColor: "#eee",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

function ModuleTile({ name, children }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        {children}
        <Typography variant="h3">{name}</Typography>
      </CardContent>
    </Card>
  );
}

export default ModuleTile;
