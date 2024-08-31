import { ChangeEvent, useRef } from "react";
import { closeIcon, deleteIcon, expandIcon } from "../../utils/icons";
import Button from "../Button";
import { useEditAlbumContext } from "../../pages/EditAlbumContext";
import isMatchingId from "../../pages/isMatchingId";
import closeEditAlbum from "../../pages/closeEditAlbum";
import uploadValidImage from "../../pages/uploadValidImage";
import validateInputTitle from "../../utils/validateInputTitle";
import { regexImageFile, SIZELIMIT } from "../../utils/constants";
import axios from "axios";

function EditAlbum() {
  const settingsAlbumRef = useRef(null);

  const {
    setEditAlbumBoxes,
    setIsEditing,
    setAlbumBoxes,
    setNextId,
    editAlbumBoxes,
    isEditing,
    setIsExpand,
    setExpandedImage,
  } = useEditAlbumContext();

  const handleAddInputTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const value = event.target.value;

    setEditAlbumBoxes((prev) =>
      prev
        .filter(isMatchingId(id))
        .map((album) => ({ ...album, title: value })),
    );
  };

  const handleCloseAlbum = (id: number) => {
    closeEditAlbum(id);
    setIsEditing(false);
  };

  const handleOnDrop = (event: React.DragEvent, id: number) => {
    event.preventDefault(); // Prevent to open the file in the browser
    uploadValidImage(event.dataTransfer.files, id);
  };

  const handleOnDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleSaveAlbum = (
    id: number,
    title: string,
    images: (string | File)[],
  ) => {
    if (!validateInputTitle(title, id)) return;

    setAlbumBoxes((prev) =>
      prev
        .filter(isMatchingId(id))
        .map((album) => ({ ...album, title, images })),
    );

    closeEditAlbum(id);
    setIsEditing(false);
  };

  const handleRemoveAlbum = (id: number, title: string) => {
    if (!confirm(`Tem certeza que deseja excluir ${title}?`)) return;

    // Remove the album from albumBoxes and reset IDs
    setAlbumBoxes((prev) =>
      prev
        .filter((album) => album.id !== id)
        .map((album, index) => ({
          ...album,
          id: index, // Ensure IDs start from 0 and increment sequentially
        })),
    );

    closeEditAlbum(id);
    setNextId((prev) => Math.max(0, prev - 1));
    setIsEditing(false);
  };

  const handleAddNewAlbum = (id: number, title: string) => {
    if (!validateInputTitle(title, id)) return;

    const boxToAdd = editAlbumBoxes.find(isMatchingId(id)); // Get all the elements of editAlbumBoxes array
    if (!boxToAdd) return;

    setAlbumBoxes((prev) => [...prev, boxToAdd]);
    closeEditAlbum(id);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    uploadValidImage(event.target.files, id);
    event.target.value = ""; // Clear file input value to be selected again
  };

  const handleURL = async (id: number) => {
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
    } catch (error) {
      console.error(`Erro ao validar a imagem...`);
      return;
    }
  };

  const handleRemoveImage = (id: number, index: number) => {
    setIsExpand(false);
    if (!confirm(`Tem certeza que deseja excluir esta imagem?`)) return;

    setEditAlbumBoxes((prev) =>
      prev.filter(isMatchingId(id)).map((album) => ({
        ...album,
        images: album.images.filter((_, i) => i !== index),
      })),
    );
  };

  const handleExpandImage = (
    image: string | File,
    id: number,
    index: number,
  ) => {
    setIsExpand(true);
    setExpandedImage({ image, id, index });
  };

  return (
    <section>
      {editAlbumBoxes.map((editBox) => (
        <article
          ref={settingsAlbumRef}
          key={editBox.id}
          className="absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl"
        >
          {/* Header with title input and close button for album settings */}
          <div className="flex items-center justify-between">
            <div>
              <input
                type="text"
                onChange={(event) => handleAddInputTitle(event, editBox.id)}
                className="w-36 text-2xl outline-none"
                placeholder="Título"
                value={editBox.title}
                maxLength={15}
                aria-label="Título do album"
              />
              <div className="rounded-full border border-black"></div>
            </div>
            <Button
              onClick={() => handleCloseAlbum(editBox.id)}
              className="p-0 text-2xl leading-none ring-transparent hover:text-red-700 focus:text-red-700"
              aria-labelledby="Feche configurações de galeria"
            >
              {closeIcon}
            </Button>
          </div>

          {/* Section for drag-and-drop image upload */}
          <div
            onDrop={(event) => handleOnDrop(event, editBox.id)}
            onDragOver={handleOnDragOver}
            className="grid gap-4"
          >
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
                          onClick={() =>
                            handleExpandImage(image, editBox.id, index)
                          }
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
            {isEditing ? (
              <>
                <Button
                  onClick={() =>
                    handleSaveAlbum(editBox.id, editBox.title, editBox.images)
                  }
                  className="rounded-xl border border-black hover:bg-[#4363D2] hover:text-white focus:bg-[#4363D2] focus:text-white"
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
        </article>
      ))}
    </section>
  );
}

export default EditAlbum;
