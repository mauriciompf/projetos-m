import { ChangeEvent, Ref, useState } from "react";
import AlbumSettingsHeader from "./AlbumSettingsHeader";
import AlbumSettingsBody from "./AlbumSettingsBody";
import { useAlbumSettings } from "../../context/AlbumSettingsContext";
import { twMerge } from "tailwind-merge";

type AlbumSettingsProps = {
  handleAlbumSettingsBtn: () => void;
  refWrap: Ref<HTMLElement>;
  className: string;
};

export default function AlbumSettings({
  handleAlbumSettingsBtn,
  refWrap,
  className,
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
        handleToggleAlbumSettings={handleAlbumSettingsBtn}
      />

      <div
        className="grid gap-4"
        onDrop={(event) => handleOnDrop(event)}
        onDragOver={(event) => handleOnDragOver(event)}
      >
        <AlbumSettingsBody inputTitle={inputTitle} />
      </div>
    </article>
  );
}
