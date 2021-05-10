import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ButtonAppBar from "../AppBar";
import GridCard from "./GridCard";
import {
  MdEvent,
  MdAccountBalanceWallet,
  MdCheckCircle,
  MdShoppingCart,
  MdOpacity,
  MdMovie,
} from "react-icons/md";
import Skeleton from "@material-ui/lab/Skeleton";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2.5),
  },
  greeting: {
    margin: theme.spacing(4, 0),
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridColumnGap: theme.spacing(1.5),
    gridRowGap: theme.spacing(1.5),
  },
}));

function Home() {
  const classes = useStyles();
  const [userData, isLoading] = useCurrentUser();

  const time = new Date();
  let greeting = "Hallo";

  if (time.getHours() <= 11) {
    greeting = "Guten Morgen";
  } else if (time.getHours() <= 18) {
    greeting = "Hallo";
  } else {
    greeting = "Guten Abend";
  }

  return (
    <>
      <ButtonAppBar title="Home" />
      <div className={classes.wrapper}>
        <Typography variant="h1" className={classes.greeting}>
          {isLoading ? <Skeleton width={200} /> : greeting + " " + userData.userName}
        </Typography>
        <div className={classes.grid}>
          <GridCard width={2} link={"/calendar"} name={"Kalender"} icon={MdEvent} />
          <GridCard width={2} link={"/finance"} name={"Finanzen"} icon={MdAccountBalanceWallet} />
          <GridCard width={3} link={"/todo"} name={"ToDos"} icon={MdCheckCircle} />
          <GridCard width={3} link={"/shopping"} name={"Einkaufen"} icon={MdShoppingCart} />
          <GridCard width={3} link={"/clean"} name={"Putzen"} icon={MdOpacity} />
          <GridCard width={1} link={"/media"} name={"Filme/Serien"} icon={MdMovie} />
        </div>
      </div>
    </>
  );
}

export default Home;
