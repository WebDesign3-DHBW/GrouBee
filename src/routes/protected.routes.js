import { Router } from "@reach/router";
import Timetable from "../components/Calendar/Timetable";
import Finance from "../components/Finance/Finance";
import Home from "../components/Home/Home";
import Media from "../components/Media/Media";
import Settings from "../components/Settings/Settings";
import List from "../components/List/List";
import Impressum from "../components/Impressum/Impressum";
import Datenschutz from "../components/Datenschutz/Datenschutz";

const ProtectedRoutes = () => (
  <Router>
    <Home path="/" />
    <List path="todo" />
    <Media path="media" />
    <Finance path="finance" />
    <Timetable path="calendar" />
    <Settings path="settings" />
    <List path="clean" />
    <List path="shopping" />
    <Impressum path="impressum" />
    <Datenschutz path="datenschutz" />
  </Router>
);

export default ProtectedRoutes;
