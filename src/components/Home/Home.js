import { makeStyles } from "@material-ui/core";
import { IoMdCalendar } from "react-icons/io";
import ModuleTile from "../ModuleTile";

const useStyles = makeStyles({
  icon: {
    fontSize: "5rem",
  },
});

function Home() {
  const classes = useStyles();
  return (
    <>
      <ModuleTile name="Kalender">
        <IoMdCalendar className={classes.icon} />
      </ModuleTile>
      <ModuleTile name="Finanzen">
        <IoMdCalendar className={classes.icon} />
      </ModuleTile>
    </>
  );
}

export default Home;
