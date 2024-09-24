import React, { useCallback, useEffect } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { expandIcon, nextIcon, previousIcon } from "../../utils/icons";
import Button from "../Button";
import { INTERVALTIME } from "../../utils/constants";
import useCarouselNavigation from "../../customHooks/useCarouselNavigation";

export default function CarouselControls() {
  const { albumBoxes, imageIndex, setImageIndex, setExpandAlbum, expandAlbum } =
    useEditAlbumContext();

  const { clearIntervalId, startInterval, handleCarouselControls } =
    useCarouselNavigation();

  const handleSelectImage = useCallback(
    (index: number) => {
      clearIntervalId();
      setImageIndex(index);
      if (!expandAlbum) {
        setTimeout(startInterval, INTERVALTIME); // Restart interval only if album is not expanded
      }
    },
    [setImageIndex, clearIntervalId, expandAlbum, startInterval],
  );

  const handleExpandAlbum = useCallback(() => {
    clearIntervalId();
    setExpandAlbum(true);
  }, [setExpandAlbum, clearIntervalId]);

  useEffect(() => {
    if (!expandAlbum) {
      startInterval();
    }
    return () => {
      clearIntervalId();
    };
  }, [startInterval, expandAlbum]);

  return albumBoxes
    .filter((album) => album.isMain)
    .map(
      (album) =>
        album.images.length > 0 && (
          <React.Fragment key={album.id}>
            <Button
              onClick={handleExpandAlbum}
              className="absolute m-2 rounded-xl border border-jet bg-white text-2xl text-jet"
            >
              {expandIcon}
            </Button>
            {album.images.length !== 1 && (
              <>
                <Button
                  onClick={() =>
                    handleCarouselControls("Prev", album.images.length)
                  }
                  className="absolute left-2 top-[50%] grid place-items-center rounded-full border border-jet bg-white px-3 py-2 text-jet shadow-md min-[425px]:px-4 min-[425px]:py-3"
                >
                  {previousIcon}
                </Button>

                <Button
                  onClick={() =>
                    handleCarouselControls("Next", album.images.length)
                  }
                  className="absolute right-2 top-[50%] grid place-items-center rounded-full border border-jet bg-white px-3 py-2 text-jet shadow-md min-[425px]:px-4 min-[425px]:py-3"
                >
                  {nextIcon}
                </Button>

                <div className="absolute -left-[50%] bottom-3 mx-auto flex w-full translate-x-1/2 content-center justify-center gap-1">
                  {album.images.map((_, index) => (
                    <Button
                      onClick={() => handleSelectImage(index)}
                      className={`size-4 rounded-full border border-jet bg-white hover:bg-savoy focus:bg-savoy active:bg-savoy ${index === imageIndex && "bg-savoy"} `}
                      key={index}
                    >
                      {""}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </React.Fragment>
        ),
    );
}
