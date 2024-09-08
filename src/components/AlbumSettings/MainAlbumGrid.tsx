import { useCallback, useEffect, useRef, useState } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import isMatchingId from "../../utils/isMatchingId";
import { nextIcon, plusIcon, previousIcon } from "../../utils/icons";
import Button from "../Button";
import { INTERVALTIME } from "../../utils/constants";

function MainAlbumGrid() {
  const {
    editAlbumBoxes,
    setEditAlbumBoxes,
    setIsEditAlbum,
    albumBoxes,
    isEditAlbum,
  } = useEditAlbumContext();

  const [imageIndex, setImageIndex] = useState(0);
  const intervalIdRef = useRef<number | null>(null);

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
      setTimeout(startInterval, INTERVALTIME); // After some time, turn carrousel interval
    },
    [clearIntervalId],
  );

  const handleSelectImage = useCallback(
    (index: number) => {
      setImageIndex(index);
      clearIntervalId();
      setTimeout(startInterval, INTERVALTIME);
    },
    [setImageIndex],
  );

  const startInterval = useCallback(() => {
    clearIntervalId();

    intervalIdRef.current = setInterval(() => {
      const album = albumBoxes.find((album) => album.isMain); // Get album which isMain is true

      if (album && album.images.length > 0) {
        handleCarouselControls("Next", album.images.length);
      }
    }, INTERVALTIME);
  }, [albumBoxes, handleCarouselControls, clearIntervalId]);

  useEffect(() => {
    startInterval();
    return () => {
      clearIntervalId();
    };
  }, [startInterval]);

  return (
    <section
      className={`${
        editAlbumBoxes.length > 0 && "blur-md"
      } mx-auto mt-10 grid w-[90%] gap-4`}
    >
      {/* Carousel */}
      <div className="relative flex overflow-hidden">
        {albumBoxes.some((album) => album.isMain) ? ( // Check if at least one isMain is true
          albumBoxes
            .filter((album) => album.isMain) // Filter which album isMain is true
            .map((album) => (
              <div key={album.id} className="flex w-full">
                {album.images.length > 0 ? ( // Check if at least one image exist
                  album.images.map((image, index) => (
                    <img
                      key={index}
                      style={{
                        transform: `translateX(-${imageIndex * 100}%)`,
                      }}
                      className="relative h-full w-full select-none rounded-2xl object-cover transition-transform"
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt=""
                    />
                  ))
                ) : (
                  <p className="grid h-[300px] place-items-center rounded-2xl bg-white px-4 text-center text-2xl text-black">
                    <strong>
                      Adicione imagens dentro do álbum para visualizá-las por
                      aqui, ou crie um novo álbum clicando em "+"
                    </strong>
                  </p>
                )}

                <Button
                  onClick={() =>
                    handleCarouselControls("Prev", album.images.length)
                  }
                  className="absolute left-2 top-[50%] grid place-items-center rounded-full border border-black bg-white px-2 py-1 text-black shadow-md"
                >
                  {previousIcon}
                </Button>

                <Button
                  onClick={() =>
                    handleCarouselControls("Next", album.images.length)
                  }
                  className="absolute right-2 top-[50%] grid place-items-center rounded-full border border-black bg-white px-2 py-1 text-black shadow-md"
                >
                  {nextIcon}
                </Button>

                <div className="absolute bottom-4 left-[25%] flex gap-4">
                  {album.images.length > 0 &&
                    album.images.map((_, index) => (
                      <Button
                        onClick={() => handleSelectImage(index)}
                        className={`grid size-4 place-items-center rounded-full border border-black bg-white text-sm text-black hover:bg-[#4363D2] focus:bg-[#4363D2] active:bg-[#4363D2] ${index === imageIndex && "bg-[#4363D2]"} `}
                        key={index}
                      >
                        {""}
                      </Button>
                    ))}
                </div>
              </div>
            ))
        ) : (
          <p className="grid h-[300px] place-items-center rounded-2xl bg-white px-4 text-center text-2xl text-black">
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
            } size-[4rem] rounded-2xl bg-white text-black`}
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
          } size-[4rem] rounded-2xl bg-white text-black`}
        >
          {plusIcon}
        </Button>
      </div>
    </section>
  );
}

export default MainAlbumGrid;
