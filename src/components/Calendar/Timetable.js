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
  ListItemSecondaryAction,
  IconButton,
  Button,
} from "@material-ui/core";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { removeAppointment } from "../../firebase/removeAppointment";
import { addAppointment } from "../../firebase/addAppointment";

const useStyles = makeStyles((theme) => ({
  dot: {
    height: 5,
    width: 5,
    borderRadius: "50%",
    margin: "0 auto",
    marginTop: 3,
  },
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
  info: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
  },
  infoIcon: {
    fontSize: "1.5rem",
    margin: theme.spacing(0, 1),
  },
  center: {
    textAlign: "center",
    margin: theme.spacing(1, 0),
  },
}));

function Timetable() {
  const classes = useStyles();

  const [update, setUpdate] = useState(false);
  const [pageData, isLoading] = usePageData("Calendar", update);
  const [calendarDate, setCalendarDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  function toUTC(d) {
    let ISOToDate = new Date(d);
    return new Date(ISOToDate.getTime() - ISOToDate.getTimezoneOffset() * 60 * 1000);
  }

  const setFormattedDate = (date) => {
    const utcDate = toUTC(date);
    return setCalendarDate(new Date(utcDate));
  };

  const handleDelete = (id) => {
    removeAppointment(id);
    setUpdate(!update);
  };

  const handleAdd = () => {
    addAppointment();
    setUpdate(!update);
  };

  const calendarData = pageData[0];
  const todos = pageData[1];

  return (
    <>
      <ButtonAppBar title="Kalender" />
      <Bubbles />
      <Button onClick={() => handleAdd()}>Add Appointment </Button>
      <Wrapper>
        <Calendar
          onChange={setFormattedDate}
          value={calendarDate}
          tileContent={(date) => {
            const formattedDate = toUTC(date.date).toISOString().split("T")[0];
            if (
              calendarData.some((appointment) => appointment.date === formattedDate) ||
              todos.some((todo) => todo.date === formattedDate)
            ) {
              return <div className={classes.dot} style={{ backgroundColor: "salmon" }} />;
            } else {
              return <div className={classes.dot} style={{ visibility: "hidden" }} />;
            }
          }}
          defaultValue={toUTC(new Date())}
          prev2Label={null}
          next2Label={null}
        />
        <Typography variant="h1" component="h2" className={classes.weekDay}>
          {getWeekDay(calendarDate)}
        </Typography>
        <div className={classes.container}>
          <Box className={classes.dayNumber}>{getCurrentDay(calendarDate)}</Box>
          <Divider orientation="vertical" flexItem className={classes.vertDivider} />
          <div>
            <Typography variant="h2">Termine</Typography>
            <List component="nav" className={classes.list} dense>
              {calendarData
                .filter((entry) => {
                  return entry.date === calendarDate.toISOString().split("T")[0];
                })
                .sort((a, b) => a.time - b.time)
                .map((data, idx, arr) => (
                  <div key={idx}>
                    <ListItem className={classes.listItem}>
                      <ListItemText>
                        <span className={classes.time}>{data.time}</span> : {data.title}
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(data.docId)}
                          size="small"
                        >
                          <MdDelete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {data !== arr[arr.length - 1] && <Divider variant="middle" component="li" />}
                  </div>
                ))}
              {calendarData.filter(
                (entry) => entry.date === calendarDate.toISOString().split("T")[0]
              ).length === 0 && (
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={`${classes.info} ${classes.center}`}
                >
                  <AiOutlineInfoCircle className={classes.infoIcon} />
                  Du hast noch keinen Termin
                </Typography>
              )}
            </List>
            <Typography variant="h2">Aufgaben</Typography>
            <ul>
              {todos
                .filter((entry) => entry.date === calendarDate.toISOString().split("T")[0])
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
