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
import { useThemeContext } from "../../context/ThemeContext";

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

  const { theme } = useThemeContext();
  const intervalIdRef = useRef<number | null>(null);
  const [expandAlbum, setexpandAlbum] = useState(false);

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
    setexpandAlbum(true);
  }, [setexpandAlbum, clearIntervalId]);

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
      className={`${
        editAlbumBoxes.length > 0 && "opacity-70"
      } mx-auto mt-10 grid w-[90%] gap-4`}
    >
      {/* Carousel */}
      <div className="bg-columbia relative flex overflow-hidden rounded-2xl">
        {albumBoxes.some((album) => album.isMain) ? ( // Check if at least one isMain is true
          albumBoxes
            .filter((album) => album.isMain) // Filter which album isMain is true
            .map((album) => (
              <div key={album.id} className="flex w-full rounded-2xl">
                {album.images.length > 0 ? ( // Check if at least one image exist
                  album.images.map((image, index) => (
                    <img
                      key={index}
                      style={{
                        transform: `translateX(-${imageIndex * 100}%)`,
                      }}
                      className="relative min-h-[18.75rem] w-full select-none object-contain transition-transform"
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt=""
                    />
                  ))
                ) : (
                  <p className="text-jet bg-columbia grid h-[300px] place-items-center rounded-2xl px-4 text-center text-2xl">
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
                      className="border-jet text-jet bg-columbia absolute rounded-tl-2xl border text-2xl"
                    >
                      {expandIcon}
                    </Button>

                    {album.images.length !== 1 && (
                      <>
                        <Button
                          onClick={() =>
                            handleCarouselControls("Prev", album.images.length)
                          }
                          className="border-jet text-jet bg-columbia absolute left-2 top-[50%] grid place-items-center rounded-full border px-2 py-1 shadow-md"
                        >
                          {previousIcon}
                        </Button>

                        <Button
                          onClick={() =>
                            handleCarouselControls("Next", album.images.length)
                          }
                          className="border-jet text-jet bg-columbia absolute right-2 top-[50%] grid place-items-center rounded-full border px-2 py-1 shadow-md"
                        >
                          {nextIcon}
                        </Button>
                      </>
                    )}

                    <div className="absolute -left-[50%] bottom-3 mx-auto flex w-full translate-x-1/2 content-center justify-center gap-1">
                      {album.images.map((_, index) => (
                        <Button
                          onClick={() => handleSelectImage(index)}
                          className={`border-jet hover:bg-savoy focus:bg-savoy active:bg-savoy bg-columbia size-4 rounded-full border ${index === imageIndex && "bg-savoy"} `}
                          key={index}
                        >
                          {""}
                        </Button>
                      ))}
                    </div>

                    {expandAlbum && (
                      <div className="bg-jet fixed inset-0 z-50 grid select-none bg-opacity-85">
                        <div className="flex overflow-hidden">
                          {album.images.length > 0 && // Check if at least one image exist
                            album.images.map((image, index) => (
                              <img
                                key={index}
                                draggable="false"
                                style={{
                                  transform: `translateX(-${imageIndex * 100}%)`,
                                }}
                                className="select-none rounded-2xl object-contain transition-transform"
                                src={
                                  image instanceof File
                                    ? URL.createObjectURL(image)
                                    : image
                                }
                                alt=""
                              />
                            ))}
                        </div>

                        <div className="absolute left-[50%] top-28 grid -translate-x-1/2 place-items-center">
                          <Button
                            onClick={() => setexpandAlbum(false)}
                            className={`${theme === "light" && "text-columbia"} rounded-full px-0 py-0 text-4xl leading-3`}
                          >
                            {closeIcon}
                          </Button>
                        </div>

                        {album.images.length !== 1 && (
                          <>
                            <Button
                              onClick={() =>
                                handleCarouselControls(
                                  "Prev",
                                  album.images.length,
                                )
                              }
                              className="border-jet text-jet bg-columbia absolute left-2 top-[50%] grid -translate-y-1/2 transform place-items-center rounded-full border px-3 py-2 shadow-md"
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
                              className="border-jet text-jet bg-columbia absolute right-2 top-[50%] grid -translate-y-1/2 transform place-items-center rounded-full border px-3 py-2 shadow-md"
                            >
                              {nextIcon}
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
        ) : (
          <p className="text-jet bg-columbia grid h-[300px] place-items-center rounded-2xl px-4 text-center text-2xl">
            <strong>Adicione um novo album clicando em "+"</strong>
          </p>
        )}
      </div>

      {/* Grid of album buttons and add button */}
      <div className="flex flex-wrap place-items-start gap-4">
        {albumBoxes.map((album) => (
          <Button
            disabled={editAlbumBoxes.length > 0}
            onClick={() => handleEditAlbum(album.id)}
            key={album.id}
            className={`${
              isEditAlbum && "ring-transparent"
            } text-jet bg-columbia size-[4rem] break-words rounded-2xl leading-5`}
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
          } text-jet bg-columbia size-[4rem] rounded-2xl`}
        >
          {plusIcon}
        </Button>
      </div>
    </section>
  );
}

export default MainAlbumGrid;
