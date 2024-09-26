import { ChangeEvent, useCallback } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { Album } from "../../utils/types";

export default function MainAlbumSelector() {
  const {
    editAlbumBoxes,
    setEditAlbumBoxes,
    setAlbumBoxes,
    setIsEditing,
    setImageIndex,
  } = useEditAlbumContext();

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

  return editAlbumBoxes.map((editBox) => (
    <label
      key={editBox.id}
      className="flex cursor-pointer select-none gap-1 font-bold leading-4 tracking-tight hover:underline focus:underline"
      htmlFor={`mainAlbum-${editBox.id}`}
    >
      <span className="sr-only">Adicionar álbum em visualização principal</span>
      <input
        onChange={(event) => handleAddMainAlbum(event, editBox.id)}
        type="checkbox"
        id={`mainAlbum-${editBox.id}`}
        className="w-8 cursor-pointer accent-savoy"
        checked={editBox.isMain}
      />
      <span>Album principal</span>
    </label>
  ));
}
