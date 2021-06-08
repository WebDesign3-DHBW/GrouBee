import ButtonAppBar from "../AppBar";
import Wrapper from "../base/Wrapper";
import DatenschutzData from "./DatenschutzData";

function Datenschutz() {
  return (
    <>
      <ButtonAppBar title="Datenschutz" />
      <Wrapper>
        <DatenschutzData />
      </Wrapper>
    </>
  );
}

export default Datenschutz;
