import { Link } from "@reach/router";
import ButtonAppBar from "../AppBar";

function Calendar() {
  return (
    <>
      <Link to="/home">Home</Link>
      <ButtonAppBar title="Calendar" />

      <h1>Calendar</h1>
    </>
  );
}

export default Calendar;
