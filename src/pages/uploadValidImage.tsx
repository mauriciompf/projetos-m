import { useCallback } from "react";
import { regexImageFile, SIZELIMIT } from "../utils/constants";
import isMatchingId from "./isMatchingId";
import { useEditAlbumContext } from "./EditAlbumContext";

const { setEditAlbumBoxes } = useEditAlbumContext();

const uploadValidImage = useCallback(
  (files: (File | string)[] | FileList | null, id: number) => {
    if (!files || files.length < 1) return;

    // Convert files to array
    const validFiles = Array.from(files)
      .filter((file) => file instanceof File)
      .filter((file) =>
        !regexImageFile.test(file.name)
          ? alert("Somente imagens devem ser usadas.")
          : true,
      )
      .filter((file) =>
        file.size > SIZELIMIT
          ? alert(`A imagem é muito grande e não será adicionada.`)
          : true,
      );

    if (validFiles.length < 1) return;

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob); // Read the content and convert each file object to a Data URL

      reader.addEventListener("load", () => {
        const url = reader.result as string; // base64-encoded string (Data URL) representing the file

        // Insert url image to state
        setEditAlbumBoxes((prev) =>
          prev
            .filter(isMatchingId(id))
            .map((album) => ({ ...album, images: [...album.images, url] })),
        );
      });
    });
  },
  [setEditAlbumBoxes, isMatchingId],
);

export default uploadValidImage;
