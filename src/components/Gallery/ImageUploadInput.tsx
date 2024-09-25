import { ChangeEvent, useCallback } from "react";
import isAlbumAtImageLimit from "../../utils/isAlbumAtImageLimit";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import Button from "../Button";
import { regexImageFile, SIZELIMIT } from "../../utils/constants";
import axios from "axios";

// FIXME any
export default function ImageUploadInput({ uploadValidImage, editBox }: any) {
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
      uploadValidImage(event.target.files, id);
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

  return (
    <>
      {/* Button for uploading images */}
      <label
        htmlFor="files"
        className="w-full cursor-pointer rounded-xl bg-savoy p-2 text-center font-bold text-columbia hover:ring-4 focus:ring-4"
      >
        Faça Upload
      </label>

      {/* Hidden input for file upload selection */}
      <input
        onChange={(event) => handleUpload(event, editBox.id)}
        className="invisible hidden"
        type="file"
        id="files"
        accept="image/*" // Allow only images extesions
        multiple // Insert multiple files
      />

      {/* Text and button for image URL input */}
      <p className="text-center">
        ou arraste uma imagem, cole imagem ou{" "}
        <Button
          onClick={() => handleURL(editBox.id)}
          className="p-0 text-savoy underline"
        >
          URL
        </Button>
      </p>
    </>
  );
}
