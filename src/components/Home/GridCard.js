import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    justifyContent: "center",
  },
  gridItem1: {
    gridColumn: "span 6",
    height: theme.spacing(20),
  },
  gridItem2: {
    gridColumn: "span 3",
    height: theme.spacing(20),
  },
  gridItem3: {
    gridColumn: "span 2",
    height: theme.spacing(15),
  },
  cardItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    fontSize: "350%",
    flexGrow: "1",
  },
}));

function GridCard(props) {
  const classes = useStyles();
  return (
    <>
      <Card
        {...(props.width === 1 && {
          className: `${classes.gridItem} ${classes.gridItem1}`,
        })}
        {...(props.width === 2 && {
          className: `${classes.gridItem} ${classes.gridItem2}`,
        })}
        {...(props.width === 3 && {
          className: `${classes.gridItem} ${classes.gridItem3}`,
        })}
        elevation={5}
        onClick={async (event) => {
          navigate(props.link);
        }}
      >
        <div className={classes.cardItems}>
          {<props.icon className={classes.icon} />}
          <Typography variant="h2" component="h3">
            {props.name}
          </Typography>
        </div>
      </Card>
    </>
  );
}

export default GridCard;
