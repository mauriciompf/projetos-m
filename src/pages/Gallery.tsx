import { useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const xMark = <FontAwesomeIcon icon={"fa-solid fa-circle-xmark" as IconProp} />;

// FontAwesome library
library.add(faCircleXmark);

export default function Gallery() {
  const [toggleAlbum, setToggleAlbum] = useState(false);

  const handleOnClick = () => {
    setToggleAlbum(!toggleAlbum);
  };

  function AlbumSettings() {
    return (
      <article className="absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <input type="text" className="w-32" />
            <div className="rounded-full border border-black"></div>
          </div>
          {xMark}
        </div>

        <Button className="w-full rounded-xl bg-[#4363D2] p-2 text-white">
          Faça Upload
        </Button>

        <p className="text-center">
          ou arraste uma imagem, cole imagem ou 
          <Button className="p-0 text-[#4363D2] underline">URL</Button>
        </p>

        {/* <div>
          <div className="size-20 rounded-2xl bg-slate-400"></div>
        </div> */}

        <Button>Deletar galeria</Button>
      </article>
    );
  }

  return (
    <WrapOutlet projectName={projectList[1].label}>
      {toggleAlbum && <AlbumSettings />}

      <section
        className={`${toggleAlbum && "blur-lg"} mx-auto mt-10 grid w-[90%] gap-4`}
      >
        <div className="h-[300px] w-full rounded-2xl bg-slate-400"></div>
        <Button
          onClick={handleOnClick}
          className="size-[5rem] rounded-2xl bg-slate-400"
        >
          +
        </Button>
      </section>
    </WrapOutlet>
  );
}
