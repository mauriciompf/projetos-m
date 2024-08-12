import { useRef, useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "../customHooks/useClickOutside";
import AlbumSettings from "./AlbumSettings";

// FontAwesome library
library.add(faCircleXmark);

export default function Gallery() {
  const [toggleAlbum, setToggleAlbum] = useState(false);
  const refBtn = useRef(null);
  const refWrap = useRef(null);

  const handleToggleAlbumSetttings = () => {
    setToggleAlbum(!toggleAlbum);
  };

  useClickOutside(refWrap, refBtn, () => setToggleAlbum(false));

  return (
    <WrapOutlet projectName={projectList[1].label}>
      {toggleAlbum && (
        <AlbumSettings
          refWrap={refWrap}
          handleToggleAlbumSetttings={handleToggleAlbumSetttings}
        />
      )}

      <section
        className={`${toggleAlbum && "blur-lg"} mx-auto mt-10 grid w-[90%] gap-4`}
      >
        <div className="h-[300px] w-full rounded-2xl bg-slate-400"></div>
        <Button
          refBtn={refBtn}
          onClick={handleToggleAlbumSetttings}
          disabled={toggleAlbum && false}
          className={`${toggleAlbum && "cursor-default ring-transparent"} size-[5rem] rounded-2xl bg-slate-400`}
        >
          +
        </Button>
      </section>
    </WrapOutlet>
  );
}
