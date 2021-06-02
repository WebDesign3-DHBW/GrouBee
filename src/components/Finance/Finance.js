import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import FAB from "../FAB";
import FinancePopup from "./FinancePopup";
import { useState } from "react";

function Finance() {
  const [financeData, isLoading] = usePageData("Finance");
  const [openFinancePopup, setOpenFinancePopup] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log("financeData", financeData);

  return (
    <>
      <ButtonAppBar title="Finanzen" />
      <Bubbles />
      <FAB open={() => setOpenFinancePopup(true)} />
      <FinancePopup open={openFinancePopup} close={() => setOpenFinancePopup(false)} />

      <h1>Finance</h1>
      <ul>
        {financeData.map((data) => (
          <li>Value: {data.value}</li>
        ))}
      </ul>
    </>
  );
}

export default Finance;
