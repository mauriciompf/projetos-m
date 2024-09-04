import { useCallback } from "react";
import { useEditAlbumContext } from "../context/EditAlbumContext";
import useEditAlbumUtils from "./useEditAlbumUtils";
import isMatchingId from "../utils/isMatchingId";

const useAlbumEditor = () => {
  const {
    setEditAlbumBoxes,
    setIsEditAlbum,
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
      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [closeEditAlbum, setIsEditAlbum, setIsEditing],
  );

  const handleSaveAlbum = useCallback(
    (id: number, title: string, images: (string | File)[], isMain: boolean) => {
      if (!validateInputTitle(title, id)) return;

      setAlbumBoxes((prev) =>
        prev.map(
          (album) =>
            album.id === id
              ? { ...album, title, images, isMain } // Update the album being edited
              : album, // Keep other albums unchanged
        ),
      );

      closeEditAlbum(id);
      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [
      validateInputTitle,
      setAlbumBoxes,
      isMatchingId,
      closeEditAlbum,
      setIsEditAlbum,
      setIsEditing,
    ],
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
