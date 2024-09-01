import { useCallback, useRef } from "react";
import { closeIcon } from "../../utils/icons";
import Button from "../Button";
import BodyAlbumSettings from "./BodyAlbumSettings";
import useClickOutside from "../../customHooks/useClickOutside";
import { useExpandedImageContext } from "./ExpandedImageContext";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import useAlbumEditor from "../../customHooks/useAlbumEditor";

function EditAlbum() {
  const settingsAlbumRef = useRef(null);

  const { editAlbumBoxes } = useEditAlbumContext();
  const { isExpand } = useExpandedImageContext();
  const {
    handleAddInputTitle,
    handleCloseAlbum,
    handleSaveAlbum,
    handleClickOutside,
  } = useAlbumEditor();

  useClickOutside(
    [settingsAlbumRef],
    useCallback(() => {
      if (!isExpand) handleClickOutside();
    }, [isExpand, handleClickOutside]),
  );

  return (
    <section>
      {editAlbumBoxes.map((editBox) => (
        <article
          ref={settingsAlbumRef}
          key={editBox.id}
          className="absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl"
        >
          {/* Header with title input and close button for album settings */}
          <div className="flex items-center justify-between">
            <div>
              <input
                type="text"
                onChange={(event) => handleAddInputTitle(event, editBox.id)}
                className="w-36 text-2xl outline-none"
                placeholder="Título"
                value={editBox.title}
                autoComplete="off"
                maxLength={15}
                aria-label="Título do album"
                id={`album-title-${editBox.id}`}
                name="albumTitle"
              />
              <div className="rounded-full border border-black"></div>
            </div>
            <Button
              onClick={() => handleCloseAlbum(editBox.id)}
              className="p-0 text-2xl leading-none ring-transparent hover:text-red-700 focus:text-red-700"
              aria-labelledby="Feche configurações de galeria"
            >
              {closeIcon}
            </Button>
          </div>

          <BodyAlbumSettings
            handleSaveAlbum={handleSaveAlbum}
            editBox={editBox}
          />
        </article>
      ))}
    </section>
  );
}

export default EditAlbum;
