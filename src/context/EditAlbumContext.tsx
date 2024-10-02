import { createContext, useCallback, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import useLocalStorage from "../customHooks/useLocalStorage";
import { Album, EditAlbumValues } from "../utils/types";
import validateInputTitle from "../utils/validateInputTitle";

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

  const handleSaveAlbum = useCallback(
    ({ title, id, images, isMain }: Album) => {
      if (!validateInputTitle(albumBoxes, title, id)) return;

      setAlbumBoxes((prev) =>
        prev.map(
          (album) =>
            album.id === id
              ? { ...album, title, images, isMain } // Update the album being edited
              : album, // Keep other albums unchanged
        ),
      );

      setImageIndex(0);
      setEditAlbumBoxes([]);
      setIsEditAlbum(false);
      setIsEditing(false);
    },
    [validateInputTitle, setAlbumBoxes, setIsEditAlbum, setIsEditing],
  );

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
        handleSaveAlbum,
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
