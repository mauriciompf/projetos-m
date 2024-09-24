import { useEditAlbumContext } from "../../context/EditAlbumContext";
import SelectAlbum from "./SelectAlbum";
import ExpandedAlbum from "./ExpandedAlbum";
import AlbumCarousel from "./AlbumCarousel";

function MainAlbumGrid() {
  const { editAlbumBoxes } = useEditAlbumContext();
  return (
    <section
      className={`${
        editAlbumBoxes.length > 0 && "opacity-5"
      } mx-auto mt-4 grid w-[90%] gap-4 md:flex md:items-start md:justify-center min-[1400px]:mt-10 min-[1400px]:w-[70%]`}
    >
      <AlbumCarousel />
      <SelectAlbum />

      <ExpandedAlbum />
    </section>
  );
}

export default MainAlbumGrid;
