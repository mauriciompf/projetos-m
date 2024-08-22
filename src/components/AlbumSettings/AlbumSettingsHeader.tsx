import { useAlbumContext } from "../../context/AlbumContext";
import { closeIcon } from "../../utils/icons";
import Button from "../Button";

export default function AlbumSettingsHeader({}) {
  const { handleToggleAlbumSettings, inputTitle, handleOnChangeTitle } =
    useAlbumContext();

  return (
    <div className="flex items-center justify-between">
      <div>
        <input
          type="text"
          className={`w-36 text-2xl outline-none`}
          placeholder="Título"
          maxLength={15}
          value={inputTitle}
          aria-label="Título do album"
          onChange={handleOnChangeTitle}
        />
        <div className="rounded-full border border-black"></div>
      </div>
      <Button
        onClick={() => handleToggleAlbumSettings(-1)}
        className="p-0 text-2xl leading-none ring-transparent hover:text-red-700 focus:text-red-700"
        aria-labelledby="Feche configurações de galeria"
      >
        {closeIcon}
      </Button>
    </div>
  );
}
