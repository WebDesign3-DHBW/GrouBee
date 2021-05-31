import { useState } from "react";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import Calendar from "react-calendar";
import "./calendarStyles.css";
import Wrapper from "../base/Wrapper";

function Timetable() {
  const [pageData, isLoading] = usePageData("Calendar");
  const [date, setDate] = useState(new Date());

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const calendarData = pageData[0];
  const todos = pageData[1];

  return (
    <>
      <ButtonAppBar title="Kalender" />
      <Bubbles />

      <Wrapper>
        <Calendar onChange={setDate} value={date} />
        {
          (date.setHours(date.getHours() + 2),
          console.log("CalendarData", date.toISOString().split("T")[0]))
        }

        <ul>
          {calendarData?.map((data, idx) => (
            <li key={idx}>
              Calendar Data: {data.title} {data.date}
            </li>
          ))}
        </ul>
        <h2>Todos</h2>
        <ul>
          {todos?.map((data, idx) => {
            return (
              <li key={idx}>
                Todos: {data.title}, done: {data.done}
              </li>
            );
          })}
        </ul>
      </Wrapper>
    </>
  );
}

export default Timetable;
