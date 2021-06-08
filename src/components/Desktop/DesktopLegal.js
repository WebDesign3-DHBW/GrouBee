import { Grid } from "@material-ui/core";
import Wrapper from "../base/Wrapper";
import DatenschutzData from "../Datenschutz/DatenschutzData";
import ImpressumData from "../Impressum/ImpressumData";
import DesktopNavbar from "./DesktopNavbar";

function LegalWrapper(props) {
  return (
    <>
      <DesktopNavbar />
      <Wrapper>
        <Grid container>
          <Grid item xs={1} sm={2} md={3}></Grid>
          <Grid item xs={10} sm={8} md={6}>
            <div style={{ maxWidth: "60rem", margin: "auto" }}>{props.children}</div>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

export function DesktopImpressum() {
  return (
    <LegalWrapper>
      <ImpressumData />
    </LegalWrapper>
  );
}

export function DesktopDatenschutz() {
  return (
    <LegalWrapper>
      <DatenschutzData />
    </LegalWrapper>
  );
}
