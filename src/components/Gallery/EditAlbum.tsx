import { useRef } from "react";
import useClickOutside from "../../customHooks/useClickOutside";
import { useExpandedImageContext } from "../../context/ExpandedImageContext";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { useThemeContext } from "../../context/ThemeContext";
import EditAlbumBody from "./EditAlbumBody";
import EditAlbumHeader from "./EditAlbumHeader";

export default function EditAlbum() {
  const { theme } = useThemeContext();
  const { editAlbumBoxes, setEditAlbumBoxes, setIsEditAlbum, handleSaveAlbum } =
    useEditAlbumContext();
  const { isExpand } = useExpandedImageContext();

  const editAlbumBoxRef = useRef(null);

  useClickOutside([editAlbumBoxRef], () => {
    if (!isExpand) {
      editAlbumBoxes.forEach((editBox) => handleSaveAlbum(editBox));

      setEditAlbumBoxes([]);
      setIsEditAlbum(false);
    }
  });

  return (
    <section className="mx-auto grid w-[80%] justify-items-center">
      {editAlbumBoxes.map((editBox) => (
        <article
          ref={editAlbumBoxRef}
          key={editBox.id}
          className={`${theme === "light" ? "bg-slate-200" : "bg-jet"} absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl p-4 shadow-2xl`}
        >
          <EditAlbumHeader editBox={editBox} />
          <EditAlbumBody editBox={editBox} />
        </article>
      ))}
    </section>
  );
}
