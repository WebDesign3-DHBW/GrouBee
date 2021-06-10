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
import { Rating } from "@material-ui/lab";
import { AiOutlineInfoCircle } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
  },
  accordionSummary: {
    padding: "0 0",
  },
  expandIcon: {
    color: theme.palette.primary.main,
  },
  accordionDetails: {
    display: "inherit",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    padding: "0 0",
  },
  list: {
    paddingTop: 0,
  },
  listItem: {
    paddingLeft: theme.spacing(0),
    alignItems: "start",
    flexDirection: "column",
  },
  listText: {
    "& > span": {
      display: "flex",
      alignItems: "center",
    },
  },
  infoIcon: {
    fontSize: "1rem",
    marginRight: theme.spacing(1),
    textAlign: "center",
  },
  info: {
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
  },
  rating: {
    fontSize: 15,
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: "50%",
    display: "inline-block",
    marginRight: theme.spacing(1),
  },
}));

function MediaList({ media, data, update, setSnackbarContent, handleConfirmPopup }) {
  const classes = useStyles();

  //contains the index for every open accordion
  const [expanded, setExpanded] = useState([0]);

  const handleChange = (panel) => {
    // Check if accordion is already in Array
    if (expanded.some((el) => el === panel)) {
      // If in array -> remove
      setExpanded((prevState) => [...prevState.filter((accID) => accID !== panel)]);
    } else {
      // else -> add
      setExpanded((prevArray) => [...prevArray, panel]);
    }
  };

  const renderMediaForCategory = (category) => {
    return data
      .filter((mediaItem) => mediaItem.status === category)
      .map((mediaItem) => (
        <MediaItem
          data={mediaItem}
          setSnackbarContent={setSnackbarContent}
          category={category}
          update={update}
          media={media}
          handleConfirmPopup={handleConfirmPopup}
        />
      ));
  };

  return (
    <>
      {["begonnen", "neu", "abgeschlossen", "abgebrochen"].map((type, idx) => (
        <Accordion
          square
          expanded={expanded.some((accordion) => accordion === idx)}
          onChange={() => handleChange(idx)}
        >
          <AccordionSummary
            expandIcon={<MdExpandMore className={classes.expandIcon} />}
            id={`${idx}-header`}
            className={classes.accordionSummary}
          >
            <Typography className={classes.heading}>{`${
              type.charAt(0).toUpperCase() + type.slice(1)
            }e ${media}`}</Typography>
          </AccordionSummary>
          {renderMediaForCategory(type).length !== 0 ? (
            renderMediaForCategory(type)
          ) : (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={`${classes.info} ${classes.center}`}
            >
              <AiOutlineInfoCircle className={classes.infoIcon} />
              Hier ist gähnende Leere
            </Typography>
          )}
        </Accordion>
      ))}
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

const MediaItem = ({ data, category, update, setSnackbarContent, media, handleConfirmPopup }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleUpdate = async (status) => {
    const mediaText = media === "Filme" ? "den Film" : "die Serie";
    if (status === "delete") {
      handleConfirmPopup(data.docId)
      
    } else {
      await updateMedia(data.docId, { status });
      setSnackbarContent({
        message: `Du hast ${mediaText} ${status}`,
        status: "success",
        open: true,
      });
      update();
    }
  };

  const ellipsis = data.title.length > 25 ? "…" : "";

  return (
    <>
      <AccordionDetails className={classes.accordionDetails}>
        <List component="nav" className={classes.list}>
          <ListItem className={classes.listItem}>
            <ListItemText className={classes.listText}>
              <span className={classes.dot} style={{ backgroundColor: data.color }} />
              {data.title.substring(0, 25).concat(ellipsis)}
            </ListItemText>

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
                <IconButton edge="end" aria-label="rate" onClick={() => setOpen(true)}>
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
            {category === "abgeschlossen" && (
              <Rating
                value={data.rating}
                className={classes.rating}
                onClick={() => setOpen(true)}
              />
            )}
          </ListItem>
        </List>
      </AccordionDetails>
      <RatingPopup open={open} close={() => setOpen(false)} data={data} update={update} />
    </>
  );
};
