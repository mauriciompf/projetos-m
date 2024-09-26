import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { useThemeContext } from "../../context/ThemeContext";
import useSelectAlbum from "../../customHooks/useSelectAlbum";
import { plusIcon } from "../../utils/icons";
import Button from "../Button";

export default function SelectAlbum() {
  const { editAlbumBoxes, albumBoxes, isEditAlbum } = useEditAlbumContext();
  const { handleEditAlbum, handleCreateNewAlbum } = useSelectAlbum();
  const { theme } = useThemeContext();

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4 pl-4 max-md:justify-center min-[400px]:text-xl md:max-h-[600px] md:overflow-auto md:pt-[4px] min-[1024px]:max-h-[680px] min-[1400px]:w-[440px]">
      {/* Button to open an album */}
      {albumBoxes.map((album) => (
        <Button
          onClick={() => handleEditAlbum(album.id)}
          key={album.id}
          className={`${
            isEditAlbum && "ring-transparent"
          } ${theme === "dark" ? "bg-alt_white" : "bg-slate-300"} size-[4rem] break-words rounded-2xl p-0 leading-5 text-jet min-[400px]:size-[6rem] min-[1400px]:size-[8rem]`}
        >
          {album.title}
        </Button>
      ))}

      {/* Button to create a new album */}
      <Button
        onClick={handleCreateNewAlbum}
        className={`${
          editAlbumBoxes.length > 0 && "ring-transparent"
        } ${theme === "dark" ? "bg-alt_white" : "bg-slate-300"} size-[4rem] rounded-2xl p-0 text-jet min-[400px]:size-[6rem] min-[1400px]:size-[8rem]`}
      >
        {plusIcon}
      </Button>
    </div>
  );
}
