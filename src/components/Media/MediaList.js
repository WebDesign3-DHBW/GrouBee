import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { MdCheck, MdClose, MdDelete, MdExpandMore } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  accoridonDetails: {
    display: "inherit",
  },
  p0: {
    paddingLeft: theme.spacing(0),
  },
}));

const title = [
  "Forrest Gump",
  "Harry Potter",
  "Titanic",
  "Der Herr der Ringe: Die Rückkehr des Königs",
];

const ellipsis = title.length > 20 ? "…" : "";

function MediaList() {
  const classes = useStyles();
  return (
    <div>
      <Accordion expanded="true">
        <AccordionSummary expandIcon={<MdExpandMore />} id="panel1-header">
          <Typography className={classes.heading}>Begonnene Filme</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accoridonDetails}>
          <List component="nav">
            {title.map((val, idx) => {
              return (
                <ListItem className={classes.p0} key={idx}>
                  <ListItemText primary={val.substring(0, 20).concat(ellipsis)} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="complete">
                      <MdCheck />
                    </IconButton>
                    <IconButton edge="end" aria-label="cancel">
                      <MdClose />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <MdDelete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />} id="panel2-header">
          <Typography className={classes.heading}>Neue Filme</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accoridonDetails}>
          <List component="nav">
            {title.map((val, idx) => {
              return (
                <ListItem className={classes.p0} key={idx}>
                  <ListItemText primary={val.substring(0, 20).concat(ellipsis)} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="complete">
                      <MdCheck />
                    </IconButton>
                    <IconButton edge="end" aria-label="cancel">
                      <MdClose />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <MdDelete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />} id="panel2-header">
          <Typography className={classes.heading}>Abgeschlossen Filme</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accoridonDetails}>
          <List component="nav">
            {title.map((val, idx) => {
              return (
                <ListItem className={classes.p0} key={idx}>
                  <ListItemText primary={val.substring(0, 20).concat(ellipsis)} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="complete">
                      <MdCheck />
                    </IconButton>
                    <IconButton edge="end" aria-label="cancel">
                      <MdClose />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <MdDelete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />} id="panel2-header">
          <Typography className={classes.heading}>Abgebrochene Filme</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accoridonDetails}>
          <List component="nav">
            {title.map((val, idx) => {
              return (
                <ListItem className={classes.p0} key={idx}>
                  <ListItemText primary={val.substring(0, 20).concat(ellipsis)} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="complete">
                      <MdCheck />
                    </IconButton>
                    <IconButton edge="end" aria-label="cancel">
                      <MdClose />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <MdDelete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MediaList;
