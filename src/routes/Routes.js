import PublicRoutes from "./public.routes";
import ProtectedRoutes from "./protected.routes";
import { useEffect, useState } from "react";
import { Redirect } from "@reach/router";
import firebase from "firebase/app";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Routes() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoadingAuth(false);
    });
  }, []);

  return (
    <>
      {loadingAuth ? (
        <div style={{ textAlign: "center", marginTop: "45vh" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {authenticated ? <ProtectedRoutes /> : <Redirect to="/signup" noThrow />}
          <PublicRoutes authenticated={authenticated} />
        </>
      )}
    </>
  );
}
