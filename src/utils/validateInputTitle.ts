import { Album } from "./types";

const validateInputTitle = (albumBoxes: Album[], title: string, id: number) => {
  if (!title) {
    alert("Adicione um título para o álbum");
    return;
  }

  const AlbumTitles = albumBoxes
    .filter((album) => album.id !== id)
    .map((album) => album.title);
  // Prevent insert the title again
  if (AlbumTitles.includes(title)) {
    alert("Já está criado um álbum com este mesmo nome");
    return;
  }

  return true;
};

export default validateInputTitle;
