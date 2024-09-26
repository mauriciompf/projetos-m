import {
  AllHTMLAttributes,
  ButtonHTMLAttributes,
  Dispatch,
  Ref,
  RefObject,
  SetStateAction,
} from "react";

export type WrapOutletProps = {
  children: React.ReactNode;
  projectName: string;
};

export type WrapSettingsBoxProps = {
  refElem: RefObject<HTMLElement>;
  children: React.ReactNode;
  className: string;
};

export type ColumnSelectorProps = {
  keyName: string;
  restrictedList?: string[];
};

export type Projects = {
  id: number;
  label: string;
  path: string;
  icon: string;
};

export type ProjectLink = {
  project: Projects;
  elementVisible: boolean;
};

export type TableToggleValues = {
  toggleSortBy: boolean;
  setToggleSortBy: (val: boolean) => void;
  toggleFilter: boolean;
  setToggleFilter: (val: boolean) => void;
};

export type TableParamsValues = {
  userData: UserData[];
  isLoading: boolean;
  searchParams: URLSearchParams;
  setSearchParams: (val: URLSearchParams) => void;
  statusParams: URLSearchParams;
  setStatusParams: (val: URLSearchParams) => void;
  filtedTableLength: number;
  setFiltedTableLength: (val: number) => void;
  orderByParams: URLSearchParams;
  setOrderByParams: (params: URLSearchParams) => void;
  setSelectColumnMap: () => void;
  selectColumnMap: { [key: string]: string };
  setSelectColumn: (key: string, column: string) => void;
};

export type UserData = {
  id: number;
  firstName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
};

export type Album = {
  id: number;
  title: string;
  images: (string | File)[];
  isMain: boolean;
};

export type EditAlbumValues = {
  albumBoxes: Album[];
  editAlbumBoxes: Album[];
  setEditAlbumBoxes: Dispatch<SetStateAction<Album[]>>;
  setIsEditAlbum: (val: boolean) => void;
  isEditAlbum: boolean;
  setAlbumBoxes: Dispatch<SetStateAction<Album[]>>;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
  expandAlbum: boolean;
  setExpandAlbum: (val: boolean) => void;
  handleSaveAlbum: (val: Album) => void;
};

export type HeaderControlProps = {
  onClick: () => void;
  isDropDownOpen?: boolean;
  headerLabel: string | URLSearchParams | null;
  isRemoveButton?: boolean;
  className?: string;
};

export type FilterBoxProps = {
  refFilterBtn: RefObject<HTMLButtonElement>;
  setToggleFilter: (val: boolean) => void;
};

export type ListItemProps = {
  list: string;
  handleClick: () => void;
};

export type ExpandedImageValues = {
  isExpand: boolean;
  setIsExpand: (val: boolean) => void;
  expandedImage: { image: string | File; id: number; index: number } | null;
  setExpandedImage: Dispatch<
    SetStateAction<{ image: string | File; id: number; index: number } | null>
  >;
  handleRemoveImage: (id: number, index: number) => void;
  handleExpandImage: (image: string | File, id: number, index: number) => void;
  handleCloseExpandImage: () => void;
};

export type TimeGeoContextValues = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  geoUrl: string;
  setGeoUrl: Dispatch<SetStateAction<string>>;
  geoData: { timezone: string; city: string; country: string; region: string };
  geoIsLoading: boolean;
};

export type useLocalStorageParams<T> = {
  key: string;
  initialState: T;
};

export type WorldDateValues = {
  id: number;
  name: string;
  timeZone: string;
  time: string | null;
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  refBtn?: Ref<HTMLButtonElement>;
}

export interface HeadingProps extends AllHTMLAttributes<HTMLHeadingElement> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}
