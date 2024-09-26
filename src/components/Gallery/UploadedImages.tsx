import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { useExpandedImageContext } from "../../context/ExpandedImageContext";
import { useThemeContext } from "../../context/ThemeContext";
import { deleteIcon, expandIcon } from "../../utils/icons";
import Button from "../Button";

export default function UploadedImages() {
  const { editAlbumBoxes } = useEditAlbumContext();
  const { theme } = useThemeContext();
  const { handleExpandImage, handleRemoveImage } = useExpandedImageContext();

  return (
    <div className="max-h-52 select-none overflow-y-auto">
      {editAlbumBoxes.map((editBox, index) => (
        <div
          key={index}
          className="mx-auto grid grid-cols-2 place-items-center justify-center gap-y-4 min-[400px]:grid-cols-3"
        >
          {editBox.images.map((image, index) => {
            return (
              <div key={index} className="group relative">
                {/* Display each image */}
                <img
                  draggable="false"
                  className="size-20 rounded-xl object-cover"
                  src={
                    image instanceof File
                      ? URL.createObjectURL(image as File)
                      : (image as string)
                  }
                  alt=""
                />

                {/* Button to expand the image */}
                <Button
                  onClick={() => handleExpandImage(image, editBox.id, index)}
                  className={`${theme === "light" ? "bg-alt_white" : "bg-jet"} hover:text-alt_white focus:text-alt_white absolute bottom-0 left-0 hidden rounded-bl-2xl px-2 py-0 ring-transparent hover:bg-blue-600 focus:bg-blue-600 group-hover:block`}
                >
                  {expandIcon}
                </Button>

                {/* Button to delete the image */}
                <Button
                  onClick={() => handleRemoveImage(editBox.id, index)}
                  className={`${theme === "light" ? "bg-alt_white" : "bg-jet"} hover:text-alt_white focus:text-alt_white absolute bottom-0 right-0 hidden rounded-br-xl px-2 py-0 ring-transparent hover:bg-cornell focus:bg-cornell group-hover:block`}
                >
                  {deleteIcon}
                </Button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
