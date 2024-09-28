import { useEditAlbumContext } from "../../context/EditAlbumContext";
import AlbumImageSlider from "./AlbumImageSlider";
import CarouselControls from "./CarouselControls";

export default function AlbumCarousel() {
  const { albumBoxes } = useEditAlbumContext();

  return (
    <div className="relative flex overflow-hidden rounded-2xl bg-alt_white shadow-2xl">
      {albumBoxes.some((album) => album.isMain) ? (
        albumBoxes
          .filter((album) => album.isMain) // Filter which album isMain is true
          .map((album) => (
            <div
              key={album.id}
              className={`${album.images.length < 0 && "flex"} group w-full rounded-2xl md:w-[3000px] min-[1400px]:w-[800px]`}
            >
              <AlbumImageSlider />
              <CarouselControls />
            </div>
          ))
      ) : (
        <p className="grid h-[300px] place-items-center rounded-2xl bg-alt_white px-4 text-center text-2xl text-jet">
          <strong>Adicione um novo album clicando em "+"</strong>
        </p>
      )}
    </div>
  );
}
