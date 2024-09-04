import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import useCustomHookContext from "../../customHooks/useCustomHookContext";
import isMatchingId from "../../utils/isMatchingId";
import { useEditAlbumContext } from "../../context/EditAlbumContext";

type EditAlbumValues = {
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
  expandedImage: { image: string | File; id: number; index: number } | null;
  setExpandedImage: Dispatch<
    SetStateAction<{ image: string | File; id: number; index: number } | null>
  >;
  handleRemoveImage: (id: number, index: number) => void;
  handleExpandImage: (image: string | File, id: number, index: number) => void;
  handleCloseExpandImage: () => void;
};

export const ExpandedImageContext = createContext<EditAlbumValues | null>(null);

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
        prev.filter(isMatchingId(id)).map((album) => ({
          ...album,
          images: album.images.filter((_, i) => i !== index),
        })),
      );
      setIsEditing(true);
    },
    [setEditAlbumBoxes, setIsExpand, isMatchingId],
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
