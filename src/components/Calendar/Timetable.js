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
  CircularProgress,
  CardActionArea,
} from "@material-ui/core";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Task } from "../List/Tasks";
import FAB from "../FAB";
import CalendarPopup from "../Calendar/CalendarPopup";
import ConfirmPopup from "../List/ConfirmPopup";
import Snackbar from "../Snackbar";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing(12),
  },
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
  list: { display: "flex", flexDirection: "column", flexGrow: 1 },
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
  const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
  const [clickedItem, setClickedItem] = useState();
  const [clickedItemType, setClickedItemType] = useState();
  const [snackbarContent, setSnackbarContent] = useState();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "45vh" }}>
        <CircularProgress />
      </div>
    );
  }

  function toUTC(d) {
    let ISOToDate = new Date(d);
    return new Date(ISOToDate.getTime() - ISOToDate.getTimezoneOffset() * 60 * 1000);
  }

  const setFormattedDate = (date) => {
    const utcDate = toUTC(date);
    return setCalendarDate(new Date(utcDate));
  };

  const handleConfirmPopup = (docId, docType) => {
    setOpenConfirmPopup(true);
    setClickedItem(docId);
    setClickedItemType(docType);
  };

  const calendarData = pageData[0];
  const todos = pageData[1];

  return (
    <div className={classes.wrapper}>
      <ButtonAppBar title="Kalender" />
      <Bubbles />
      <FAB open={() => setOpenCalendarPopup(true)} />
      <CalendarPopup
        open={openCalendarPopup}
        close={() => setOpenCalendarPopup(false)}
        update={() => setUpdate(!update)}
      />
      <ConfirmPopup
        open={openConfirmPopup}
        close={() => setOpenConfirmPopup(false)}
        clickedItem={clickedItem}
        update={() => setUpdate(!update)}
        collection={clickedItemType}
        mediaType={clickedItemType === "ToDo" ? "die Aufgabe" : "den Termin"}
        setSnackbarContent={setSnackbarContent}
      />
      <Snackbar snackbarContent={snackbarContent} setSnackbarContent={setSnackbarContent} />
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
          <div className={classes.list}>
            <Typography variant="h2">Termine</Typography>
            <List component="nav" dense>
              {calendarData
                .filter((entry) => {
                  return entry.date === calendarDate.toISOString().split("T")[0];
                })
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((data, idx, arr) => (
                  <div key={idx}>
                    <ListItem disableGutters={true}>
                      <CardActionArea style={{ paddingLeft: "5px" }}>
                        <ListItemText>
                          <span className={classes.time}>{data.time} Uhr</span> {data.title}
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleConfirmPopup(data.docId, "Calendar")}
                            size="small"
                          >
                            <MdDelete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </CardActionArea>
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
                  Keine Aufgaben an diesem Tag
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
                      <Task
                        task={task}
                        update={() => setUpdate(!update)}
                        handleConfirmPopup={handleConfirmPopup}
                        hideProfilePic
                        hideDate
                      />
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
    </div>
  );
}

export default Timetable;
