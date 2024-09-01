import { createContext, Dispatch, SetStateAction, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import useLocalStorage from "../customHooks/useLocalStorage";

type EditAlbumValues = {
  albumBoxes: Album[];
  editAlbumBoxes: Album[];
  setEditAlbumBoxes: Dispatch<SetStateAction<Album[]>>;
  setisEditAlbum: Dispatch<SetStateAction<boolean>>;
  isEditAlbum: boolean;
  setAlbumBoxes: Dispatch<SetStateAction<Album[]>>;
  nextId: number;
  setNextId: Dispatch<SetStateAction<number>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
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
  const [isEditAlbum, setisEditAlbum] = useState(false);
  const [albumBoxes, setAlbumBoxes] = useLocalStorage<Album[]>({
    key: "albums",
    initialState: [],
  });
  const [nextId, setNextId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EditAlbumContext.Provider
      value={{
        setEditAlbumBoxes,
        editAlbumBoxes,
        albumBoxes,
        setisEditAlbum,
        isEditAlbum,
        setAlbumBoxes,
        nextId,
        setNextId,
        isEditing,
        setIsEditing,
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
