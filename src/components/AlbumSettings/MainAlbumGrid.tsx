import { useCallback } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import isMatchingId from "../../pages/isMatchingId";
import { plusIcon } from "../../utils/icons";
import Button from "../Button";

function MainAlbumGrid() {
  const {
    editAlbumBoxes,
    setEditAlbumBoxes,
    nextId,
    setIsEditAlbum,
    albumBoxes,
    isEditAlbum,
  } = useEditAlbumContext();

  const handleCreateNewAlbum = useCallback(() => {
    setEditAlbumBoxes((prev) => [
      {
        id: nextId,
        title: "",
        images: [],
        isMain: false,
      },
      ...prev,
    ]);

    setIsEditAlbum(false);
  }, [setIsEditAlbum, setEditAlbumBoxes]);

  const handleEditAlbum = useCallback(
    (id: number) => {
      const albumToEdit = albumBoxes.find(isMatchingId(id)); // Get all the elements of AlbumBoxes array
      if (!albumToEdit) return;

      setEditAlbumBoxes((prev) => [...prev, albumToEdit]);
      setIsEditAlbum(true);
    },
    [albumBoxes, isMatchingId, setEditAlbumBoxes, setIsEditAlbum],
  );

  return (
    <section
      className={`${
        editAlbumBoxes.length > 0 && "blur-md"
      } mx-auto mt-10 grid w-[90%] gap-4`}
    >
      {/* Placeholder for creating a new album */}
      <div className="grid h-[300px] w-full place-items-center rounded-2xl bg-white text-center text-black">
        <p className="text-2xl">
          <strong>Adicione um novo album clicando em "+"</strong>
        </p>
      </div>
      {/* Grid of album buttons and add button */}
      <div className="grid grid-cols-3 gap-4">
        {albumBoxes.map((box) => (
          <Button
            disabled={editAlbumBoxes.length > 0}
            onClick={() => handleEditAlbum(box.id)}
            key={box.id}
            className={`${
              isEditAlbum && "ring-transparent"
            } size-[4.5rem] rounded-2xl bg-white text-black`}
          >
            {box.title}
          </Button>
        ))}

        {/* Button to create a new album */}
        <Button
          disabled={editAlbumBoxes.length > 0}
          onClick={handleCreateNewAlbum}
          className={`${
            editAlbumBoxes.length > 0 && "ring-transparent"
          } size-[4.5rem] rounded-2xl bg-white text-black`}
        >
          {plusIcon}
        </Button>
      </div>
    </section>
  );
}

export default MainAlbumGrid;
