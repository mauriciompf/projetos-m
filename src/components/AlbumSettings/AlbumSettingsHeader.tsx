import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
const xMark = <FontAwesomeIcon icon={"fa-solid fa-circle-xmark" as IconProp} />;

type AlbumSetingsHeaderProps = {
  handleToggleAlbumSettings: () => void;
};

export default function AlbumSettingsHeader({
  handleToggleAlbumSettings,
}: AlbumSetingsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <input
          type="text"
          className="w-36 text-2xl outline-none"
          placeholder="Título"
          maxLength={15}
          aria-label="Título do album"
        />
        <div className="rounded-full border border-black"></div>
      </div>
      <Button
        type="submit"
        onClick={handleToggleAlbumSettings}
        className="p-0 text-2xl leading-none ring-transparent hover:text-red-700 focus:text-red-700"
        aria-labelledby="Feche configurações de galeria"
      >
        {xMark}
      </Button>
    </div>
  );
}
