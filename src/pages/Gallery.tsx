import { useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";

export default function Gallery() {
  const [toggleAlbum, setToggleAlbum] = useState(false);

  const handleOnClick = () => {
    setToggleAlbum(!toggleAlbum);
  };

  function AlbumSettings() {
    return <div>Hello</div>;
  }

  return (
    <WrapOutlet projectName={projectList[1].label}>
      <section className="mx-auto mt-10 grid w-[90%] gap-4">
        <div className="h-[300px] w-full rounded-2xl bg-slate-400"></div>
        <Button
          onClick={handleOnClick}
          className="size-[5rem] rounded-2xl bg-slate-400"
        >
          +
        </Button>

        {toggleAlbum && <AlbumSettings />}
      </section>
    </WrapOutlet>
  );
}
