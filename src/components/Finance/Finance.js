import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";

function Finance() {
  const [financeData, isLoading] = usePageData("Finance");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ButtonAppBar title="Finanzen" />
      <Bubbles />

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
