import { useCallback } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import isMatchingId from "../../pages/isMatchingId";
import { plusIcon } from "../../utils/icons";
import Button from "../Button";

function MainAlbumGrid() {
  const {
    editAlbumBoxes,
    setEditAlbumBoxes,
    setIsEditAlbum,
    albumBoxes,
    isEditAlbum,
  } = useEditAlbumContext();

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
      <div className="w-full rounded-2xl">
        {albumBoxes.some((album) => album.isMain) ? (
          albumBoxes
            .filter((album) => album.isMain)
            .map((album) => (
              <div key={album.id} className="flex overflow-hidden">
                {album.images.map((image, index) => (
                  <img
                    className="rounded-2xl object-cover"
                    key={index}
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt=""
                  />
                ))}
              </div>
            ))
        ) : (
          <p className="grid h-[300px] place-items-center bg-white text-center text-2xl text-black">
            <strong>Adicione um novo album clicando em "+"</strong>
          </p>
        )}
      </div>
      {/* Grid of album buttons and add button */}
      <div className="grid grid-cols-3 gap-4">
        {albumBoxes.map((album) => (
          <Button
            disabled={editAlbumBoxes.length > 0}
            onClick={() => handleEditAlbum(album.id)}
            key={album.id}
            className={`${
              isEditAlbum && "ring-transparent"
            } size-[4.5rem] rounded-2xl bg-white text-black`}
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
          } size-[4.5rem] rounded-2xl bg-white text-black`}
        >
          {plusIcon}
        </Button>
      </div>
    </section>
  );
}

export default MainAlbumGrid;
