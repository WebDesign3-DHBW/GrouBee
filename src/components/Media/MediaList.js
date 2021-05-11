import React, { useState } from "react";
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
import { MdCheck, MdClose, MdDelete, MdExpandMore, MdPlayArrow, MdStar } from "react-icons/md";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import RatingPopup from "./RatingPopup";
import { updateMedia } from "../../firebase/updateMedia";
import { removeMedia } from "../../firebase/removeMedia";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  accordionDetails: {
    display: "inherit",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    padding: "0px 16px",
  },
  list: {
    paddingTop: 0,
  },
  p0: {
    paddingLeft: theme.spacing(0),
  },
}));

function MediaList({ media, data, update }) {
  console.log("data", data);
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderMediaForCategory = (category) => {
    return data
      .filter((mediaItem) => mediaItem.status === category)
      .map((mediaItem) => (
        <MediaItem
          data={mediaItem}
          open={() => setOpen(true)}
          category={category}
          update={update}
        />
      ));
  };

  return (
    <>
      {["begonnen", "neu", "abgeschlossen", "abgebrochen"].map((type, idx) => (
        <Accordion square expanded={expanded === idx} onChange={handleChange(idx)}>
          <AccordionSummary expandIcon={<MdExpandMore />} id={`${idx}-header`}>
            <Typography className={classes.heading}>{`${
              type.charAt(0).toUpperCase() + type.slice(1)
            }e ${media}`}</Typography>
          </AccordionSummary>
          {renderMediaForCategory(type)}
        </Accordion>
      ))}

      <RatingPopup open={open} close={() => setOpen(false)} />
    </>
  );
}

export default MediaList;

const Accordion = withStyles({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    "&$expanded": {
      margin: "0",
      "&:before": {
        opacity: 1,
      },
    },
  },
  expanded: {},
})(MuiAccordion);

const MediaItem = ({ data, open, category, update }) => {
  const classes = useStyles();

  const handleUpdate = async (status) => {
    if (status === "delete") {
      await removeMedia(data.docId);
    } else {
      await updateMedia(data.docId, { status });
    }
    update();
  };

  return (
    <AccordionDetails className={classes.accordionDetails}>
      <List component="nav" className={classes.list}>
        <ListItem className={classes.p0}>
          <ListItemText primary={data.title} />

          <ListItemSecondaryAction>
            {category === "begonnen" && (
              <IconButton
                edge="end"
                aria-label="complete"
                onClick={() => handleUpdate("abgeschlossen")}
              >
                <MdCheck />
              </IconButton>
            )}
            {category === "neu" && (
              <IconButton edge="end" aria-label="start" onClick={() => handleUpdate("begonnen")}>
                <MdPlayArrow />
              </IconButton>
            )}
            {category === "abgeschlossen" && (
              <IconButton edge="end" aria-label="rate" onClick={open}>
                <MdStar />
              </IconButton>
            )}
            {(category === "begonnen" || category === "neu") && (
              <>
                <IconButton
                  edge="end"
                  aria-label="cancel"
                  onClick={() => handleUpdate("abgebrochen")}
                >
                  <MdClose />
                </IconButton>
              </>
            )}
            <IconButton edge="end" aria-label="delete" onClick={() => handleUpdate("delete")}>
              <MdDelete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </AccordionDetails>
  );
};
