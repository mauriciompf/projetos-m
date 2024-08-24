import { useRef, useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import { plusIcon } from "../utils/icons";

export default function Gallery() {
  const settingsBtnRef = useRef(null);

  interface Album {
    id: number;
    title: string;
    images: string[];
  }

  const [albumBoxes, setAlbumBoxes] = useState<Album[]>([]);
  const [editAlbumBoxes, setEditAlbumBoxes] = useState<Album[]>([]);
  const [nextId, setNextId] = useState(0);

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
  };

  const handleOnChange = (
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
  };

  const handleEditAlbum = (id: number) => {
    const albumToEdit = albumBoxes.find((box) => box.id === id);

    if (albumToEdit) {
      setEditAlbumBoxes((prev) => [albumToEdit, ...prev]);
    }
  };

  return (
    <WrapOutlet projectName={projectList[1].label}>
      <section>
        {editAlbumBoxes.map((editBox) => (
          <article
            key={editBox.id}
            className={
              "absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl"
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="text"
                  onChange={(event) => handleOnChange(event, editBox.id)}
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
                className="invisible hidden"
                type="file"
                id="files"
                accept="image/*"
                multiple
              />

              <p className="text-center">
                ou arraste uma imagem, cole imagem ou 
                <Button className="p-0 text-[#4363D2] underline">URL</Button>
              </p>

              <Button
                onClick={() => handleAddNewAlbum(editBox.id)}
                className="rounded-xl border border-black hover:bg-[#4363D2] hover:text-white focus:bg-[#4363D2] focus:text-white"
              >
                Adicionar Novo Álbum
              </Button>

              <Button className="rounded-xl border border-black hover:bg-[#4363D2] hover:text-white focus:bg-[#4363D2] focus:text-white">
                Salve alterações
              </Button>
            </div>
          </article>
        ))}
      </section>

      <section className={`mx-auto mt-10 grid w-[90%] gap-4`}>
        <div className="grid h-[300px] w-full place-items-center rounded-2xl bg-white text-center text-black">
          <p className="text-2xl">
            <strong>Adicione um novo album clicando em "+"</strong>
          </p>
        </div>
        <div ref={settingsBtnRef} className="grid grid-cols-3 gap-4">
          {albumBoxes.map((box) => (
            <Button
              onClick={() => handleEditAlbum(box.id)}
              key={box.id}
              className={`size-[4.5rem] rounded-2xl bg-white text-black`}
            >
              {box.title}
            </Button>
          ))}

          <Button
            onClick={handleCreateNewAlbum}
            className={`size-[4.5rem] rounded-2xl bg-white text-black`}
          >
            {plusIcon}
          </Button>
        </div>
      </section>
    </WrapOutlet>
  );
}
