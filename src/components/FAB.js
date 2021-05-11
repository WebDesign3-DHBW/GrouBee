import { Fab, makeStyles } from "@material-ui/core";
import { MdAdd } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "1.5rem",
    color: theme.palette.grey[900],
  },
  fab: {
    display: "flex",
    alignItems: "center",
    position: "fixed",
    bottom: 65,
    right: theme.spacing(2),
    zIndex: 2,
  },
}));

function FAB({ open }) {
  const classes = useStyles();

  return (
    <Fab aria-label="Modal-Öffnen" color="primary" onClick={() => open()} className={classes.fab}>
      <MdAdd className={classes.icon} />
    </Fab>
  );
}

export default FAB;
