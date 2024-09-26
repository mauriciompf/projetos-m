import Button from "../Button";
import { Album } from "../../utils/types";
import useUploadInput from "../../customHooks/useUploadInput";

export default function ImageUploadInput({ editBox }: { editBox: Album }) {
  const { handleUpload, handleURL } = useUploadInput();

  return (
    <>
      <label
        htmlFor="files"
        className="text-alt_white w-full cursor-pointer rounded-xl bg-savoy p-2 text-center font-bold hover:ring-4 focus:ring-4"
      >
        Faça Upload
      </label>

      <input
        onChange={(event) => handleUpload(event, editBox.id)}
        className="invisible hidden"
        type="file"
        id="files"
        accept="image/*" // Allow only images extesions
        multiple // Insert multiple files
      />

      <p className="text-center">
        Ou arraste uma imagem | {""}
        <Button
          onClick={() => handleURL(editBox.id)}
          className="p-0 text-savoy underline"
        >
          URL
        </Button>
      </p>
    </>
  );
}
