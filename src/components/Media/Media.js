import { useState } from "react";
import ButtonAppBar from "../AppBar";
import usePageData from "../../hooks/usePageData";
import Bubbles from "../Bubbles";
import FAB from "../FAB";
import MediaPopup from "./MediaPopup";

function Media() {
  const [mediaData, isLoading] = usePageData("Media");
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log("mediaData", mediaData);

  return (
    <>
      <ButtonAppBar title="Filme & Serien" />
      <Bubbles />

      <h1>Media</h1>
      <ul>
        {mediaData.map((data) => (
          <li>Title: {data.title}</li>
        ))}
      </ul>
      <FAB open={() => setOpen(true)} />
      <MediaPopup open={open} close={() => setOpen(false)} />
    </>
  );
}

export default Media;
