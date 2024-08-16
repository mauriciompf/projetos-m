import { ChangeEvent, Ref, useState } from "react";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
const xMark = <FontAwesomeIcon icon={"fa-solid fa-circle-xmark" as IconProp} />;

type AlbumSettingsProps = {
  handleToggleAlbumSetttings: () => void;
  refWrap: Ref<HTMLElement>;
};

type ImageType = {
  type: "file" | "url";
  data: File | string;
};

export default function AlbumSettings({
  handleToggleAlbumSetttings,
  refWrap,
}: AlbumSettingsProps) {
  const [images, setImages] = useState<ImageType[]>([]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Files in object format
    if (!files && files!.length <= 0) return;

    // Convert to array and filter files that exceed the size limit
    const validFiles = Array.from(files!).filter((file) => {
      // 2097152 === 2MB
      if (file.size > 2097152) {
        // #TODO Improve user feedback
        alert(`File ${file.name} is too large and will not be added.`);
        return;
      }
      return true;
    });

    const fileObjects: ImageType[] = validFiles.map((file) => ({
      type: "file",
      data: file,
    }));
    setImages((prev) => [...prev, ...fileObjects]);
  };

  const handleInsertURL = () => {
    const url = prompt("URL:");
    const regex = new RegExp("\\.(jpg|gif|png|jpeg)(\\?.*)?$", "i");
    if (!url) return;

    if (!regex.test(url)) {
      alert("Not a image");
      return handleInsertURL();
    }

    setImages((prev) => [...prev, { type: "url", data: url }]);
  };

  const handleOnDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Prevent to open the file in the browser
    const filesDrop = event.dataTransfer.files; // Get the file or files that were dropped
    if (!filesDrop || filesDrop.length <= 0) return;

    const eventFiles = new DataTransfer(); // Create DataTransfer object to Hold the files
    for (let i = 0; i < filesDrop.length; i++) {
      eventFiles.items.add(filesDrop[i]); // Add each dropped file to the DataTransfer object
    }

    const fakeEvent = new Event("input");
    // Define target as a property of the fakeEvent
    Object.defineProperty(fakeEvent, "target", {
      value: {
        files: eventFiles.files, // Set the target's files property to the DataTransfer's files
      },
      writable: false,
    });

    handleOnChange(fakeEvent as unknown as ChangeEvent<HTMLInputElement>);
  };

  const handleOnDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <article
      ref={refWrap}
      className="absolute z-10 ml-[.75rem] mr-4 grid gap-6 rounded-2xl border border-gray-400 bg-white p-4 text-black shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <input
            type="text"
            className="w-36 text-2xl outline-none"
            placeholder="Título"
            maxLength={15}
          />
          <div className="rounded-full border border-black"></div>
        </div>
        <Button
          type="submit"
          onClick={handleToggleAlbumSetttings}
          className="p-0 text-2xl leading-none ring-transparent hover:text-red-700 focus:text-red-700"
        >
          {xMark}
        </Button>
      </div>

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

      <p
        onDrop={(event) => handleOnDrop(event)}
        onDragOver={(event) => handleOnDragOver(event)}
        className="text-center"
      >
        ou arraste uma imagem, cole imagem ou 
        <Button
          onClick={handleInsertURL}
          className="p-0 text-[#4363D2] underline"
        >
          URL
        </Button>
      </p>

      {images && (
        <div
          onDrop={(event) => handleOnDrop(event)}
          onDragOver={(event) => handleOnDragOver(event)}
          className="grid max-h-52 grid-cols-2 place-items-center gap-y-4 overflow-y-auto"
        >
          {images &&
            images.map((image, index) => (
              <img
                draggable="false"
                key={index}
                className="size-20 rounded-2xl object-cover"
                src={
                  image.type === "file"
                    ? URL.createObjectURL(image.data as File)
                    : (image.data as string)
                }
                alt={`image ${index}`}
              />
            ))}
        </div>
      )}

      <Button className="rounded-2xl border border-gray-300 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white">
        Deletar Album
      </Button>
    </article>
  );
}
