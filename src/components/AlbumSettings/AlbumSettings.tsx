import { Ref } from "react";
import AlbumSettingsHeader from "./AlbumSettingsHeader";
import AlbumSettingsBody from "./AlbumSettingsBody";
import { useAlbumSettings } from "../../context/AlbumSettingsContext";
import { twMerge } from "tailwind-merge";

type AlbumSettingsProps = {
  handleToggleAlbumSettings: () => void;
  refWrap: Ref<HTMLElement>;
  className: string;
};

export default function AlbumSettings({
  handleToggleAlbumSettings,
  refWrap,
  className,
}: AlbumSettingsProps) {
  const { handleOnDrop, handleOnDragOver } = useAlbumSettings();

  return (
    <article
      ref={refWrap}
      className={twMerge(
        "absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl",
        className,
      )}
    >
      <AlbumSettingsHeader
        handleToggleAlbumSettings={handleToggleAlbumSettings}
      />

      <div
        className="grid gap-4"
        onDrop={(event) => handleOnDrop(event)}
        onDragOver={(event) => handleOnDragOver(event)}
      >
        <AlbumSettingsBody />
      </div>
    </article>
  );
}
