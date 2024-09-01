import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import EditAlbum from "../components/AlbumSettings/EditAlbum";
import MainAlbumGrid from "../components/AlbumSettings/MainAlbumGrid";
import { useExpandedImageContext } from "../components/AlbumSettings/ExpandedImageContext";
import ExpandedImage from "../components/AlbumSettings/ExpandedImage";
export default function Gallery() {
  const { isExpand } = useExpandedImageContext();

  return (
    <WrapOutlet projectName={projectList[1].label}>
      {isExpand && <ExpandedImage />}

      <EditAlbum />
      <MainAlbumGrid />
    </WrapOutlet>
  );
}
