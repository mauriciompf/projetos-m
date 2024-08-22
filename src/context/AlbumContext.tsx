import {
  // ChangeEvent,
  createContext,
  // Dispatch,
  // SetStateAction,
  useState,
} from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";

type AlbumContextValues = {
  albums: {
    title: string;
    images: never[];
  }[];
  // setAlbums: Dispatch<SetStateAction<{ title: string; images: never[] }[]>>;
  handleOnChangeTitle: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
  toggleAlbumSettings: boolean;
  handleToggleAlbumSettings: (index: number) => void;
  inputTitle: string;
};

const AlbumContext = createContext<AlbumContextValues | null>(null);

export default function AlbumContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [albums, setAlbums] = useState<
    {
      title: string;
      images: never[];
    }[]
  >([
    {
      title: "exp 1",
      images: [],
    },
    {
      title: "",
      images: [],
    },
  ]);
  const [toggleAlbumSettings, setToggleAlbumSettings] = useState(false);
  const [inputTitle, setInputValue] = useState("");

  const handleToggleAlbumSettings = (index: number) => {
    setToggleAlbumSettings(!toggleAlbumSettings);
    if (!toggleAlbumSettings) {
      setInputValue(albums[index].title);
    }
  };

  const handleOnChangeTitle = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const value = (event.target as HTMLInputElement).value;
    setInputValue(value);
    setAlbums((prev) =>
      prev.map((album, index) =>
        index === prev.findIndex((album) => album.title === inputTitle)
          ? { ...album, title: value }
          : album,
      ),
    );
  };

  return (
    <AlbumContext.Provider
      value={{
        albums,
        handleOnChangeTitle,
        toggleAlbumSettings,
        inputTitle,
        handleToggleAlbumSettings,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

const useAlbumContext = () =>
  useCustomHookContext(AlbumContext, "useAlbumContext", "AlbumContextProvider");

export { useAlbumContext };
