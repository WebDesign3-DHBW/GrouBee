import { Button, Card, CardContent, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
}));

function BalanceCard(props) {
  const classes = useStyles();

  return (
    <>
      <Card variant="outlined" className={classes.root}>
        <CardContent align="center">
          <Typography variant="h1" component="h2">
            {props.value} €
          </Typography>
          {props.group && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                {props.group}
              </Typography>
              <Button variant="contained" color="primary">
                abrechnen
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default BalanceCard;
