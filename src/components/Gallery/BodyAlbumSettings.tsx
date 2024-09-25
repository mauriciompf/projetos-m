import React, { ChangeEvent, useCallback } from "react";
import { regexImageFile, SIZELIMIT } from "../../utils/constants";
import { useExpandedImageContext } from "../../context/ExpandedImageContext";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { Album, BodyAlbumSettingsProps } from "../../utils/types";
import isAlbumAtImageLimit from "../../utils/isAlbumAtImageLimit";
import validateInputTitle from "../../utils/validateInputTitle";
import AlbumActionButton from "./AlbumActionButtons";
import UploadedImages from "./UploadedImages";
import ImageUploadInput from "./ImageUploadInput";

export default function BodyAlbumSettings({
  handleSaveAlbum,
  editBox,
}: BodyAlbumSettingsProps) {
  const {
    setEditAlbumBoxes,
    editAlbumBoxes,
    setAlbumBoxes,
    setIsEditAlbum,
    setIsEditing,
    setImageIndex,
    albumBoxes,
  } = useEditAlbumContext();
  const { handleRemoveImage, handleExpandImage } = useExpandedImageContext();

  const uploadValidImage = (
    files: (File | string)[] | FileList | null,
    id: number,
  ) => {
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
            .filter((album) => album.id === id)
            .map((album) => ({
              ...album,
              images: [...album.images, url],
            })),
        );
      });
    });
  };

  const handleOnDrop = useCallback(
    (event: React.DragEvent, id: number) => {
      event.preventDefault(); // Prevent to open the file in the browser
      if (isAlbumAtImageLimit(editAlbumBoxes, id)) return;
      uploadValidImage(event.dataTransfer.files, id);
      setIsEditing(true);
    },
    [uploadValidImage, setIsEditing],
  );

  const handleOnDragOver = useCallback(
    (event: React.DragEvent) => event.preventDefault(),
    [],
  );

  const handleRemoveAlbum = useCallback(
    (id: number, title: string) => {
      if (!confirm(`Tem certeza que deseja excluir ${title}?`)) return;

      setAlbumBoxes((prev) => prev.filter((album) => album.id !== id));
      setEditAlbumBoxes((prev) => prev.filter((album) => album.id !== id));
      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [setAlbumBoxes, setIsEditAlbum, setIsEditing],
  );

  const handleAddNewAlbum = useCallback(
    (id: number, title: string) => {
      if (!validateInputTitle(albumBoxes, title, id)) return;

      const boxToAdd = editAlbumBoxes.find((album) => album.id === id); // Get all the elements of editAlbumBoxes array

      if (!boxToAdd) return;

      setAlbumBoxes((prev) => [...prev, { ...boxToAdd, id: Date.now() }]);
      setEditAlbumBoxes((prev) => prev.filter((album) => album.id !== id));
      setIsEditAlbum(false);
      setIsEditing(false);
      setImageIndex(0);
    },
    [setAlbumBoxes, setIsEditAlbum, setIsEditing],
  );

  const handleAddMainAlbum = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: number) => {
      const isChecked = event.target.checked;

      const updateIsMain = (album: Album) => ({
        ...album,
        isMain: album.id === id ? isChecked : false,
      });

      setEditAlbumBoxes((prev) => prev.map(updateIsMain));
      setAlbumBoxes((prev) => prev.map(updateIsMain));
      setIsEditing(true);
      setImageIndex(0);
    },
    [setEditAlbumBoxes, setAlbumBoxes],
  );

  return (
    <div
      onDrop={(event) => handleOnDrop(event, editBox.id)}
      onDragOver={handleOnDragOver}
      className="grid gap-4"
    >
      {editAlbumBoxes.map((editBox) => (
        <label
          key={editBox.id}
          className="flex cursor-pointer select-none gap-1 font-bold leading-4 tracking-tight hover:underline focus:underline"
          htmlFor={`mainAlbum-${editBox.id}`}
        >
          <span className="sr-only">
            Adicionar álbum em visualização principal
          </span>
          <input
            onChange={(event) => handleAddMainAlbum(event, editBox.id)}
            type="checkbox"
            id={`mainAlbum-${editBox.id}`}
            className="w-8 cursor-pointer"
            checked={editBox.isMain}
          />
          <span>Album principal</span>
        </label>
      ))}

      <ImageUploadInput uploadValidImage={uploadValidImage} editBox={editBox} />

      <UploadedImages
        handleExpandImage={handleExpandImage}
        handleRemoveImage={handleRemoveImage}
      />

      <AlbumActionButton
        editBox={editBox}
        handleSaveAlbum={handleSaveAlbum}
        handleRemoveAlbum={handleRemoveAlbum}
        handleAddNewAlbum={handleAddNewAlbum}
      />
    </div>
  );
}
