import { ChangeEvent, useState } from "react";

type ImageType = {
  type: "file" | "url";
  data: File | string;
};

const useAlbumSettingsHandlers = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const regexImageFile = new RegExp("\\.(jpg|gif|png|jpeg)(\\?.*)?$", "i");

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
    event.target.value = ""; // Allow re-adding the same image file
  };

  const handleInsertURL = () => {
    const url = prompt("URL:");
    if (!url) return;

    if (!regexImageFile.test(url)) {
      alert("Only images files is allowed to use");
      return handleInsertURL();
    }

    setImages((prev) => [...prev, { type: "url", data: url }]);
  };

  const handleOnDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Prevent to open the file in the browser
    const filesDrop = event.dataTransfer.files; // Get the file or files that were dropped

    if (!filesDrop || filesDrop.length <= 0) return;

    if (!regexImageFile.test(filesDrop[0].name)) {
      alert("Only images files is allowed to use");
      return;
    }

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

  const handleDeleteAlbum = () => {
    if (images.length <= 0) return;
    if (confirm("Tem certeza que deseja deletar todas as suas fotos?")) {
      setImages([]);
    }
  };

  const handleDeleteImage = (index: number) => {
    if (confirm("Tem certeza que deseja deletar esta imagem?")) {
      setImages((prev) => {
        const newArr = [...prev];
        newArr.splice(index, 1);
        return newArr;
      });
    }
  };

  const handleExpandImage = (img: any) => {
    console.log(img);
  };

  return {
    handleOnChange,
    handleInsertURL,
    handleOnDrop,
    handleOnDragOver,
    handleDeleteAlbum,
    handleDeleteImage,
    handleExpandImage,
    images,
  };
};

export default useAlbumSettingsHandlers;
