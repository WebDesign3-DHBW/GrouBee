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

  const setFormattedDate = (date) => {
    const realDate = date.setHours(date.getHours() + 2);
    return setDate(new Date(realDate).toISOString().split("T")[0]);
  };

  const calendarData = pageData[0];
  const todos = pageData[1];

  return (
    <>
      <ButtonAppBar title="Kalender" />
      <Bubbles />

      <Wrapper>
        <Calendar onChange={setFormattedDate} value={new Date(date)} />

        <ul>
          {calendarData
            ?.filter((entry) => entry.date === date)
            .map((data, idx) => (
              <li key={idx}>
                Calendar Data: {data.title} {data.date}
              </li>
            ))}
        </ul>
        <h2>Todos</h2>
        <ul>
          {todos
            ?.filter((entry) => entry.date === date)
            .map((data, idx) => {
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
