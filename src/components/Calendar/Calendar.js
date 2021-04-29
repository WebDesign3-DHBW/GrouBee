import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";

function Calendar() {
  const [pageData, isLoading] = usePageData("Calendar");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const calendar = pageData[0];
  const todos = pageData[1];

  return (
    <>
      <ButtonAppBar title="Calendar" />
      <Bubbles />

      <h1>Calendar</h1>
      <ul>
        {calendar?.map((data, idx) => (
          <li key={idx}>Calendar Data: {data.title},</li>
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
    </>
  );
}

export default Calendar;
