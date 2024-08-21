import { useAlbumSettings } from "../../context/AlbumSettingsContext";
import { deleteIcon, expandIcon } from "../../utils/icons";
import Button from "../Button";

type AlbumSettingsBodyProps = {
  inputTitle: string;
  // FIXME any type
  setAlbums: any;
  setInputTitle: any;
  handleAlbumSettingsBtn: () => void;
  setIsAlbumCreated: any;
  isAlbumCreated: any;
};

export default function AlbumSettingsBody({
  inputTitle,
  setInputTitle,
  setAlbums,
  handleAlbumSettingsBtn,
  isAlbumCreated,
  setIsAlbumCreated,
}: AlbumSettingsBodyProps) {
  const {
    handleOnChange,
    handleInsertURL,
    handleDeleteAlbum,
    handleDeleteImage,
    handleExpandImage,
    images,
  } = useAlbumSettings();

  const handleAddAlbum = () => {
    if (!inputTitle) {
      alert("Insira um título antes de adicionar um novo álbum.");
      return;
    }

    handleAlbumSettingsBtn();
    setAlbums((prev: any) => [{ title: inputTitle, images: [] }, ...prev]);
    // setInputTitle("");
    setIsAlbumCreated(true);

    // setAlbums((prev: any) => [inputTitle, ...prev]);
  };

  return (
    <>
      <label
        htmlFor="files"
        className="w-full cursor-pointer rounded-xl bg-[#4363D2] p-2 text-center font-bold text-white hover:ring-4 focus:ring-4"
      >
        Faça Upload
      </label>
      <input
        className="invisible hidden"
        onChange={(event) => handleOnChange(event)}
        type="file"
        id="files"
        accept="image/*"
        multiple
      />

      <p className="text-center">
        ou arraste uma imagem, cole imagem ou 
        <Button
          onClick={handleInsertURL}
          className="p-0 text-[#4363D2] underline"
        >
          URL
        </Button>
      </p>

      {images && images.length > 0 && (
        <div className="grid max-h-52 grid-cols-2 place-items-center gap-y-4 overflow-y-auto">
          {images.map((image, index) => (
            <div key={index} className="group relative">
              <img
                draggable="false"
                className="size-20 rounded-2xl object-cover"
                src={
                  image.type === "file"
                    ? URL.createObjectURL(image.data as File)
                    : (image.data as string)
                }
                alt={`image ${index}`}
              />
              <Button
                onClick={() => handleExpandImage(image.data)}
                className="absolute bottom-0 left-0 hidden rounded-bl-2xl border border-black bg-white px-2 py-0 ring-transparent hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white group-hover:block"
              >
                {expandIcon}
              </Button>
              <Button
                onClick={() => handleDeleteImage(image.data, index)}
                className="absolute bottom-0 right-0 hidden rounded-br-2xl border border-black bg-white px-2 py-0 ring-transparent hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white group-hover:block"
              >
                {deleteIcon}
              </Button>
            </div>
          ))}
        </div>
      )}

      {images && images.length > 0 && (
        <Button
          onClick={handleDeleteAlbum}
          className="rounded-2xl border border-gray-300 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white"
        >
          Deletar Album
        </Button>
      )}

      {!isAlbumCreated && (
        <Button
          onClick={handleAddAlbum}
          className="rounded-xl border border-black hover:bg-[#4363D2] hover:text-white focus:bg-[#4363D2] focus:text-white"
        >
          Adicionar Novo Álbum
        </Button>
      )}
    </>
  );
}
