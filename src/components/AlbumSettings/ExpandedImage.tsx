import { useRef } from "react";
import Button from "../Button";
import { closeIcon, deleteIcon } from "../../utils/icons";
import { useExpandedImageContext } from "./ExpandedImageContext";
import useClickOutside from "../../customHooks/useClickOutside";

function ExpandedImage() {
  const extendRef = useRef(null);
  const removeRef = useRef(null);

  const {
    isExpand,
    setIsExpand,
    handleCloseExpandImage,
    handleRemoveImage,
    expandedImage,
  } = useExpandedImageContext();

  useClickOutside([extendRef, removeRef], () => {
    if (isExpand) setIsExpand(false);
  });

  return (
    <section className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black bg-opacity-75">
      {/* Wrapper for the expanded image and its controls */}
      <div>
        {/* Close button for the expanded image */}
        <div className="pb-4">
          <div className="mb-4 grid place-items-center">
            <Button
              onClick={handleCloseExpandImage}
              className="h-[1.875rem] px-0 py-0 text-3xl"
            >
              {closeIcon}
            </Button>
          </div>
          {/* Display the expanded image */}
          <img
            ref={extendRef}
            className="max-h-[80vh] max-w-[90vw] object-contain"
            src={
              expandedImage!.image instanceof File
                ? URL.createObjectURL(expandedImage!.image as File)
                : expandedImage!.image
            }
            alt=""
          />
        </div>

        {/* Button to delete the current expanded image */}
        <div className="flex justify-center pt-6">
          <Button
            refBtn={removeRef}
            onClick={() =>
              handleRemoveImage(expandedImage!.id, expandedImage!.index)
            }
            className="flex items-center gap-2 rounded-2xl bg-white p-2 px-3 text-black hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
          >
            Excluir {deleteIcon}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ExpandedImage;
