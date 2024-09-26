import React, { useCallback } from "react";
import { useExpandedImageContext } from "../../context/ExpandedImageContext";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import isAlbumAtImageLimit from "../../utils/isAlbumAtImageLimit";
import AlbumActionButton from "./AlbumActionButtons";
import UploadedImages from "./UploadedImages";
import ImageUploadInput from "./ImageUploadInput";
import MainAlbumSelector from "./MainAlbumSelector";
import uploadValidImage from "../../utils/uploadValidImage";
import { Album } from "../../utils/types";

export default function EditAlbumBody({ editBox }: { editBox: Album }) {
  const { setEditAlbumBoxes, editAlbumBoxes, setIsEditing } =
    useEditAlbumContext();
  const { handleRemoveImage, handleExpandImage } = useExpandedImageContext();

  const handleOnDrop = useCallback(
    (event: React.DragEvent, id: number) => {
      event.preventDefault(); // Prevent to open the file in the browser
      if (isAlbumAtImageLimit(editAlbumBoxes, id)) return;
      uploadValidImage(setEditAlbumBoxes, event.dataTransfer.files, id);
      setIsEditing(true);
    },
    [uploadValidImage, setIsEditing],
  );

  const handleOnDragOver = useCallback(
    (event: React.DragEvent) => event.preventDefault(),
    [],
  );

  return (
    <div
      onDrop={(event) => handleOnDrop(event, editBox.id)}
      onDragOver={handleOnDragOver}
      className="grid gap-4"
    >
      <MainAlbumSelector />

      <ImageUploadInput editBox={editBox} />

      <UploadedImages
        handleExpandImage={handleExpandImage}
        handleRemoveImage={handleRemoveImage}
      />

      <AlbumActionButton editBox={editBox} />
    </div>
  );
}
