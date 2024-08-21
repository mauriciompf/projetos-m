import { useRef, useState } from "react";
import Button from "../components/Button";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import useClickOutside from "../customHooks/useClickOutside";
import AlbumSettings from "../components/AlbumSettings/AlbumSettings";
import { useAlbumSettings } from "../context/AlbumSettingsContext";
import { closeIcon, deleteIcon, plusIcon } from "../utils/icons";

export default function Gallery() {
  const [toggleAlbum, setToggleAlbum] = useState(false);
  const [albums, setAlbums] = useState([{ title: "", images: [] }]);
  const [isAlbumCreated, setIsAlbumCreated] = useState(false);

  const settingsBtnRef = useRef(null);
  const settingsRef = useRef(null);
  const extendRef = useRef(null);
  const deleteBtnRef = useRef(null);

  const { toggleScreen, setToggleScreen, getImage, images, handleDeleteImage } =
    useAlbumSettings();

  const handleToggleAlbumSettings = () => {
    setToggleAlbum(!toggleAlbum);
    setIsAlbumCreated(false);
  };

  albums.forEach((album) => {
    console.log(album);
  });

  // Close album settings when clicking outside, only if toggleScreen is false
  useClickOutside([settingsRef, settingsBtnRef], () => {
    if (!toggleScreen) setToggleAlbum(false);
  });

  // Close modal when clicking outside, only if toggleScreen is true
  useClickOutside([extendRef, deleteBtnRef], () => {
    if (toggleScreen) setToggleScreen(false);
  });

  // Handle both File and URL string cases
  const selectedImageName = getImage instanceof File ? getImage.name : getImage;
  const selectedImageIndex = images
    .map((img) => (img.data instanceof File ? img.data.name : img.data))
    .findIndex((elem) => elem === selectedImageName);

  return (
    <WrapOutlet projectName={projectList[1].label}>
      {toggleScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div>
            <div className="flex justify-center pb-4">
              <Button
                onClick={() => setToggleScreen(!toggleScreen)}
                className="h-[1.875rem] px-0 py-0 text-3xl"
              >
                {closeIcon}
              </Button>
            </div>
            <img
              ref={extendRef}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              src={
                getImage instanceof File
                  ? URL.createObjectURL(getImage as File)
                  : (getImage as string)
              }
              alt=""
            />

            <div className="flex justify-center pt-6">
              <Button
                refBtn={deleteBtnRef}
                onClick={() => handleDeleteImage(getImage, selectedImageIndex)}
                className="flex items-center gap-2 rounded-2xl bg-white p-2 px-3 text-black hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
              >
                Excluir {deleteIcon}
              </Button>
            </div>
          </div>
        </div>
      )}
      <AlbumSettings
        isAlbumCreated={isAlbumCreated}
        setIsAlbumCreated={setIsAlbumCreated}
        className={`${!toggleAlbum && "hidden"}`}
        refWrap={settingsRef}
        setAlbums={setAlbums}
        handleAlbumSettingsBtn={handleToggleAlbumSettings}
      />

      <section
        className={`${toggleAlbum && "blur-lg"} mx-auto mt-10 grid w-[90%] gap-4`}
      >
        <div className="h-[300px] w-full rounded-2xl bg-white"></div>
        {/* <Button
          refBtn={settingsBtnRef}
          onClick={handleToggleAlbumSettings}
          className={`${toggleAlbum && "cursor-default ring-transparent"} size-[5rem] rounded-2xl bg-white text-black`}
        >
          {plusIcon}
        </Button> */}

        <div ref={settingsBtnRef} className="grid grid-cols-3 gap-4">
          {albums.map((album, index) => (
            <Button
              key={index}
              onClick={handleToggleAlbumSettings}
              className={`${toggleAlbum && "cursor-default ring-transparent"} size-[4.5rem] rounded-2xl bg-white text-black`}
            >
              {album.title || plusIcon}
            </Button>
          ))}
        </div>
      </section>
    </WrapOutlet>
  );
}
