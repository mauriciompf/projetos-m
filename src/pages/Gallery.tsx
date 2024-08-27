import { ChangeEvent, useRef, useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import { plusIcon } from "../utils/icons";
import useClickOutside from "../customHooks/useClickOutside";

type Album = {
  id: number;
  title: string;
  images: (string | File)[];
};

export default function Gallery() {
  const settingsBtnRef = useRef(null);
  const settingsAlbumRef = useRef(null);

  const [albumBoxes, setAlbumBoxes] = useState<Album[]>([]);
  const [editAlbumBoxes, setEditAlbumBoxes] = useState<Album[]>([]);
  const [nextId, setNextId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOutside = () => {
    editAlbumBoxes.forEach((editBox) => {
      handleSaveAlbum(editBox.id, editBox.title, editBox.images); // Save current state
    });

    setEditAlbumBoxes([]); // Close editing mode
    setIsEditing(false);
  };

  useClickOutside([settingsAlbumRef], handleClickOutside);

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

  const handleURL = (id: number) => {
    const regexImageFile = new RegExp("\\.(jpg|gif|png|jpeg)(\\?.*)?$", "i");
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

  console.log("editAlbumBoxes", editAlbumBoxes);
  console.log("albumBoxes", albumBoxes);

  return (
    <WrapOutlet projectName={projectList[1].label}>
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
                x
              </Button>
            </div>

            <div className="grid gap-4">
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

              <div className="grid max-h-52 grid-cols-2 place-items-center gap-y-4 overflow-y-auto">
                {editAlbumBoxes.map((editBox) => (
                  <div key={editBox.id} className="group relative">
                    {editBox.images.map((image, index) => (
                      <img
                        draggable="false"
                        className="size-20 rounded-2xl object-cover"
                        key={index}
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image as File)
                            : (image as string)
                        }
                        alt=""
                      />
                    ))}
                    {/* <Button
                      onClick={() => handleExpandImage(image.data)}
                      className="absolute bottom-0 left-0 hidden rounded-bl-2xl border border-black bg-white px-2 py-0 ring-transparent hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white group-hover:block"
                    >
                      {expandIcon}
                    </Button>
                    <Button
                      onClick={() => handleDeleteImage(image.data, index)}
                      className="absolute bottom-0 right-0 hidden rounded-br-2xl border border-black bg-white px-2 py-0 ring-transparent hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white group-hover:block"
                    >
                      {deleteIcon}
                    </Button> */}
                  </div>
                ))}
              </div>

              {isEditing ? (
                <Button
                  onClick={() =>
                    handleSaveAlbum(editBox.id, editBox.title, editBox.images)
                  }
                  className="rounded-xl border border-black hover:bg-[#4363D2] hover:text-white focus:bg-[#4363D2] focus:text-white"
                >
                  Salve alterações
                </Button>
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
        className={`${isEditing && "blur-md"} mx-auto mt-10 grid w-[90%] gap-4`}
      >
        <div className="grid h-[300px] w-full place-items-center rounded-2xl bg-white text-center text-black">
          <p className="text-2xl">
            <strong>Adicione um novo album clicando em "+"</strong>
          </p>
        </div>
        <div ref={settingsBtnRef} className="grid grid-cols-3 gap-4">
          {albumBoxes.map((box) => (
            <Button
              disabled={isEditing}
              onClick={() => handleEditAlbum(box.id)}
              key={box.id}
              className={`${isEditing && "ring-transparent"} size-[4.5rem] rounded-2xl bg-white text-black`}
            >
              {box.title}
            </Button>
          ))}

          <Button
            disabled={isEditing}
            onClick={handleCreateNewAlbum}
            className={`${isEditing && "ring-transparent"} size-[4.5rem] rounded-2xl bg-white text-black`}
          >
            {plusIcon}
          </Button>
        </div>
      </section>
    </WrapOutlet>
  );
}
