import React, { ChangeEvent, useCallback } from "react";
import useEditAlbumUtils from "../../customHooks/useEditAlbumUtils";
import Button from "../Button";
import { regexImageFile, SIZELIMIT } from "../../utils/constants";
import axios from "axios";
import isMatchingId from "../../utils/isMatchingId";
import { deleteIcon, expandIcon } from "../../utils/icons";
import { useExpandedImageContext } from "./ExpandedImageContext";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { useThemeContext } from "../../context/ThemeContext";

type BodyAlbumSettingsProps = {
  handleSaveAlbum: (
    id: number,
    title: string,
    images: (string | File)[],
    isMain: boolean,
  ) => void;
  editBox: {
    id: number;
    title: string;
    images: (string | File)[];
    isMain: boolean;
  };
};

export default function BodyAlbumSettings({
  handleSaveAlbum,
  editBox,
}: BodyAlbumSettingsProps) {
  const {
    setEditAlbumBoxes,
    editAlbumBoxes,
    isEditAlbum,
    setAlbumBoxes,
    setIsEditAlbum,
    isEditing,
    setIsEditing,
    setImageIndex,
  } = useEditAlbumContext();
  const { handleRemoveImage, handleExpandImage } = useExpandedImageContext();
  const {
    uploadValidImage,
    validateInputTitle,
    closeEditAlbum,
    isAlbumAtImageLimit,
  } = useEditAlbumUtils();
  const { theme } = useThemeContext();

  const handleOnDrop = useCallback(
    (event: React.DragEvent, id: number) => {
      event.preventDefault(); // Prevent to open the file in the browser
      if (isAlbumAtImageLimit(id)) return;
      uploadValidImage(event.dataTransfer.files, id);
      setIsEditing(true);
    },
    [uploadValidImage, setIsEditing],
  );

  const handleOnDragOver = useCallback(
    (event: React.DragEvent) => event.preventDefault(),
    [],
  );

  const handleUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: number) => {
      if (isAlbumAtImageLimit(id)) return;
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
        if (!url || isAlbumAtImageLimit(id)) return;

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
            .filter(isMatchingId(id))
            .map((box) => ({ ...box, images: [...box.images, url] })),
        );

        if (isEditing) setIsEditing(true);
      } catch (error) {
        console.error(`Erro ao validar a imagem...`);
        return;
      }
    },
    [setEditAlbumBoxes, setIsEditing, isMatchingId],
  );

  const handleRemoveAlbum = useCallback(
    (id: number, title: string) => {
      if (!confirm(`Tem certeza que deseja excluir ${title}?`)) return;

      setAlbumBoxes((prev) => prev.filter((album) => album.id !== id));
      closeEditAlbum(id);
      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [setAlbumBoxes, closeEditAlbum, setIsEditAlbum, setIsEditing],
  );

  const handleAddNewAlbum = useCallback(
    (id: number, title: string) => {
      if (!validateInputTitle(title, id)) return;

      const boxToAdd = editAlbumBoxes.find(isMatchingId(id)); // Get all the elements of editAlbumBoxes array
      if (!boxToAdd) return;

      setAlbumBoxes((prev) => [...prev, { ...boxToAdd, id: Date.now() }]);
      setIsEditAlbum(false);
      setIsEditing(false);
      closeEditAlbum(id);
      setImageIndex(0);
    },
    [setAlbumBoxes, setIsEditAlbum, setIsEditing, closeEditAlbum],
  );

  const handleAddMainAlbum = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: number) => {
      const isChecked = event.target.checked;

      // #FIXME any type
      const updateIsMain = (album: any) => ({
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
      <span className="sr-only">Adicionar álbum em visualização principal</span>

      {editAlbumBoxes.map((editBox) => (
        <label
          key={editBox.id}
          className="flex cursor-pointer select-none gap-1 font-bold leading-4 tracking-tight hover:underline focus:underline"
          htmlFor={`mainAlbum-${editBox.id}`}
        >
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

      {/* Button for uploading images */}
      <label
        htmlFor="files"
        className="w-full cursor-pointer rounded-xl bg-savoy p-2 text-center font-bold text-columbia hover:ring-4 focus:ring-4"
      >
        Faça Upload
      </label>
      {/* Hidden input for file selection */}
      <input
        onChange={(event) => handleUpload(event, editBox.id)}
        className="invisible hidden"
        type="file"
        id="files"
        accept="image/*"
        multiple
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

      {/* Container for displaying uploaded images */}
      <div className="max-h-52 select-none overflow-y-auto">
        {editAlbumBoxes.map((editBox, index) => (
          <div
            key={index}
            className="mx-auto grid grid-cols-2 place-items-center justify-center gap-y-4 min-[400px]:grid-cols-3"
          >
            {editBox.images.map((image, index) => {
              return (
                <div key={index} className="group relative">
                  {/* Display each image */}
                  <img
                    draggable="false"
                    className="size-20 rounded-xl object-cover"
                    src={
                      image instanceof File
                        ? URL.createObjectURL(image as File)
                        : (image as string)
                    }
                    alt=""
                  />

                  {/* Button to expand the image */}
                  <Button
                    onClick={() => handleExpandImage(image, editBox.id, index)}
                    className={`${theme === "light" ? "bg-columbia" : "bg-jet"} absolute bottom-0 left-0 hidden rounded-bl-2xl px-2 py-0 ring-transparent hover:bg-blue-600 hover:text-columbia focus:bg-blue-600 focus:text-columbia group-hover:block`}
                  >
                    {expandIcon}
                  </Button>

                  {/* Button to delete the image */}
                  <Button
                    onClick={() => handleRemoveImage(editBox.id, index)}
                    className={`${theme === "light" ? "bg-columbia" : "bg-jet"} absolute bottom-0 right-0 hidden rounded-br-xl px-2 py-0 ring-transparent hover:bg-cornell hover:text-columbia focus:bg-cornell focus:text-columbia group-hover:block`}
                  >
                    {deleteIcon}
                  </Button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Conditional buttons for saving changes or adding a new album */}
      {isEditAlbum ? (
        <>
          <Button
            onClick={() =>
              handleSaveAlbum(
                editBox.id,
                editBox.title,
                editBox.images,
                editBox.isMain,
              )
            }
            // border-transparent bg-dark_spring text-columbia
            className={` ${isEditing ? "border-transparent bg-dark_spring text-columbia" : `${theme === "light" ? "border-jet" : "border-columbia"}`} rounded-xl border hover:bg-savoy hover:text-columbia focus:bg-savoy focus:text-columbia`}
          >
            Salve alterações
          </Button>
          <Button
            onClick={() => handleRemoveAlbum(editBox.id, editBox.title)}
            className={`${theme === "light" ? "border-jet" : "border-columbia"} rounded-xl border hover:bg-cornell hover:text-columbia focus:bg-cornell focus:text-columbia`}
          >
            Deletar Álbum
          </Button>
        </>
      ) : (
        <Button
          onClick={() => handleAddNewAlbum(editBox.id, editBox.title)}
          className={`${theme === "light" ? "border-jet" : "border-columbia"} rounded-xl border hover:bg-savoy hover:text-columbia focus:bg-savoy focus:text-columbia`}
        >
          Adicionar Novo Álbum
        </Button>
      )}
    </div>
  );
}
