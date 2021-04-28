import ButtonAppBar from "../AppBar";
import { Link } from "@reach/router";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";

function Calendar() {
  const [calendarData, isLoading] = usePageData("Calendar");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const calendar = calendarData[0];
  const todos = calendarData[1];

  console.log("calendar", calendar);
  console.log("todos", todos);

  console.log("calendarData", calendarData);
  return (
    <>
      <ButtonAppBar title="Calendar" />
      <Bubbles />

      <h1>Calendar</h1>
      {/* <ul>
        {calendar.map((data) => (
          <>
            <li>Calendar Data: {data.title}</li>
          </>
        ))}
        {todos.map((data) => {
          console.log("TDO", data);
          return (
            <>
              <li>Todos: {data.title}</li>
            </>
          );
        })}
      </ul> */}
    </>
  );
}

export default Calendar;
