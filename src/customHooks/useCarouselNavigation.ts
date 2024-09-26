import { useCallback, useEffect, useRef } from "react";
import { INTERVALTIME } from "../utils/constants";
import { useEditAlbumContext } from "../context/EditAlbumContext";

const useCarouselNavigation = () => {
  const { albumBoxes, setImageIndex, expandAlbum, setExpandAlbum } = useEditAlbumContext();

  const intervalIdRef = useRef<number | null>(null); // Hold the value to start and clear

  const clearIntervalId = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current); // Stop looping until the interval time
  };

  const imagesLength = albumBoxes.find((album) => album.isMain)?.images.length; // Get the total of imagens in main album

  const handleCarouselNavegation = useCallback(
    (controlButton: string) => {
      clearIntervalId();

      setImageIndex((prev) => {
        if (controlButton === "Next") {
          return (prev + 1) % imagesLength!; // Increment the current index
        } else if (controlButton === "Prev") {
          return (prev - 1 + imagesLength!) % imagesLength!; // Decrement and wrap around
        }
        return prev;
      });
    },
    [clearIntervalId],
  );

  // Loop slide show carousel
  const startInterval = useCallback(() => {
    clearIntervalId();

    if (expandAlbum) return; // STOP looping when expand

    // Only if the image album is not expanded
    intervalIdRef.current = setInterval(() => {
      const album = albumBoxes.find((album) => album.isMain);

      if (album && album.images.length > 0) {
        handleCarouselNavegation("Next");
      }
    }, INTERVALTIME);
  }, [albumBoxes, handleCarouselNavegation, clearIntervalId]);

  
  const handleSelectIndex = useCallback(
    (index: number) => {
      clearIntervalId();
      setImageIndex(index);
    },
    [setImageIndex, clearIntervalId, expandAlbum, startInterval],
  );

  const handleExpandAlbum = useCallback(() => {
    clearIntervalId();
    setExpandAlbum(true);
  }, [setExpandAlbum, clearIntervalId]);

  useEffect(() => {
    if (!expandAlbum) startInterval();

    return () => clearIntervalId();
  }, [startInterval, expandAlbum]);

  return { handleCarouselNavegation, handleExpandAlbum, handleSelectIndex, clearIntervalId, startInterval };
};

export default useCarouselNavigation;
