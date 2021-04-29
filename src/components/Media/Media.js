import { Link } from "@reach/router";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";

function Media() {
  const [mediaData, isLoading] = usePageData("Media");

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log("mediaData", mediaData);

  return (
    <>
      <Link to="/home">Home</Link>
      <Bubbles />

      <h1>Media</h1>
      <ul>
        {mediaData.map((data) => (
          <li>Title: {data.title}</li>
        ))}
      </ul>
    </>
  );
}

export default Media;
