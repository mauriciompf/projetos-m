import { ChangeEvent, useRef, useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import { closeIcon, deleteIcon, expandIcon, plusIcon } from "../utils/icons";
import useClickOutside from "../customHooks/useClickOutside";

type Album = {
  id: number;
  title: string;
  images: (string | File)[];
};

export default function Gallery() {
  const settingsBtnRef = useRef(null);
  const settingsAlbumRef = useRef(null);
  const extendRef = useRef(null);
  const removeRef = useRef(null);

  const [albumBoxes, setAlbumBoxes] = useState<Album[]>([]);
  const [editAlbumBoxes, setEditAlbumBoxes] = useState<Album[]>([]);
  const [nextId, setNextId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [expandedImage, setExpandedImage] = useState<{
    image: string | File;
    id: number;
    index: number;
  } | null>(null);
  const regexImageFile = new RegExp("\\.(jpg|gif|png|jpeg)(\\?.*)?$", "i");

  const handleClickOutside = () => {
    editAlbumBoxes.forEach((editBox) => {
      handleSaveAlbum(editBox.id, editBox.title, editBox.images); // Save current state
    });

    setEditAlbumBoxes([]); // Close editing mode
  };

  useClickOutside([settingsAlbumRef], () => {
    if (!isExpand) {
      handleClickOutside();
    }
  });

  useClickOutside([extendRef, removeRef], () => {
    if (isExpand) {
      setIsExpand(false);
    }
  });

  const handleCreateNewAlbum = () => {
    setEditAlbumBoxes((prev) => [
      {
        id: nextId,
        title: "",
        images: [],
      },
      ...prev,
    ]);

    setNextId((prev) => prev + 1);
    setIsEditing(false);
  };

  const handleInputTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const value = event.target.value;

    setEditAlbumBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, title: value } : box)),
    );
  };

  const handleAddNewAlbum = (id: number) => {
    const boxToAdd = editAlbumBoxes.find((box) => box.id === id);
    if (boxToAdd) {
      setAlbumBoxes((prev) => [...prev, boxToAdd]);
      setEditAlbumBoxes((prev) => prev.filter((box) => box.id !== id));
    }
  };

  const handleCloseAlbum = (id: number) => {
    setEditAlbumBoxes((prev) => prev.filter((box) => box.id !== id));
    setIsEditing(false);
  };

  const handleEditAlbum = (id: number) => {
    const albumToEdit = albumBoxes.find((box) => box.id === id);

    if (albumToEdit) {
      setEditAlbumBoxes((prev) => [albumToEdit, ...prev]);
      setIsEditing(true);
    }
  };

  const handleSaveAlbum = (
    id: number,
    title: string,
    images: (string | File)[],
  ) => {
    setAlbumBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, title, images } : box)),
    );

    setEditAlbumBoxes((prev) => prev.filter((box) => box.id !== id));
    setIsEditing(false);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const files = event.target.files; // Files in object format
    if (!files && files!.length <= 0) return;

    // Convert to array and filter files that exceed the size limit
    const validFiles = Array.from(files!).filter((file) => {
      // 2097152 === 2MB
      if (file.size > 2097152) {
        alert(`A imagem ${file.name} é muito grande e não será adicionada.`);
        return;
      }
      return true;
    });

    setEditAlbumBoxes((prev) =>
      prev.map((box) =>
        box.id === id
          ? { ...box, images: [...box.images, ...validFiles] }
          : box,
      ),
    );

    event.target.value = "";
  };
  // console.log(editAlbumBoxes);

  const handleURL = (id: number) => {
    const url = prompt("URL:");
    if (!url) return;

    if (!regexImageFile.test(url)) {
      alert("Somente imagens devem ser usados.");
      return handleURL(id);
    }

    setEditAlbumBoxes((prev) =>
      prev.map((box) =>
        box.id === id ? { ...box, images: [...box.images, url] } : box,
      ),
    );
  };

  const handleOnDrop = (event: React.DragEvent, id: number) => {
    event.preventDefault(); // Prevent to open the file in the browser
    const filesList = event.dataTransfer.files; // Files object dropped incluing length
    const filesDrop = filesList[0]; // Files dropped

    if (!filesList || filesList.length <= 0) return;

    if (!regexImageFile.test(filesDrop.name)) {
      alert("Somente imagens devem ser usadas.");
      return;
    }

    if (filesDrop.size > 2097152) {
      alert(
        `A imagem ${filesList[0].name} é muito grande e não será adicionada.`,
      );
      return;
    }

    setEditAlbumBoxes((prev) =>
      prev.map((box) =>
        box.id === id ? { ...box, images: [...box.images, filesDrop] } : box,
      ),
    );
  };

  const handleOnDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleRemoveImage = (
    image: string | File,
    id: number,
    index: number,
  ) => {
    setIsExpand(false);
    if (confirm(`Tem certeza que deseja excluir ${image}?`))
      setEditAlbumBoxes((prev) =>
        prev.map((box) =>
          box.id === id
            ? {
                ...box,
                images: box.images.filter((_, i) => i !== index),
              }
            : box,
        ),
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

  const handleCloseExpandImage = () => {
    setIsExpand(false);
  };

  const handleRemoveAlbum = (id: number, title: string) => {
    if (confirm(`Tem certeza que deseja excluir ${title}?`)) setAlbumBoxes([]);
    setEditAlbumBoxes((prev) => prev.filter((box) => box.id !== id));
    setIsEditing(false);
  };

  // console.log("editAlbumBoxes", editAlbumBoxes);
  // console.log("albumBoxes", albumBoxes);

  return (
    <WrapOutlet projectName={projectList[1].label}>
      {isExpand && (
        <section className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black bg-opacity-75">
          <div>
            <div className="pb-4">
              <div className="mb-4 grid place-items-center">
                <Button
                  onClick={handleCloseExpandImage}
                  className="h-[1.875rem] px-0 py-0 text-3xl"
                >
                  {closeIcon}
                </Button>
              </div>
              <img
                ref={extendRef}
                className="max-h-[80vh] max-w-[90vw] object-contain"
                src={
                  expandedImage!.image instanceof File
                    ? URL.createObjectURL(expandedImage!.image as File)
                    : expandedImage!.image
                }
                alt=""
              />
            </div>

            <div className="flex justify-center pt-6">
              <Button
                refBtn={extendRef}
                onClick={() =>
                  handleRemoveImage(
                    expandedImage!.image,
                    expandedImage!.id,
                    expandedImage!.index,
                  )
                }
                className="flex items-center gap-2 rounded-2xl bg-white p-2 px-3 text-black hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
              >
                Excluir {deleteIcon}
              </Button>
            </div>
          </div>
        </section>
      )}

      <section>
        {editAlbumBoxes.map((editBox) => (
          <article
            ref={settingsAlbumRef}
            key={editBox.id}
            className={
              "absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl"
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="text"
                  onChange={(event) => handleInputTitle(event, editBox.id)}
                  className={`w-36 text-2xl outline-none`}
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

            <div
              onDrop={(event) => handleOnDrop(event, editBox.id)}
              onDragOver={handleOnDragOver}
              className="grid gap-4"
            >
              <label
                htmlFor="files"
                className="w-full cursor-pointer rounded-xl bg-[#4363D2] p-2 text-center font-bold text-white hover:ring-4 focus:ring-4"
              >
                Faça Upload
              </label>
              <input
                onChange={(event) => handleUpload(event, editBox.id)}
                className="invisible hidden"
                type="file"
                id="files"
                accept="image/*"
                multiple
              />

              <p className="text-center">
                ou arraste uma imagem, cole imagem ou 
                <Button
                  onClick={() => handleURL(editBox.id)}
                  className="p-0 text-[#4363D2] underline"
                >
                  URL
                </Button>
              </p>

              <div className="max-h-52 select-none overflow-y-auto">
                {editAlbumBoxes.map((editBox, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 place-items-center gap-y-4"
                  >
                    {editBox.images.map((image, index) => {
                      return (
                        <div key={index} className="group relative">
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

                          <Button
                            onClick={() =>
                              handleExpandImage(image, editBox.id, index)
                            }
                            className="absolute bottom-0 left-0 hidden rounded-bl-2xl border border-black bg-white px-2 py-0 ring-transparent hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white group-hover:block"
                          >
                            {expandIcon}
                          </Button>

                          <Button
                            onClick={() =>
                              handleRemoveImage(
                                image instanceof File ? image.name : image,
                                editBox.id,
                                index,
                              )
                            }
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
                  onClick={() => handleAddNewAlbum(editBox.id)}
                  className="rounded-xl border border-black hover:bg-[#4363D2] hover:text-white focus:bg-[#4363D2] focus:text-white"
                >
                  Adicionar Novo Álbum
                </Button>
              )}
            </div>
          </article>
        ))}
      </section>

      <section
        className={`${editAlbumBoxes.length > 0 && "blur-md"} mx-auto mt-10 grid w-[90%] gap-4`}
      >
        <div className="grid h-[300px] w-full place-items-center rounded-2xl bg-white text-center text-black">
          <p className="text-2xl">
            <strong>Adicione um novo album clicando em "+"</strong>
          </p>
        </div>
        <div ref={settingsBtnRef} className="grid grid-cols-3 gap-4">
          {albumBoxes.map((box) => (
            <Button
              disabled={editAlbumBoxes.length > 0}
              onClick={() => handleEditAlbum(box.id)}
              key={box.id}
              className={`${isEditing && "ring-transparent"} size-[4.5rem] rounded-2xl bg-white text-black`}
            >
              {box.title}
            </Button>
          ))}

          <Button
            disabled={editAlbumBoxes.length > 0}
            onClick={handleCreateNewAlbum}
            className={`${editAlbumBoxes.length > 0 && "ring-transparent"} size-[4.5rem] rounded-2xl bg-white text-black`}
          >
            {plusIcon}
          </Button>
        </div>
      </section>
    </WrapOutlet>
  );
}
