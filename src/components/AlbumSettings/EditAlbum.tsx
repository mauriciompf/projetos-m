import { useCallback, useRef } from "react";
import { closeIcon } from "../../utils/icons";
import Button from "../Button";
import BodyAlbumSettings from "./BodyAlbumSettings";
import useClickOutside from "../../customHooks/useClickOutside";
import { useExpandedImageContext } from "./ExpandedImageContext";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import useAlbumEditor from "../../customHooks/useAlbumEditor";
import { useThemeContext } from "../../context/ThemeContext";

function EditAlbum() {
  const settingsAlbumRef = useRef(null);

  const { theme } = useThemeContext();
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
          className={`${theme === "light" ? "bg-columbia" : "bg-jet"} absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl p-4`}
        >
          {/* Header with title input and close button for album settings */}
          <div className="flex items-center justify-between">
            <div>
              <input
                type="text"
                onChange={(event) => handleAddInputTitle(event, editBox.id)}
                className={`w-36 bg-inherit text-2xl outline-none`}
                placeholder="Título"
                value={editBox.title}
                autoComplete="off"
                maxLength={10}
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
