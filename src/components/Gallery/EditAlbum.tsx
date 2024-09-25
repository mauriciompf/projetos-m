import { useRef } from "react";
import { closeIcon } from "../../utils/icons";
import Button from "../Button";
import BodyAlbumSettings from "./BodyAlbumSettings";
import useClickOutside from "../../customHooks/useClickOutside";
import { useExpandedImageContext } from "../../context/ExpandedImageContext";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import useAlbumEditor from "../../customHooks/useAlbumEditor";
import { useThemeContext } from "../../context/ThemeContext";

export default function EditAlbum() {
  const { theme } = useThemeContext();
  const { editAlbumBoxes } = useEditAlbumContext();
  const { isExpand } = useExpandedImageContext();
  const {
    handleAddInputTitle,
    handleCloseAlbum,
    handleSaveAlbum,
    handleClickOutside,
  } = useAlbumEditor();

  const editAlbumBoxRef = useRef(null);

  useClickOutside([editAlbumBoxRef], () => {
    if (!isExpand) handleClickOutside();
  });

  return (
    <section className="mx-auto grid w-[80%] justify-items-center">
      {editAlbumBoxes.map((editBox) => (
        <article
          ref={editAlbumBoxRef}
          key={editBox.id}
          className={`${theme === "light" ? "bg-columbia" : "bg-jet"} absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl p-4`}
        >
          {/* Header with title input and close button */}
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

          <BodyAlbumSettings
            handleSaveAlbum={handleSaveAlbum}
            editBox={editBox}
          />
        </article>
      ))}
    </section>
  );
}
