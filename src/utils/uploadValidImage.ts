import { regexImageFile, SIZELIMIT } from "./constants";
import { Album } from "./types";

const uploadValidImage = (
  setEditAlbumBoxes: (val: (prev: Album[]) => Album[]) => void,
  files: (File | string)[] | FileList | null,
  id: number,
) => {
  if (!files || files.length < 1) return;

  const validFiles = Array.from(files) // Convert files to array
    .filter((file) => file instanceof File)
    .filter((file) =>
      !regexImageFile.test(file.name) // Extesions validation
        ? alert("Somente imagens devem ser usadas.")
        : true,
    )
    .filter((file) =>
      file.size > SIZELIMIT // Size image validation
        ? alert(`A imagem é muito grande e não será adicionada.`)
        : true,
    );

  if (validFiles.length < 1) return;

  // Convert file object into string
  validFiles.forEach((file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob); // Read the content and convert each file object to a data URL

    reader.addEventListener("load", () => {
      const url = reader.result as string; // base64-encoded string (data URL) representing the file

      setEditAlbumBoxes((prev) =>
        prev
          .filter((album) => album.id === id) // Album id validation
          .map((album) => ({
            ...album,
            images: [...album.images, url], // Insert url image to state
          })),
      );
    });
  });
};

export default uploadValidImage;
