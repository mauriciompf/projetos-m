import { ChangeEvent, useCallback } from "react";
import { useEditAlbumContext } from "../context/EditAlbumContext";
import isAlbumAtImageLimit from "../utils/isAlbumAtImageLimit";
import uploadValidImage from "../utils/uploadValidImage";
import { regexImageFile } from "../utils/constants";

const useUploadInput = () => {
  const {
    editAlbumBoxes,
    setIsEditing,
    isEditAlbum,
    setEditAlbumBoxes,
    isEditing,
  } = useEditAlbumContext();

  const handleUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: number) => {
      if (isAlbumAtImageLimit(editAlbumBoxes, id)) return;
      uploadValidImage(setEditAlbumBoxes, event.target.files, id);
      event.target.value = ""; // Clear file input value to be selected again
      setIsEditing(true);
    },
    [uploadValidImage, isEditAlbum],
  );

  const handleURL = useCallback(
    (id: number) => {
      const url: string | null = prompt("Insira a URL da imagem:");
      if (!url || isAlbumAtImageLimit(editAlbumBoxes, id)) return;

      if (!regexImageFile.test(url)) {
        alert("Somente imagens devem ser usadas.");
        return handleURL(id);
      }

      setEditAlbumBoxes((prev) =>
        prev
          .filter((album) => album.id === id)
          .map((album) => ({ ...album, images: [...album.images, url] })),
      );

      setIsEditing(true);
    },
    [setEditAlbumBoxes, setIsEditing, isEditing],
  );

  return { handleUpload, handleURL };
};

export default useUploadInput;
