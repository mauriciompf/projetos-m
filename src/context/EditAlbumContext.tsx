import { createContext, Dispatch, SetStateAction, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import useLocalStorage from "../customHooks/useLocalStorage";

type Album = {
  id: number;
  title: string;
  images: (string | File)[];
  isMain: boolean;
};

type EditAlbumValues = {
  albumBoxes: Album[];
  editAlbumBoxes: Album[];
  setEditAlbumBoxes: Dispatch<SetStateAction<Album[]>>;
  setIsEditAlbum: Dispatch<SetStateAction<boolean>>;
  isEditAlbum: boolean;
  setAlbumBoxes: Dispatch<SetStateAction<Album[]>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
};

export const EditAlbumContext = createContext<EditAlbumValues | null>(null);

export default function EditAlbumProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editAlbumBoxes, setEditAlbumBoxes] = useState<Album[]>([]);
  const [isEditAlbum, setIsEditAlbum] = useState(false);
  const [albumBoxes, setAlbumBoxes] = useLocalStorage<Album[]>({
    key: "albums",
    initialState: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <EditAlbumContext.Provider
      value={{
        setEditAlbumBoxes,
        editAlbumBoxes,
        albumBoxes,
        setIsEditAlbum,
        isEditAlbum,
        setAlbumBoxes,
        isEditing,
        setIsEditing,
        imageIndex,
        setImageIndex,
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
