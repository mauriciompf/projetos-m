import { useCallback, useRef } from "react";
import { INTERVALTIME } from "../utils/constants";
import { useEditAlbumContext } from "../context/EditAlbumContext";

const useCarouselNavigation = () => {
  const { albumBoxes, setImageIndex, expandAlbum } = useEditAlbumContext();

  const intervalIdRef = useRef<number | null>(null);

  const clearIntervalId = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
  };

  const handleCarouselControls = useCallback(
    (controlButton: string, imagesLength: number) => {
      const increaseIndex = (prev: number) =>
        (prev + 1) % // Increment the current index
        imagesLength; // Loop back to the start when reaching the end

      const decreaseIndex = (prev: number) =>
        (prev -
          1 + // Decrement the current index
          imagesLength) % // Ensure positive index even when wrapping around (< 0)
        imagesLength;

      if (controlButton === "Next") {
        setImageIndex(increaseIndex);
      } else if (controlButton === "Prev") {
        setImageIndex(decreaseIndex);
      }

      clearIntervalId(); // Clear interval when clicked
      if (!expandAlbum) {
        setTimeout(startInterval, INTERVALTIME); // Restart interval only if album is not expanded
      }
    },
    [clearIntervalId],
  );

  const startInterval = useCallback(() => {
    clearIntervalId();

    if (!expandAlbum) {
      intervalIdRef.current = setInterval(() => {
        const album = albumBoxes.find((album) => album.isMain); // Get album which isMain is true

        if (album && album.images.length > 0) {
          handleCarouselControls("Next", album.images.length);
        }
      }, INTERVALTIME);
    }
  }, [albumBoxes, handleCarouselControls, clearIntervalId]);

  return { handleCarouselControls, clearIntervalId, startInterval };
};

export default useCarouselNavigation;
