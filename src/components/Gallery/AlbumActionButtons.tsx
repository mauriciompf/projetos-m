import { useCallback } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { useThemeContext } from "../../context/ThemeContext";
import Button from "../Button";
import validateInputTitle from "../../utils/validateInputTitle";
import { Album } from "../../utils/types";

export default function AlbumActionButton({ editBox }: { editBox: Album }) {
  const {
    isEditAlbum,
    isEditing,
    albumBoxes,
    editAlbumBoxes,
    setAlbumBoxes,
    setEditAlbumBoxes,
    setIsEditAlbum,
    setIsEditing,
    setImageIndex,
    handleSaveAlbum,
  } = useEditAlbumContext();
  const { theme } = useThemeContext();

  const handleAddNewAlbum = useCallback(
    (id: number, title: string) => {
      if (!validateInputTitle(albumBoxes, title, id)) return;

      const boxToAdd = editAlbumBoxes.find((album) => album.id === id); // Get all the elements of editAlbumBoxes array

      if (!boxToAdd) return;

      setAlbumBoxes((prev) => [...prev, { ...boxToAdd, id: Date.now() }]);

      setEditAlbumBoxes([]);

      setIsEditAlbum(false);
      setIsEditing(false);
      setImageIndex(0);
    },
    [
      albumBoxes,
      editAlbumBoxes,
      setAlbumBoxes,
      setEditAlbumBoxes,
      setIsEditAlbum,
      setIsEditing,
      setImageIndex,
      validateInputTitle,
    ],
  );

  const handleRemoveAlbum = useCallback(
    (id: number, title: string) => {
      if (!confirm(`Tem certeza que deseja excluir ${title}?`)) return;

      setAlbumBoxes((prev) => prev.filter((album) => album.id !== id));

      setEditAlbumBoxes([]);

      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [setAlbumBoxes, setIsEditAlbum, setIsEditing],
  );

  return isEditAlbum ? (
    <>
      <Button
        onClick={() => handleSaveAlbum(editBox)}
        className={`${
          isEditing
            ? "text-alt_white border-transparent bg-dark_spring"
            : theme === "light"
              ? "border-jet"
              : "border-alt_white"
        } hover:text-alt_white focus:text-alt_white rounded-xl border hover:bg-savoy focus:bg-savoy`}
      >
        Salve alterações
      </Button>
      <Button
        onClick={() => handleRemoveAlbum(editBox.id, editBox.title)}
        className={`${
          theme === "light" ? "border-jet" : "border-alt_white"
        } hover:text-alt_white focus:text-alt_white rounded-xl border hover:bg-cornell focus:bg-cornell`}
      >
        Deletar Álbum
      </Button>
    </>
  ) : (
    <Button
      onClick={() => handleAddNewAlbum(editBox.id, editBox.title)}
      className={`${
        theme === "light" ? "border-jet" : "border-alt_white"
      } hover:text-alt_white focus:text-alt_white rounded-xl border hover:bg-savoy focus:bg-savoy`}
    >
      Adicionar Novo Álbum
    </Button>
  );
}
