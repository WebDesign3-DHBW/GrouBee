import { useState } from "react";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import MediaList from "./MediaList";
import FAB from "../FAB";
import MediaPopup from "./MediaPopup";
import { TabPanel, a11yProps } from "../Settings/GroupPopup";
import { AiOutlineInfoCircle } from "react-icons/ai";
import InfoPanel from "./InfoPanel";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing(12),
  },
  info: {
    fontSize: "1.4rem",
  },
}));

function Media() {
  const [update, setUpdate] = useState(true);
  const [mediaData, isLoading] = usePageData("Media", update);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const getMediaData = (type) => {
    const isMovie = type === "Film" ? true : false;
    return mediaData.filter((media) => media.isMovie === isMovie);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <ButtonAppBar title="Filme & Serien" />
        <Bubbles />

        <FAB open={() => setOpen(true)} />
        <MediaPopup
          open={open}
          mediaType={value}
          close={() => setOpen(false)}
          triggerUpdate={() => setUpdate(!update)}
        />
        <AppBar position="static" color="transparent" elevation="0">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs"
          >
            <Tab label="Filme" {...a11yProps(0)} />
            <Tab label="Serien" {...a11yProps(1)} />
            <Tab icon={<AiOutlineInfoCircle />} className={classes.info} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <MediaList
              media="Filme"
              data={getMediaData("Film")}
              update={() => setUpdate(!update)}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <MediaList
              media="Serien"
              data={getMediaData("Serie")}
              update={() => setUpdate(!update)}
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction} className={classes.info}>
            <InfoPanel></InfoPanel>
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
}

export default Media;
