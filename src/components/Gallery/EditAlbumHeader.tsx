import { useCallback } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import Button from "../Button";
import { closeIcon } from "../../utils/icons";
import { useThemeContext } from "../../context/ThemeContext";
import { Album } from "../../utils/types";

export default function EditAlbumHeader({ editBox }: { editBox: Album }) {
  const { setEditAlbumBoxes, setIsEditing, setIsEditAlbum } =
    useEditAlbumContext();
  const { theme } = useThemeContext();

  const handleCloseAlbum = useCallback(
    (id: number) => {
      setEditAlbumBoxes((prev) => prev.filter((album) => album.id !== id));
      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [setIsEditAlbum, setIsEditing],
  );

  const handleAddInputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const value = event.target.value;

      setEditAlbumBoxes((prev) =>
        prev
          .filter((album) => album.id === id)
          .map((album) => ({ ...album, title: value })),
      );

      setIsEditing(true);
    },

    [setEditAlbumBoxes, setIsEditing],
  );

  return (
    <div className="flex items-center gap-5">
      <div>
        <input
          type="text"
          onChange={(event) => handleAddInputTitle(event, editBox.id)}
          className={`w-full bg-inherit text-2xl outline-none`}
          placeholder="Título"
          value={editBox.title}
          autoComplete="off"
          maxLength={12}
          aria-label="Título do album"
          id={`album-title-${editBox.id}`}
          name="albumTitle"
        />
        <div
          className={`${theme === "light" ? "border-jet" : "border-columbia"} rounded-full border`}
        ></div>
      </div>
      <Button
        onClick={() => handleCloseAlbum(editBox.id)}
        className="rounded-full p-0 text-3xl leading-none"
        aria-labelledby="Feche configurações de galeria"
      >
        {closeIcon}
      </Button>
    </div>
  );
}
