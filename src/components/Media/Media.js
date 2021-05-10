import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import MediaList from "./MediaList";
import FAB from "../FAB";
import MediaPopup from "./MediaPopup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Media() {
  const [update, setUpdate] = useState(true);
  const [mediaData, isLoading] = usePageData("Media", update);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  console.log(mediaData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ButtonAppBar title="Filme & Serien" />
      <Bubbles />

      <FAB open={() => setOpen(true)} />
      <MediaPopup
        open={open}
        close={() => setOpen(false)}
        triggerUpdate={() => setUpdate(!update)}
      />
      <AppBar position="static" color="default">
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
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <MediaList />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Serien
        </TabPanel>
      </SwipeableViews>
    </>
  );
}

export default Media;
