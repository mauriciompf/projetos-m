import { useCallback } from "react";
import { useEditAlbumContext } from "../context/EditAlbumContext";
import validateInputTitle from "../utils/validateInputTitle";

const useAlbumEditor = () => {
  const {
    setEditAlbumBoxes,
    setIsEditAlbum,
    setAlbumBoxes,
    editAlbumBoxes,
    setIsEditing,
    setImageIndex,
  } = useEditAlbumContext();
  const { isEditAlbum, albumBoxes } = useEditAlbumContext();

  const handleAddInputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const value = event.target.value;

      setEditAlbumBoxes((prev) =>
        prev
          .filter((album) => album.id === id)
          .map((album) => ({ ...album, title: value })),
      );

      if (!isEditAlbum) {
        setIsEditing(true);
      }
    },

    [setEditAlbumBoxes, setIsEditing],
  );

  const handleCloseAlbum = useCallback(
    (id: number) => {
      setEditAlbumBoxes((prev) => prev.filter((album) => album.id !== id));
      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [setIsEditAlbum, setIsEditing],
  );

  const handleSaveAlbum = useCallback(
    (id: number, title: string, images: (string | File)[], isMain: boolean) => {
      if (!validateInputTitle(albumBoxes, title, id)) return;

      setAlbumBoxes((prev) =>
        prev.map(
          (album) =>
            album.id === id
              ? { ...album, title, images, isMain } // Update the album being edited
              : album, // Keep other albums unchanged
        ),
      );

      setImageIndex(0);
      setEditAlbumBoxes((prev) => prev.filter((album) => album.id !== id));
      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [validateInputTitle, setAlbumBoxes, setIsEditAlbum, setIsEditing],
  );

  const handleClickOutside = useCallback(() => {
    editAlbumBoxes.forEach((editBox) => {
      handleSaveAlbum(
        editBox.id,
        editBox.title,
        editBox.images,
        editBox.isMain,
      ); // Save current state
    });

    setEditAlbumBoxes([]); // Close editing mode
    setIsEditAlbum(false);
  }, [editAlbumBoxes, handleSaveAlbum, setEditAlbumBoxes]);

  return {
    handleAddInputTitle,
    handleCloseAlbum,
    handleSaveAlbum,
    handleClickOutside,
  };
};

export default useAlbumEditor;
