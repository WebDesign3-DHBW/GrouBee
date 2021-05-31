import { useState } from "react";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import Calendar from "react-calendar";
import "./calendarStyles.css";
import Wrapper from "../base/Wrapper";
import { getWeekDay, getCurrentDay } from "../../utils";
import {
  Divider,
  makeStyles,
  Typography,
  Box,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import { AiOutlineInfoCircle } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "coloumn",
  },
  vertDivider: {
    backgroundColor: theme.palette.primary.main,
    width: "2px",
    margin: theme.spacing(0, 1),
  },
  weekDay: {
    fontWeight: "100",
    margin: theme.spacing(2, 0),
  },
  dayNumber: {
    fontWeight: "bold",
    fontSize: theme.typography.h1.fontSize,
  },
  time: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

function Timetable() {
  const classes = useStyles();

  const [pageData, isLoading] = usePageData("Calendar");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

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
        <Calendar
          onChange={setFormattedDate}
          value={new Date(date)}
          defaultValue={new Date()}
          prev2Label={null}
          next2Label={null}
        />
        <Typography variant="h1" component="h2" className={classes.weekDay}>
          {getWeekDay(date)}
        </Typography>
        <div className={classes.container}>
          <Box className={classes.dayNumber}>{getCurrentDay(date)}</Box>
          <Divider orientation="vertical" flexItem className={classes.vertDivider} />
          <div>
            <Typography variant="h2">Termine</Typography>
            <List component="nav" className={classes.list} dense>
              {calendarData
                .filter((entry) => entry.date === date)
                .sort((a, b) => a.time - b.time)
                .map((data, idx, arr) => (
                  <>
                    <div key={idx}>
                      <ListItem className={classes.listItem}>
                        <ListItemText>
                          <span className={classes.time}>{data.time}</span> : {data.title}
                        </ListItemText>
                      </ListItem>
                      {data !== arr[arr.length - 1] && <Divider variant="middle" component="li" />}
                    </div>
                    {arr.length === 0 && (
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className={`${classes.info} ${classes.center}`}
                      >
                        <AiOutlineInfoCircle className={classes.infoIcon} />
                        Du hast noch keinen Termin
                      </Typography>
                    )}
                  </>
                ))}
            </List>
            <Typography variant="h2">Aufgaben</Typography>
            <ul>
              {todos
                .filter((entry) => entry.date === date)
                .map((data, idx) => {
                  return (
                    <li key={idx}>
                      Todos: {data.title}, done: {data.done}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Timetable;
