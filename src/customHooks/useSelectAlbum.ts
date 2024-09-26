import { useCallback } from "react";
import { useEditAlbumContext } from "../context/EditAlbumContext";

const useSelectAlbum = () => {
  const { setEditAlbumBoxes, setIsEditAlbum, albumBoxes } =
    useEditAlbumContext();

  const handleEditAlbum = useCallback(
    (id: number) => {
      const albumToEdit = albumBoxes.find((album) => album.id === id);
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

  return { handleCreateNewAlbum, handleEditAlbum };
};

export default useSelectAlbum;
