import { Ref } from "react";
import AlbumSettingsHeader from "../components/AlbumSettings/AlbumSettingsHeader";
import AlbumSettingsBody from "./AlbumSettingsBody";
import useAlbumSettingsHandlers from "../customHooks/useAlbumSettingsHandlers";

type AlbumSettingsProps = {
  handleToggleAlbumSettings: () => void;
  refWrap: Ref<HTMLElement>;
};

export default function AlbumSettings({
  handleToggleAlbumSettings,
  refWrap,
}: AlbumSettingsProps) {
  const {
    images,
    handleOnChange,
    handleInsertURL,
    handleOnDrop,
    handleOnDragOver,
    handleDeleteAlbum,
    handleDeleteImage,
    handleExpandImage,
  } = useAlbumSettingsHandlers();

  return (
    <article
      ref={refWrap}
      className="absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl"
    >
      <AlbumSettingsHeader
        handleToggleAlbumSettings={handleToggleAlbumSettings}
      />

      <div
        className="grid gap-4"
        onDrop={(event) => handleOnDrop(event)}
        onDragOver={(event) => handleOnDragOver(event)}
      >
        <AlbumSettingsBody
          images={images}
          handleOnChange={handleOnChange}
          handleInsertURL={handleInsertURL}
          handleDeleteAlbum={handleDeleteAlbum}
          handleDeleteImage={handleDeleteImage}
          handleExpandImage={handleExpandImage}
        />
      </div>
    </article>
  );
}
