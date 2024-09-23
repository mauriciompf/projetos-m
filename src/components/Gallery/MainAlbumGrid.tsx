import { useCallback, useRef, useState } from "react";
import { useEditAlbumContext } from "../../context/EditAlbumContext";
import { INTERVALTIME } from "../../utils/constants";
import SelectAlbum from "./SelectAlbum";
import ExpandedAlbum from "./ExpandedAlbum";
import CarouselControls from "./CarouselControls";

function MainAlbumGrid() {
  const { editAlbumBoxes, albumBoxes, imageIndex, setImageIndex } =
    useEditAlbumContext();

  const intervalIdRef = useRef<number | null>(null);
  const [expandAlbum, setExpandAlbum] = useState(false);

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

  return (
    <section
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
                      className="relative h-full max-h-[38.75rem] w-full flex-shrink-0 transition-transform ease-in-out"
                      style={{
                        transform: `translateX(-${imageIndex * 100}%)`,
                      }}
                      key={index}
                    >
                      <div className={`absolute grid h-full w-full blur-md`}>
                        <img
                          className="h-[38.75rem] w-full scale-100 select-none object-cover"
                          src={
                            image instanceof File
                              ? URL.createObjectURL(image)
                              : image
                          }
                          alt=""
                        />
                      </div>

                      <img
                        className="relative h-full w-full select-none object-contain shadow-2xl"
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

                <CarouselControls
                  clearIntervalId={clearIntervalId}
                  expandAlbum={expandAlbum}
                  setExpandAlbum={setExpandAlbum}
                  startInterval={startInterval}
                  handleCarouselControls={handleCarouselControls}
                />
              </div>
            ))
        ) : (
          <p className="grid h-[300px] place-items-center rounded-2xl bg-columbia px-4 text-center text-2xl text-jet">
            <strong>Adicione um novo album clicando em "+"</strong>
          </p>
        )}
      </div>

      <SelectAlbum />

      <ExpandedAlbum
        expandAlbum={expandAlbum}
        setExpandAlbum={setExpandAlbum}
        handleCarouselControls={handleCarouselControls}
      />
    </section>
  );
}

export default MainAlbumGrid;
