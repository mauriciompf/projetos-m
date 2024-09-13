import { useCallback, useEffect, useRef, useState } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import isMatchingId from "../../utils/isMatchingId";
import {
  closeIcon,
  expandIcon,
  nextIcon,
  plusIcon,
  previousIcon,
} from "../../utils/icons";
import Button from "../Button";
import { INTERVALTIME } from "../../utils/constants";
import { createPortal } from "react-dom";

function MainAlbumGrid() {
  const {
    editAlbumBoxes,
    setEditAlbumBoxes,
    setIsEditAlbum,
    albumBoxes,
    isEditAlbum,
    imageIndex,
    setImageIndex,
  } = useEditAlbumContext();

  const intervalIdRef = useRef<number | null>(null);
  const [expandAlbum, setExpandAlbum] = useState(false);
  const mainSectionRef = useRef(null);

  const clearIntervalId = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
  };

  const handleCreateNewAlbum = useCallback(() => {
    setEditAlbumBoxes((prev) => [
      {
        id: Date.now(),
        title: "",
        images: [],
        isMain: false,
      },
      ...prev,
    ]);

    setIsEditAlbum(false);
    // setImageIndex(0);
  }, [setIsEditAlbum, setEditAlbumBoxes]);

  const handleEditAlbum = useCallback(
    (id: number) => {
      const albumToEdit = albumBoxes.find(isMatchingId(id)); // Get all the elements of AlbumBoxes array
      if (!albumToEdit) return;

      setEditAlbumBoxes((prev) => [...prev, albumToEdit]);
      setIsEditAlbum(true);
    },
    [albumBoxes, isMatchingId, setEditAlbumBoxes, setIsEditAlbum],
  );

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
        // Restart interval only if album is not expanded
        setTimeout(startInterval, INTERVALTIME);
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

  return (
    <section
      ref={mainSectionRef}
      className={`${
        editAlbumBoxes.length > 0 && "opacity-70"
      } mx-auto mt-4 grid w-[90%] gap-4 md:flex md:items-start md:justify-center min-[1400px]:mt-10 min-[1400px]:w-[70%]`}
    >
      {/* Carousel */}
      <div className="relative flex overflow-hidden rounded-2xl bg-columbia">
        {albumBoxes.some((album) => album.isMain) ? ( // Check if at least one isMain is true
          albumBoxes
            .filter((album) => album.isMain) // Filter which album isMain is true
            .map((album) => (
              <div
                key={album.id}
                className="flex w-full rounded-2xl md:w-[3000px] min-[1400px]:w-[650px]"
              >
                {album.images.length > 0 ? ( // Check if at least one image exist
                  album.images.map((image, index) => (
                    <div
                      className="h-full max-h-[38.75rem] w-full flex-shrink-0 transition-transform ease-in-out"
                      style={{
                        transform: `translateX(-${imageIndex * 100}%)`,
                      }}
                      key={index}
                    >
                      <img
                        className="relative h-full w-full select-none object-contain"
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : image
                        }
                        alt=""
                      />
                    </div>
                  ))
                ) : (
                  <p className="grid h-[300px] place-items-center rounded-2xl bg-columbia px-4 text-center text-2xl text-jet">
                    <strong>
                      Adicione imagens dentro do álbum para visualizá-las por
                      aqui, ou crie um novo álbum clicando em "+"
                    </strong>
                  </p>
                )}

                {album.images.length > 0 && (
                  <>
                    <Button
                      onClick={handleExpandAlbum}
                      className="absolute rounded-tl-2xl border border-jet bg-columbia text-2xl text-jet"
                    >
                      {expandIcon}
                    </Button>

                    {album.images.length !== 1 && (
                      <>
                        <Button
                          onClick={() =>
                            handleCarouselControls("Prev", album.images.length)
                          }
                          className="absolute left-2 top-[50%] grid place-items-center rounded-full border border-jet bg-columbia px-3 py-2 text-jet shadow-md min-[425px]:px-4 min-[425px]:py-3"
                        >
                          {previousIcon}
                        </Button>

                        <Button
                          onClick={() =>
                            handleCarouselControls("Next", album.images.length)
                          }
                          className="absolute right-2 top-[50%] grid place-items-center rounded-full border border-jet bg-columbia px-3 py-2 text-jet shadow-md min-[425px]:px-4 min-[425px]:py-3"
                        >
                          {nextIcon}
                        </Button>

                        <div className="absolute -left-[50%] bottom-3 mx-auto flex w-full translate-x-1/2 content-center justify-center gap-1">
                          {album.images.map((_, index) => (
                            <Button
                              onClick={() => handleSelectImage(index)}
                              className={`size-4 rounded-full border border-jet bg-columbia hover:bg-savoy focus:bg-savoy active:bg-savoy ${index === imageIndex && "bg-savoy"} `}
                              key={index}
                            >
                              {""}
                            </Button>
                          ))}
                        </div>
                      </>
                    )}

                    {expandAlbum &&
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
                                  className="size-full flex-shrink-0"
                                >
                                  <img
                                    draggable="false"
                                    className="size-full object-contain"
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
                                onClick={() => setExpandAlbum(false)}
                                className="rounded-full bg-jet px-0 py-0 text-4xl leading-3 text-columbia"
                              >
                                {closeIcon}
                              </Button>
                            </div>

                            {/* Navigation Controls */}
                            {album.images.length > 1 && (
                              <>
                                <Button
                                  onClick={() =>
                                    handleCarouselControls(
                                      "Prev",
                                      album.images.length,
                                    )
                                  }
                                  className="absolute left-4 top-[50%] -translate-y-1/2 transform rounded-full bg-columbia px-4 py-2 text-jet shadow-md"
                                >
                                  {previousIcon}
                                </Button>

                                <Button
                                  onClick={() =>
                                    handleCarouselControls(
                                      "Next",
                                      album.images.length,
                                    )
                                  }
                                  className="absolute right-4 top-[50%] -translate-y-1/2 transform rounded-full bg-columbia px-4 py-2 text-jet shadow-md"
                                >
                                  {nextIcon}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>,
                        document.body,
                      )}
                  </>
                )}
              </div>
            ))
        ) : (
          <p className="grid h-[300px] place-items-center rounded-2xl bg-columbia px-4 text-center text-2xl text-jet">
            <strong>Adicione um novo album clicando em "+"</strong>
          </p>
        )}
      </div>

      {/* Grid of album buttons and add button */}
      <div className="flex flex-wrap items-center gap-2 min-[400px]:text-xl md:max-h-[500px] md:justify-center md:pt-[4px] min-[1024px]:max-h-[680px]">
        {albumBoxes.map((album) => (
          <Button
            disabled={editAlbumBoxes.length > 0}
            onClick={() => handleEditAlbum(album.id)}
            key={album.id}
            className={`${
              isEditAlbum && "ring-transparent"
            } size-[4rem] break-words rounded-2xl bg-columbia leading-5 text-jet min-[400px]:size-[6rem] min-[1400px]:size-[8rem]`}
          >
            {album.title}
          </Button>
        ))}

        {/* Button to create a new album */}
        <Button
          disabled={editAlbumBoxes.length > 0}
          onClick={handleCreateNewAlbum}
          className={`${
            editAlbumBoxes.length > 0 && "ring-transparent"
          } size-[4rem] rounded-2xl bg-columbia text-jet min-[400px]:size-[6rem] min-[1400px]:size-[8rem]`}
        >
          {plusIcon}
        </Button>
      </div>
    </section>
  );
}

export default MainAlbumGrid;
