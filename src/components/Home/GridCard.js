import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
    fontSize: "300%",
    flexGrow: "1",
  },
}));

function GridCard(props) {
  const classes = useStyles();

  function randomDelay() {
    return 0 + "." + Math.floor(Math.random() * 3);
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ delay: randomDelay() }}
      whileTap={{ scale: 0.9 }}
      {...(props.width === 1 && {
        className: `${classes.gridItem} ${classes.gridItem1}`,
      })}
      {...(props.width === 2 && {
        className: `${classes.gridItem} ${classes.gridItem2}`,
      })}
      {...(props.width === 3 && {
        className: `${classes.gridItem} ${classes.gridItem3}`,
      })}
    >
      <Card
        elevation={3}
        onClick={async (event) => {
          navigate(props.link);
        }}
        className={classes.gridItem}
      >
        <CardActionArea>
          <div className={classes.cardItems}>
            {<props.icon className={classes.icon} />}
            <Typography variant="h5" component="h2">
              {props.name}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}

export default GridCard;
