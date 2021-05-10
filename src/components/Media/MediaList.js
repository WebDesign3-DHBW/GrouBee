import React from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import {
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
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  accordionDetails: {
    display: "inherit",
  },
  p0: {
    paddingLeft: theme.spacing(0),
  },
}));

const Accordion = withStyles({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    "&$expanded": {
      margin: "0",
    },
  },
  expanded: {},
})(MuiAccordion);

const title = [
  "Forrest Gump",
  "Harry Potter",
  "Titanic",
  "Der Herr der Ringe: Die Rückkehr des Königs",
];

const ellipsis = title.length > 20 ? "…" : "";

function MediaList() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary expandIcon={<MdExpandMore />} id="panel1-header">
          <Typography className={classes.heading}>Begonnene Filme</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
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
      <Accordion square expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary expandIcon={<MdExpandMore />} id="panel2-header">
          <Typography className={classes.heading}>Neue Filme</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
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
      <Accordion square expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <AccordionSummary expandIcon={<MdExpandMore />} id="panel3-header">
          <Typography className={classes.heading}>Abgeschlossen Filme</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
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
      <Accordion square expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
        <AccordionSummary expandIcon={<MdExpandMore />} id="panel4-header">
          <Typography className={classes.heading}>Abgebrochene Filme</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
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
