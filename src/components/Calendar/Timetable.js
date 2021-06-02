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
} from "@material-ui/core";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { removeAppointment } from "../../firebase/removeAppointment";
import { Task } from "../List/Tasks";
import FAB from "../FAB";
import CalendarPopup from "../Calendar/CalendarPopup";

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
  const [calendarDate, setCalendarDate] = useState(new Date(new Date()));
  const [openCalendarPopup, setOpenCalendarPopup] = useState(false);

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

  const calendarData = pageData[0];
  const todos = pageData[1];

  return (
    <>
      <ButtonAppBar title="Kalender" />
      <Bubbles />
      <FAB open={() => setOpenCalendarPopup(true)} />
      <CalendarPopup open={openCalendarPopup} close={() => setOpenCalendarPopup(false)} />
      <Wrapper>
        <Calendar
          onChange={setFormattedDate}
          value={calendarDate}
          tileContent={(date) => {
            const formattedDate = toUTC(date.date).toISOString().split("T")[0];
            const calendarColor = calendarData.find(
              (appointment) => appointment.date === formattedDate
            )?.color;
            const todoColor = todos.find((todo) => todo.date === formattedDate)?.color;
            if (calendarColor) {
              return <div className={classes.dot} style={{ backgroundColor: calendarColor }} />;
            } else if (todoColor) {
              return <div className={classes.dot} style={{ backgroundColor: todoColor }} />;
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
          <Box className={classes.dayNumber}>
            {getCurrentDay(calendarDate) < 10
              ? "0" + getCurrentDay(calendarDate)
              : getCurrentDay(calendarDate)}
          </Box>
          <Divider orientation="vertical" flexItem className={classes.vertDivider} />
          <div>
            <Typography variant="h2">Termine</Typography>
            <List component="nav" dense>
              {calendarData
                .filter((entry) => {
                  return entry.date === calendarDate.toISOString().split("T")[0];
                })
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((data, idx, arr) => (
                  <div key={idx}>
                    <ListItem>
                      <ListItemText>
                        <span className={classes.time}>{data.time} Uhr</span> {data.title}
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
                  variant="subtitle2"
                  color="textSecondary"
                  className={`${classes.info} ${classes.center}`}
                >
                  <AiOutlineInfoCircle className={classes.infoIcon} />
                  Keinen Termin an diesem Tag
                </Typography>
              )}
            </List>
            <Typography variant="h2">Aufgaben</Typography>
            <List component="nav" dense>
              {todos
                .filter((entry) => entry.date === calendarDate.toISOString().split("T")[0])
                .map((task, idx) => {
                  return (
                    <span key={idx}>
                      <Task task={task} update={() => setUpdate(!update)} hideProfilePic hideDate />
                    </span>
                  );
                })}
            </List>
            {todos.filter((entry) => entry.date === calendarDate.toISOString().split("T")[0])
              .length === 0 && (
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={`${classes.info} ${classes.center}`}
              >
                <AiOutlineInfoCircle className={classes.infoIcon} />
                Keine Aufgaben an diesem Tag
              </Typography>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Timetable;
