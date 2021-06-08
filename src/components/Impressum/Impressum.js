import ButtonAppBar from "../AppBar";
import Wrapper from "../base/Wrapper";
import ImpressumData from "./ImpressumData";

function Impressum() {
  return (
    <>
      <ButtonAppBar title="Impressum" />

      <Wrapper>
        <ImpressumData />
      </Wrapper>
    </>
  );
}

export default Impressum;
