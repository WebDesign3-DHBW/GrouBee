import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import { Dialog } from "@material-ui/core";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    maxWidth: 500,
    height: "100%",
  },
  tabs: {
    width: "400",
  },
  appbar: {
    minWidth: 310,
    backgroundColor: "#fff",
  },
}));

export default function FullWidthTabs({ open, close, updateBubbles }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={close}>
      <div className={classes.root}>
        <AppBar position="static" color="default" variant="outlined" className={classes.appbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            padding="0px"
            className={classes.tabs}
          >
            <Tab label="Gruppe erstellen" {...a11yProps(0)} width="100%" style={{ padding: 0 }} />
            <Tab label="Gruppe beitreten" {...a11yProps(1)} width="100%" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CreateGroup close={close} updateBubbles={updateBubbles} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <JoinGroup close={close} updateBubbles={updateBubbles} />
        </TabPanel>
      </div>
    </Dialog>
  );
}
