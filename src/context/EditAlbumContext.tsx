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
  setEditAlbumBoxes: (val: Album[]) => void;
  setIsEditAlbum: (val: boolean) => void;
  isEditAlbum: boolean;
  setAlbumBoxes: (val: Album[]) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
  expandAlbum: boolean;
  setExpandAlbum: (val: boolean) => void;
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
  const [expandAlbum, setExpandAlbum] = useState(false);

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
        expandAlbum,
        setExpandAlbum,
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
