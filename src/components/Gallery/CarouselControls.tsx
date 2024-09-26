import React from "react";
import { expandIcon, nextIcon, previousIcon } from "../../utils/icons";
import Button from "../Button";
import useCarouselNavigation from "../../customHooks/useCarouselNavigation";
import { useEditAlbumContext } from "../../context/EditAlbumContext";

export default function CarouselControls() {
  const { albumBoxes, imageIndex } = useEditAlbumContext();
  const { handleCarouselNavegation, handleExpandAlbum, handleSelectIndex } =
    useCarouselNavigation();

  return albumBoxes
    .filter((album) => album.isMain)
    .map(
      (album) =>
        album.images.length > 0 && (
          <React.Fragment key={album.id}>
            {/* Expand image album button */}
            <Button
              onClick={handleExpandAlbum}
              className="absolute m-2 rounded-xl border border-jet bg-white px-2 text-2xl text-jet transition-opacity group-hover:opacity-100 lg:opacity-0"
            >
              {expandIcon}
            </Button>
            {album.images.length !== 1 && (
              <>
                {/* Navegation */}
                <Button
                  onClick={() => handleCarouselNavegation("Prev")}
                  className="absolute left-2 top-[50%] grid place-items-center rounded-full border border-jet bg-white px-3 py-2 text-jet shadow-md transition-opacity group-hover:opacity-100 min-[425px]:px-4 min-[425px]:py-3 lg:opacity-0"
                >
                  {previousIcon}
                </Button>

                {/* Navegation */}
                <Button
                  onClick={() => handleCarouselNavegation("Next")}
                  className="absolute right-2 top-[50%] grid place-items-center rounded-full border border-jet bg-white px-3 py-2 text-jet shadow-md transition-opacity group-hover:opacity-100 min-[425px]:px-4 min-[425px]:py-3 lg:opacity-0"
                >
                  {nextIcon}
                </Button>

                {/* Image indicator */}
                <div className="absolute -left-[50%] bottom-3 mx-auto flex w-full translate-x-1/2 content-center justify-center gap-1 transition-opacity group-hover:opacity-100 lg:opacity-0">
                  {album.images.map((_, index) => (
                    <Button
                      onClick={() => handleSelectIndex(index)}
                      className={`size-4 rounded-lg border border-jet bg-white hover:bg-savoy ${index === imageIndex && "bg-savoy"} `}
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
