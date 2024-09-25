import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import EditAlbum from "../components/Gallery/EditAlbum";
import MainAlbumGrid from "../components/Gallery/MainAlbumGrid";
import { useExpandedImageContext } from "../context/ExpandedImageContext";
import ExpandedImage from "../components/Gallery/ExpandedImage";
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
