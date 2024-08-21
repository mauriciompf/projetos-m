import { ChangeEvent, Ref, useState } from "react";
import AlbumSettingsHeader from "./AlbumSettingsHeader";
import AlbumSettingsBody from "./AlbumSettingsBody";
import { useAlbumSettings } from "../../context/AlbumSettingsContext";
import { twMerge } from "tailwind-merge";

type AlbumSettingsProps = {
  handleAlbumSettingsBtn: () => void;
  refWrap: Ref<HTMLElement>;
  className: string;
  // FIXME any type
  setAlbums: any;
  setIsAlbumCreated: any;
  isAlbumCreated: any;
};

export default function AlbumSettings({
  handleAlbumSettingsBtn,
  refWrap,
  className,
  setAlbums,
  isAlbumCreated,
  setIsAlbumCreated,
}: AlbumSettingsProps) {
  const { handleOnDrop, handleOnDragOver } = useAlbumSettings();
  const [inputTitle, setInputTitle] = useState("");

  const handleOnChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setInputTitle(value);
  };

  return (
    <article
      ref={refWrap}
      className={twMerge(
        "absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl",
        className,
      )}
    >
      <AlbumSettingsHeader
        handleOnChangeTitle={handleOnChangeTitle}
        inputTitle={inputTitle}
        handleAlbumSettingsBtn={handleAlbumSettingsBtn}
      />

      <div
        className="grid gap-4"
        onDrop={(event) => handleOnDrop(event)}
        onDragOver={(event) => handleOnDragOver(event)}
      >
        <AlbumSettingsBody
          setInputTitle={setInputTitle}
          inputTitle={inputTitle}
          setAlbums={setAlbums}
          handleAlbumSettingsBtn={handleAlbumSettingsBtn}
          setIsAlbumCreated={setIsAlbumCreated}
          isAlbumCreated={isAlbumCreated}
        />
      </div>
    </article>
  );
}
