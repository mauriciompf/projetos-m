import { useCallback } from "react";
import { useEditAlbumContext } from "../context/EditAlbumContext";
import useEditAlbumUtils from "./useEditAlbumUtils";
import isMatchingId from "../pages/isMatchingId";

const useAlbumEditor = () => {
  const {
    setEditAlbumBoxes,
    setisEditAlbum,
    setAlbumBoxes,
    editAlbumBoxes,
    setIsEditing,
  } = useEditAlbumContext();
  const { closeEditAlbum, validateInputTitle } = useEditAlbumUtils();
  const { isEditAlbum } = useEditAlbumContext();

  const handleAddInputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const value = event.target.value;

      setEditAlbumBoxes((prev) =>
        prev
          .filter(isMatchingId(id))
          .map((album) => ({ ...album, title: value })),
      );

      if (!isEditAlbum) {
        setIsEditing(true);
      }
    },

    [setEditAlbumBoxes, isMatchingId, setIsEditing],
  );

  const handleCloseAlbum = useCallback(
    (id: number) => {
      closeEditAlbum(id);
      setisEditAlbum(false);
      setIsEditing(false);
    },
    [closeEditAlbum, setisEditAlbum, setIsEditing],
  );

  const handleSaveAlbum = useCallback(
    (id: number, title: string, images: (string | File)[]) => {
      if (!validateInputTitle(title, id)) return;

      setAlbumBoxes((prev) =>
        prev.map(
          (album) =>
            album.id === id
              ? { ...album, title, images } // Update the album being edited
              : album, // Keep other albums unchanged
        ),
      );

      closeEditAlbum(id);
      setisEditAlbum(false);
      setIsEditing(false);
    },
    [
      validateInputTitle,
      setAlbumBoxes,
      isMatchingId,
      closeEditAlbum,
      setisEditAlbum,
      setIsEditing,
    ],
  );

  const handleClickOutside = useCallback(() => {
    editAlbumBoxes.forEach((editBox) => {
      handleSaveAlbum(editBox.id, editBox.title, editBox.images); // Save current state
    });

    setEditAlbumBoxes([]); // Close editing mode
    setisEditAlbum(false);
  }, [editAlbumBoxes, handleSaveAlbum, setEditAlbumBoxes]);

  return {
    handleAddInputTitle,
    handleCloseAlbum,
    handleSaveAlbum,
    handleClickOutside,
  };
};

export default useAlbumEditor;
