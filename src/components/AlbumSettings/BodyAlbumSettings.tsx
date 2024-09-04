import React, { ChangeEvent, useCallback } from "react";
import useEditAlbumUtils from "../../customHooks/useEditAlbumUtils";
import Button from "../Button";
import { regexImageFile, SIZELIMIT } from "../../utils/constants";
import axios from "axios";
import isMatchingId from "../../utils/isMatchingId";
import { deleteIcon, expandIcon } from "../../utils/icons";
import { useExpandedImageContext } from "./ExpandedImageContext";
import { useEditAlbumContext } from "../../context/EditAlbumContext";

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
  } = useEditAlbumContext();
  const { handleRemoveImage, handleExpandImage } = useExpandedImageContext();
  const { uploadValidImage, validateInputTitle, closeEditAlbum } =
    useEditAlbumUtils();

  const handleOnDrop = useCallback(
    (event: React.DragEvent, id: number) => {
      event.preventDefault(); // Prevent to open the file in the browser
      uploadValidImage(event.dataTransfer.files, id);
      if (isEditing) setIsEditing(true);
    },
    [uploadValidImage, setIsEditing],
  );

  const handleOnDragOver = useCallback(
    (event: React.DragEvent) => event.preventDefault(),
    [],
  );

  const handleUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: number) => {
      uploadValidImage(event.target.files, id);
      event.target.value = ""; // Clear file input value to be selected again
      if (isEditAlbum) setIsEditing(true);
    },
    [uploadValidImage, isEditAlbum],
  );

  const handleURL = useCallback(
    async (id: number) => {
      try {
        const url = prompt("Insira a URL da imagem:");
        if (!url) return;

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
          className="flex cursor-pointer select-none gap-1 font-bold leading-4 tracking-tight"
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
        className="w-full cursor-pointer rounded-xl bg-[#4363D2] p-2 text-center font-bold text-white hover:ring-4 focus:ring-4"
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
          className="p-0 text-[#4363D2] underline"
        >
          URL
        </Button>
      </p>

      {/* Container for displaying uploaded images */}
      <div className="max-h-52 select-none overflow-y-auto">
        {editAlbumBoxes.map((editBox, index) => (
          <div
            key={index}
            className="grid grid-cols-2 place-items-center gap-y-4"
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
                    className="absolute bottom-0 left-0 hidden rounded-bl-2xl border border-black bg-white px-2 py-0 ring-transparent hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white group-hover:block"
                  >
                    {expandIcon}
                  </Button>

                  {/* Button to delete the image */}
                  <Button
                    onClick={() => handleRemoveImage(editBox.id, index)}
                    className="absolute bottom-0 right-0 hidden rounded-br-xl border border-black bg-white px-2 py-0 ring-transparent hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white group-hover:block"
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
            // border-transparent bg-green-500 text-white
            className={`${isEditing ? "border-transparent bg-green-500 text-white" : "border-black"} rounded-xl border hover:bg-[#4363D2] hover:text-white focus:bg-[#4363D2] focus:text-white`}
          >
            Salve alterações
          </Button>
          <Button
            onClick={() => handleRemoveAlbum(editBox.id, editBox.title)}
            className="rounded-xl border border-black hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
          >
            Deletar Álbum
          </Button>
        </>
      ) : (
        <Button
          onClick={() => handleAddNewAlbum(editBox.id, editBox.title)}
          className="rounded-xl border border-black hover:bg-[#4363D2] hover:text-white focus:bg-[#4363D2] focus:text-white"
        >
          Adicionar Novo Álbum
        </Button>
      )}
    </div>
  );
}
