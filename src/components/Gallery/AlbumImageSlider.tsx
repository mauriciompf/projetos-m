import { useEditAlbumContext } from "../../context/EditAlbumContext";

export default function AlbumImageSlider() {
  const { albumBoxes, imageIndex } = useEditAlbumContext();

  return albumBoxes
    .filter((album) => album.isMain)
    .map((album) =>
      album.images.map((image, index) =>
        album.images.length > 0 ? (
          <div
            className="relative h-full max-h-[38.75rem] w-full flex-shrink-0 transition-transform ease-in-out"
            style={{
              transform: `translateX(-${imageIndex * 100}%)`,
            }}
            key={index}
          >
            {/* Blur image */}
            <div className={`absolute grid h-full w-full blur-2xl`}>
              <img
                className="h-[38.75rem] w-full scale-100 select-none object-cover"
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt=""
              />
            </div>

            {/* Center image */}
            <img
              className="relative h-full w-full select-none object-contain shadow-2xl"
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt=""
            />
          </div>
        ) : (
          <p className="grid h-[300px] place-items-center rounded-2xl bg-columbia px-4 text-center text-2xl text-jet">
            <strong>
              Adicione imagens dentro do álbum para visualizá-las por aqui, ou
              crie um novo álbum clicando em "+"
            </strong>
          </p>
        ),
      ),
    );
}
