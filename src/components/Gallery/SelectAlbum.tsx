import { useEditAlbumContext } from "../../context/EditAlbumContext";
import useSelectAlbum from "../../customHooks/useSelectAlbum";
import { plusIcon } from "../../utils/icons";
import Button from "../Button";

export default function SelectAlbum() {
  const { editAlbumBoxes, albumBoxes, isEditAlbum } = useEditAlbumContext();
  const { handleEditAlbum, handleCreateNewAlbum } = useSelectAlbum();

  return (
    <div className="flex flex-wrap items-center gap-2 max-md:justify-center min-[400px]:text-xl md:max-h-[600px] md:overflow-auto md:pt-[4px] min-[1024px]:max-h-[680px] min-[1400px]:w-[430px]">
      {/* Button to open an album */}
      {albumBoxes.map((album) => (
        <Button
          disabled={editAlbumBoxes.length > 0}
          onClick={() => handleEditAlbum(album.id)}
          key={album.id}
          className={`${
            isEditAlbum && "ring-transparent"
          } size-[4rem] break-words rounded-2xl bg-columbia leading-5 text-jet min-[400px]:size-[6rem] min-[1400px]:size-[8rem]`}
        >
          {album.title}
        </Button>
      ))}

      {/* Button to create a new album */}
      <Button
        disabled={editAlbumBoxes.length > 0}
        onClick={handleCreateNewAlbum}
        className={`${
          editAlbumBoxes.length > 0 && "ring-transparent"
        } size-[4rem] rounded-2xl bg-columbia text-jet min-[400px]:size-[6rem] min-[1400px]:size-[8rem]`}
      >
        {plusIcon}
      </Button>
    </div>
  );
}
