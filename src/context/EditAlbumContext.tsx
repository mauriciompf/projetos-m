import { createContext, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import useLocalStorage from "../customHooks/useLocalStorage";
import { Album, EditAlbumValues } from "../utils/types";

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
