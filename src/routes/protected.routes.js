import { Router } from "@reach/router";
import Calendar from "../components/Calendar/Calendar";
import Finance from "../components/Finance/Finance";
import Home from "../components/Home/Home";
import Media from "../components/Media/Media";
import Settings from "../components/Settings/Settings";
import ToDo from "../components/ToDo/ToDo";
import Groceries from "../components/Groceries/Groceries";
import Cleaning from "../components/Cleaning/Cleaning";

const ProtectedRoutes = () => (
  <Router>
    <Home path="/" />
    <ToDo path="todo" />
    <Media path="media" />
    <Finance path="finance" />
    <Calendar path="calendar" />
    <Settings path="settings" />
    <Cleaning path="clean" />
    <Groceries path="shopping" />
  </Router>
);

export default ProtectedRoutes;
