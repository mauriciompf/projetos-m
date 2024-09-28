import { useEditAlbumContext } from "../../context/EditAlbumContext";

export default function AlbumImageSlider() {
  const { albumBoxes, imageIndex } = useEditAlbumContext();

  return (
    <div className="relative h-full overflow-hidden">
      {albumBoxes
        .filter((album) => album.isMain)
        .map((album) =>
          album.images.length > 0 ? (
            <div
              className="flex h-full transition-transform ease-in-out"
              style={{
                transform: `translateX(-${imageIndex * 100}%)`,
              }}
              key={album.id}
            >
              {album.images.map((image, index) => (
                <div
                  className="relative h-full max-h-[38.75rem] w-full flex-shrink-0 select-none"
                  key={index}
                >
                  {/* Blur image */}
                  <img
                    className={`absolute h-full w-full scale-110 object-cover ${index === imageIndex ? "blur-lg" : "opacity-0"}`}
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt=""
                  />

                  {/* Center image */}
                  <img
                    className={`relative h-full w-full object-contain shadow-2xl ${index === imageIndex ? "opacity-100" : "opacity-0"}`}
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt=""
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="grid h-[300px] place-items-center rounded-2xl bg-alt_white px-4 text-center text-2xl text-jet">
              <strong>
                Adicione imagens dentro do álbum para visualizá-las por aqui, ou
                crie um novo álbum clicando em "+"
              </strong>
            </p>
          ),
        )}
    </div>
  );
}
