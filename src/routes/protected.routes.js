import { Router } from "@reach/router";
import Calendar from "../components/Calendar/Calendar";
import Finance from "../components/Finance/Finance";
import Home from "../components/Home/Home";
import Media from "../components/Media/Media";
import Settings from "../components/Settings/Settings";
import List from "../components/List/List";

const ProtectedRoutes = () => (
  <Router>
    <Home path="/" />
    <List path="todo" />
    <Media path="media" />
    <Finance path="finance" />
    <Calendar path="calendar" />
    <Settings path="settings" />
    <List path="clean" />
    <List path="shopping" />
  </Router>
);

export default ProtectedRoutes;
