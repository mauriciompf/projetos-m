import { useCallback } from "react";
import { useEditAlbumContext } from "./EditAlbumContext";

const { setEditAlbumBoxes } = useEditAlbumContext();

const closeEditAlbum = useCallback(
  (id: number) => {
    return setEditAlbumBoxes((prev) => prev.filter((album) => album.id !== id));
  },
  [setEditAlbumBoxes],
);

export default closeEditAlbum;
