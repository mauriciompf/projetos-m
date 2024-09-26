import { Album } from "./types";

const validateInputTitle = (
  editAlbumBoxes: Album[],
  title: string,
  id: number,
) => {
  if (!title) {
    alert("Adicione um título para o álbum");
    return;
  }

  const albumTitles = editAlbumBoxes
    .filter((album) => album.id !== id)
    .map((album) => album.title);

  console.log(albumTitles);

  if (albumTitles.includes(title)) {
    alert("Já está criado um álbum com este mesmo nome");
    return;
  }

  return true;
};

export default validateInputTitle;
