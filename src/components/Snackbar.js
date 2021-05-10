import { Slide, Snackbar as MuiSnackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Snackbar({ snackbarContent, setSnackbarContent }) {
  return (
    <>
      {snackbarContent?.open && (
        <MuiSnackbar
          open={snackbarContent.open}
          autoHideDuration={5000}
          onClose={() =>
            setSnackbarContent((prevState) => {
              return { ...prevState, open: false };
            })
          }
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Slide}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={snackbarContent.status}
            onClose={() =>
              setSnackbarContent((prevState) => {
                return { ...prevState, open: false };
              })
            }
          >
            {snackbarContent.message}
          </MuiAlert>
        </MuiSnackbar>
      )}
    </>
  );
}

export default Snackbar;
