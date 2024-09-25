import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { useThemeContext } from "../../context/ThemeContext";
import Button from "../Button";

// FIXME any
export default function AlbumActionButton({
  editBox,
  handleSaveAlbum,
  handleRemoveAlbum,
  handleAddNewAlbum,
}: any) {
  const { isEditAlbum, isEditing } = useEditAlbumContext();
  const { theme } = useThemeContext();

  return isEditAlbum ? (
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
        className={`${
          isEditing
            ? "border-transparent bg-dark_spring text-columbia"
            : theme === "light"
              ? "border-jet"
              : "border-columbia"
        } rounded-xl border hover:bg-savoy hover:text-columbia focus:bg-savoy focus:text-columbia`}
      >
        Salve alterações
      </Button>
      <Button
        onClick={() => handleRemoveAlbum(editBox.id, editBox.title)}
        className={`${
          theme === "light" ? "border-jet" : "border-columbia"
        } rounded-xl border hover:bg-cornell hover:text-columbia focus:bg-cornell focus:text-columbia`}
      >
        Deletar Álbum
      </Button>
    </>
  ) : (
    <Button
      onClick={() => handleAddNewAlbum(editBox.id, editBox.title)}
      className={`${
        theme === "light" ? "border-jet" : "border-columbia"
      } rounded-xl border hover:bg-savoy hover:text-columbia focus:bg-savoy focus:text-columbia`}
    >
      Adicionar Novo Álbum
    </Button>
  );
}
