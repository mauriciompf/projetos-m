import { createContext, useCallback, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import { useEditAlbumContext } from "./EditAlbumContext";
import { ExpandedImageValues } from "../utils/types";

export const ExpandedImageContext = createContext<ExpandedImageValues | null>(
  null,
);

export default function ExpandedImageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setEditAlbumBoxes, setIsEditing } = useEditAlbumContext();
  const [isExpand, setIsExpand] = useState(false);
  const [expandedImage, setExpandedImage] = useState<{
    image: string | File;
    id: number;
    index: number;
  } | null>(null);

  const handleRemoveImage = useCallback(
    (id: number, index: number) => {
      setIsExpand(false);
      if (!confirm(`Tem certeza que deseja excluir esta imagem?`)) return;

      setEditAlbumBoxes((prev) =>
        prev
          .filter((album) => album.id === id)
          .map((album) => ({
            ...album,
            images: album.images.filter((_, i) => i !== index),
          })),
      );
      setIsEditing(true);
    },
    [setEditAlbumBoxes, setIsExpand],
  );

  const handleExpandImage = useCallback(
    (image: string | File, id: number, index: number) => {
      setIsExpand(true);
      setExpandedImage({ image, id, index });
    },
    [setIsExpand, setExpandedImage],
  );

  const handleCloseExpandImage = useCallback(
    () => setIsExpand(false),
    [setIsExpand],
  );

  return (
    <ExpandedImageContext.Provider
      value={{
        isExpand,
        setIsExpand,
        expandedImage,
        setExpandedImage,
        handleRemoveImage,
        handleExpandImage,
        handleCloseExpandImage,
      }}
    >
      {children}
    </ExpandedImageContext.Provider>
  );
}

export const useExpandedImageContext = () =>
  useCustomHookContext(
    ExpandedImageContext,
    "useExpandedImageContext",
    "ExpandedImageProvider",
  );
