import { useRef, useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "../customHooks/useClickOutside";
import AlbumSettings from "../components/AlbumSettings/AlbumSettings";
import { useAlbumSettings } from "../context/AlbumSettingsContext";

// FontAwesome library
library.add(faCircleXmark);

export default function Gallery() {
  const [toggleAlbum, setToggleAlbum] = useState(false);

  const settingsBtnRef = useRef(null);
  const settingsRef = useRef(null);
  const extendRef = useRef(null);

  const { toggleScreen, setToggleScreen, getImage } = useAlbumSettings();

  const handleToggleAlbumSettings = () => setToggleAlbum(!toggleAlbum);

  // Close album settings when clicking outside, only if toggleScreen is false
  useClickOutside([settingsRef, settingsBtnRef], () => {
    if (!toggleScreen) setToggleAlbum(false);
  });

  // Close modal when clicking outside, only if toggleScreen is true
  useClickOutside([extendRef], () => {
    if (toggleScreen) setToggleScreen(false);
  });

  return (
    <WrapOutlet projectName={projectList[1].label}>
      {toggleScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <Button
              onClick={() => setToggleScreen(!toggleScreen)}
              className="absolute right-0 top-0 flex min-h-8 min-w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-black"
            >
              x
            </Button>
            <img
              ref={extendRef}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              src={URL.createObjectURL(getImage as File)}
              alt=""
            />
          </div>
        </div>
      )}
      <AlbumSettings
        className={`${!toggleAlbum && "hidden"}`}
        refWrap={settingsRef}
        handleToggleAlbumSettings={handleToggleAlbumSettings}
      />

      <section
        id="gallery"
        className={`${toggleAlbum && "blur-lg"} mx-auto mt-10 grid w-[90%] gap-4`}
      >
        <div className="h-[300px] w-full rounded-2xl bg-slate-400"></div>
        <Button
          refBtn={settingsBtnRef}
          onClick={handleToggleAlbumSettings}
          className={`${toggleAlbum && "cursor-default ring-transparent"} size-[5rem] rounded-2xl bg-slate-400`}
        >
          +
        </Button>
      </section>
    </WrapOutlet>
  );
}
