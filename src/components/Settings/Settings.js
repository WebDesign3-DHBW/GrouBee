import ButtonAppBar from "../AppBar";
import Bubbles from "../Bubbles";
import FAB from "../FAB";

function Settings() {
  const openModal = () => {};

  return (
    <>
      <ButtonAppBar title="Einstellungen" />
      <Bubbles />
      <FAB open={openModal} />
      <h1>Settings</h1>
    </>
  );
}

export default Settings;
