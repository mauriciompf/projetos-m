import { ChangeEvent, Ref, useState } from "react";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
const xMark = <FontAwesomeIcon icon={"fa-solid fa-circle-xmark" as IconProp} />;

type AlbumSettingsProps = {
  handleToggleAlbumSetttings: () => void;
  refWrap: Ref<HTMLElement>;
};

export default function AlbumSettings({
  handleToggleAlbumSetttings,
  refWrap,
}: AlbumSettingsProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

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
          onClick={handleToggleAlbumSetttings}
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
      <input
        className="invisible hidden"
        onChange={(event) => handleOnChange(event)}
        type="file"
        name=""
        id="files"
        accept="image/*"
      />

      <p className="text-center">
        ou arraste uma imagem, cole imagem ou 
        <Button className="p-0 text-[#4363D2] underline">URL</Button>
      </p>

      {image && (
        <>
          {image && (
            <img
              className="size-20 rounded-2xl"
              src={window.URL.createObjectURL(image)}
              alt=""
            />
          )}
        </>
      )}

      <Button className="rounded-2xl border border-gray-300 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white">
        Deletar Album
      </Button>
    </article>
  );
}
