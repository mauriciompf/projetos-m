import { createPortal } from "react-dom";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import Button from "../Button";
import { closeIcon, nextIcon, previousIcon } from "../../utils/icons";
import useClickOutside from "../../customHooks/useClickOutside";
import { useRef } from "react";
import useCarouselNavigation from "../../customHooks/useCarouselNavigation";

export default function ExpandedAlbum() {
  const { imageIndex, albumBoxes, setExpandAlbum, expandAlbum } =
    useEditAlbumContext();

  const { handleCarouselNavegation, startInterval } = useCarouselNavigation();

  const btnPrevRef = useRef(null);
  const btnNextRef = useRef(null);
  const btnCloseRef = useRef(null);

  useClickOutside([btnPrevRef, btnNextRef, btnCloseRef], () =>
    setExpandAlbum(false),
  );

  return (
    expandAlbum &&
    albumBoxes
      .filter((album) => album.isMain)
      .map((album) =>
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-jet bg-opacity-85">
            <div className="relative size-full overflow-hidden">
              {/* Slideshow Container */}
              <div
                className="flex size-full transition-transform ease-in-out"
                style={{
                  transform: `translateX(-${imageIndex * 100}%)`,
                }}
              >
                {album.images.map((image, index) => (
                  <div
                    key={index}
                    className="grid size-full flex-shrink-0 place-items-center"
                  >
                    <img
                      draggable="false"
                      className="min-w-auto h-full min-h-min object-contain"
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt=""
                    />
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <div className="absolute left-[50%] top-28 grid -translate-x-1/2 place-items-center">
                <Button
                  refBtn={btnCloseRef}
                  onClick={() => {
                    setExpandAlbum(false);
                    startInterval();
                  }}
                  className="rounded-full bg-jet px-0 py-0 text-4xl leading-3 text-white shadow-2xl"
                >
                  {closeIcon}
                </Button>
              </div>

              {/* Navigation Controls */}
              {album.images.length > 1 && (
                <>
                  <Button
                    refBtn={btnPrevRef}
                    onClick={() => handleCarouselNavegation("Prev")}
                    className="absolute left-4 top-[50%] -translate-y-1/2 transform rounded-full bg-white px-4 py-2 text-jet shadow-2xl"
                  >
                    {previousIcon}
                  </Button>

                  <Button
                    refBtn={btnNextRef}
                    onClick={() => handleCarouselNavegation("Next")}
                    className="absolute right-4 top-[50%] -translate-y-1/2 transform rounded-full bg-white px-4 py-2 text-jet shadow-2xl"
                  >
                    {nextIcon}
                  </Button>
                </>
              )}
            </div>
          </div>,
          document.body,
        ),
      )
  );
}
