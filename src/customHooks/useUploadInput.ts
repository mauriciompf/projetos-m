import { ChangeEvent, useCallback } from "react";
import { useEditAlbumContext } from "../context/EditAlbumContext";
import isAlbumAtImageLimit from "../utils/isAlbumAtImageLimit";
import uploadValidImage from "../utils/uploadValidImage";
import { regexImageFile, SIZELIMIT } from "../utils/constants";
import axios from "axios";

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
    async (id: number) => {
      try {
        const url = prompt("Insira a URL da imagem:");
        if (!url || isAlbumAtImageLimit(editAlbumBoxes, id)) return;

        if (!regexImageFile.test(url)) {
          alert("Somente imagens devem ser usados.");
          return handleURL(id);
        }

        const response = await axios.get(url, { responseType: "blob" }); // Fetch url image
        const blob = response.data; // Get Blob Object (image details)

        if (blob.size > SIZELIMIT) {
          alert("A imagem é muito grande e não será adicionada.");
          return handleURL(id);
        }

        setEditAlbumBoxes((prev) =>
          prev
            .filter((album) => album.id === id)
            .map((box) => ({ ...box, images: [...box.images, url] })),
        );

        if (isEditing) setIsEditing(true);
      } catch (error) {
        console.error(`Erro ao validar a imagem...`);
        return;
      }
    },
    [setEditAlbumBoxes, setIsEditing],
  );

  return { handleUpload, handleURL };
};

export default useUploadInput;
