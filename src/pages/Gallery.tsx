import { useRef, useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "../customHooks/useClickOutside";
const xMark = <FontAwesomeIcon icon={"fa-solid fa-circle-xmark" as IconProp} />;

// FontAwesome library
library.add(faCircleXmark);

export default function Gallery() {
  const [toggleAlbum, setToggleAlbum] = useState(false);
  const refBtn = useRef(null);
  const refWrap = useRef(null);

  const handleOnClick = () => {
    setToggleAlbum(!toggleAlbum);
  };

  useClickOutside(refWrap, refBtn, () => setToggleAlbum(false));

  function AlbumSettings() {
    return (
      <article
        ref={refWrap}
        className="absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <input
              type="text"
              className="w-36 text-2xl outline-none"
              // value={"Título"}
              maxLength={15}
            />
            <div className="rounded-full border border-black"></div>
          </div>
          <Button
            type="submit"
            onClick={handleOnClick}
            className="p-0 text-2xl leading-none ring-transparent hover:text-red-700 focus:text-red-700"
          >
            {xMark}
          </Button>
        </div>

        {/* <Button className="w-full rounded-xl bg-[#4363D2] p-2 text-white">
          Faça Upload
        </Button> */}

        <label
          htmlFor="files"
          className="w-full cursor-pointer rounded-xl bg-[#4363D2] p-2 text-center font-bold text-white hover:ring-4 focus:ring-4"
        >
          Faça Upload
        </label>
        <input className="invisible hidden" type="file" name="" id="files" />

        <p className="text-center">
          ou arraste uma imagem, cole imagem ou 
          <Button className="p-0 text-[#4363D2] underline">URL</Button>
        </p>

        {/* <div>
          <div className="size-20 rounded-2xl bg-slate-400"></div>
        </div> */}

        <Button className="rounded-2xl border border-gray-300 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white">
          Deletar Album
        </Button>
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
          refBtn={refBtn}
          onClick={handleOnClick}
          disabled={toggleAlbum && false}
          className={`${toggleAlbum && "cursor-default ring-transparent"} size-[5rem] rounded-2xl bg-slate-400`}
        >
          +
        </Button>
      </section>
    </WrapOutlet>
  );
}
