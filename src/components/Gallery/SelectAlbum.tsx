import { useCallback } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { plusIcon } from "../../utils/icons";
import Button from "../Button";

export default function SelectAlbum() {
  const {
    editAlbumBoxes,
    setEditAlbumBoxes,
    setIsEditAlbum,
    albumBoxes,
    isEditAlbum,
  } = useEditAlbumContext();

  const handleEditAlbum = useCallback(
    (id: number) => {
      const albumToEdit = albumBoxes.find((album) => album.id === id); // Get the matching album
      if (!albumToEdit) return;

      setEditAlbumBoxes((prev) => [...prev, albumToEdit]);
      setIsEditAlbum(true);
    },
    [albumBoxes, setEditAlbumBoxes, setIsEditAlbum],
  );

  const handleCreateNewAlbum = useCallback(() => {
    setEditAlbumBoxes((prev) => [
      {
        id: Date.now(),
        title: "",
        images: [],
        isMain: false,
      },
      ...prev,
    ]);
  }, [setEditAlbumBoxes]);

  return (
    <div className="flex flex-wrap items-center gap-2 max-md:justify-center min-[400px]:text-xl md:max-h-[500px] md:pt-[4px] min-[1024px]:max-h-[680px]">
      {/* Button to open an album */}
      {albumBoxes.map((album) => (
        <Button
          disabled={editAlbumBoxes.length > 0}
          onClick={() => handleEditAlbum(album.id)}
          key={album.id}
          className={`${
            isEditAlbum && "ring-transparent"
          } size-[4rem] break-words rounded-2xl bg-columbia leading-5 text-jet min-[400px]:size-[6rem] min-[1400px]:size-[8rem]`}
        >
          {album.title}
        </Button>
      ))}

      {/* Button to create a new album */}
      <Button
        disabled={editAlbumBoxes.length > 0}
        onClick={handleCreateNewAlbum}
        className={`${
          editAlbumBoxes.length > 0 && "ring-transparent"
        } size-[4rem] rounded-2xl bg-columbia text-jet min-[400px]:size-[6rem] min-[1400px]:size-[8rem]`}
      >
        {plusIcon}
      </Button>
    </div>
  );
}
