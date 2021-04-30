import { Redirect, Router } from "@reach/router";
import { SignIn, SignUp } from "../components/LoginSignup";

const PublicRoutes = ({ authenticated }) => {
  if (authenticated) {
    return <Redirect to="/" noThrow />;
  }
  return (
    <Router>
      <SignIn path="signin" />
      <SignUp path="signup" />
    </Router>
  );
};

export default PublicRoutes;
