import { createContext, Dispatch, SetStateAction, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import useLocalStorage from "../customHooks/useLocalStorage";
// import isMatchingId from "./isMatchingId";
// import closeEditAlbum from "./closeEditAlbum";
// import uploadValidImage from "./uploadValidImage";

type EditAlbumValues = {
  albumBoxes: Album[];
  editAlbumBoxes: Album[];
  setEditAlbumBoxes: Dispatch<SetStateAction<Album[]>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setAlbumBoxes: Dispatch<SetStateAction<Album[]>>;
  setNextId: Dispatch<SetStateAction<number>>;
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
  expandedImage: Album[];
  setExpandedImage: Dispatch<
    SetStateAction<{ image: string | File; id: number; index: number } | null>
  >;
};

export const EditAlbumContext = createContext<EditAlbumValues | null>(null);

type Album = {
  id: number;
  title: string;
  images: (string | File)[];
};

export default function EditAlbumProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editAlbumBoxes, setEditAlbumBoxes] = useState<Album[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [albumBoxes, setAlbumBoxes] = useLocalStorage<Album[]>({
    key: "albums",
    initialState: [],
  });
  const [nextId, setNextId] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const [expandedImage, setExpandedImage] = useState<{
    image: string | File;
    id: number;
    index: number;
  } | null>(null);

  //   const handleAddInputTitle = (
  //     event: React.ChangeEvent<HTMLInputElement>,
  //     id: number,
  //   ) => {
  //     const value = event.target.value;

  //     setEditAlbumBoxes((prev) =>
  //       prev
  //         .filter(isMatchingId(id))
  //         .map((album) => ({ ...album, title: value })),
  //     );
  //   };

  //   const handleCloseAlbum = (id: number) => {
  //     closeEditAlbum(id);
  //     setIsEditing(false);
  //   };

  //   const handleOnDrop = (event: React.DragEvent, id: number) => {
  //     event.preventDefault(); // Prevent to open the file in the browser
  //     uploadValidImage(event.dataTransfer.files, id);
  //   };

  //   const handleOnDragOver = (event: React.DragEvent) => event.preventDefault();

  //   const handleSaveAlbum = (
  //     id: number,
  //     title: string,
  //     images: (string | File)[],
  //   ) => {
  //     if (!validateInputTitle(title, id)) return;

  //     setAlbumBoxes((prev) =>
  //       prev
  //         .filter(isMatchingId(id))
  //         .map((album) => ({ ...album, title, images })),
  //     );

  //     closeEditAlbum(id);
  //     setIsEditing(false);
  //   };

  //   const handleRemoveAlbum = (id: number, title: string) => {
  //     if (!confirm(`Tem certeza que deseja excluir ${title}?`)) return;

  //     // Remove the album from albumBoxes and reset IDs
  //     setAlbumBoxes((prev) =>
  //       prev
  //         .filter((album) => album.id !== id)
  //         .map((album, index) => ({
  //           ...album,
  //           id: index, // Ensure IDs start from 0 and increment sequentially
  //         })),
  //     );

  //     closeEditAlbum(id);
  //     setNextId((prev) => Math.max(0, prev - 1));
  //     setIsEditing(false);
  //   };

  //   const handleAddNewAlbum = (id: number, title: string) => {
  //     if (!validateInputTitle(title, id)) return;

  //     const boxToAdd = editAlbumBoxes.find(isMatchingId(id)); // Get all the elements of editAlbumBoxes array
  //     if (!boxToAdd) return;

  //     setAlbumBoxes((prev) => [...prev, boxToAdd]);
  //     closeEditAlbum(id);
  //   };

  return (
    <EditAlbumContext.Provider
      value={{
        setEditAlbumBoxes,
        editAlbumBoxes,
        albumBoxes,
        setIsEditing,
        isEditing,
        setAlbumBoxes,
        setNextId,
        isExpand,
        setIsExpand,
      }}
    >
      {children}
    </EditAlbumContext.Provider>
  );
}

export const useEditAlbumContext = () =>
  useCustomHookContext(
    EditAlbumContext,
    "useEditAlbumContext",
    "EditAlbumProvider",
  );
