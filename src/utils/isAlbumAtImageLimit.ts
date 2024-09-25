import { ALBUM_IMAGE_LIMIT } from "./constants";
import { Album } from "./types";

const isAlbumAtImageLimit = (editAlbumBoxes: Album[], id: number) => {
  const album = editAlbumBoxes.find((e) => e.id === id);
  if (album!.images.length > ALBUM_IMAGE_LIMIT) {
    alert("Limite de images atingido");
    return true;
  }
  return false;
};
export default isAlbumAtImageLimit;
