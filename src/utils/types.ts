import { Dispatch, SetStateAction } from "react";

export type ThemeButtonProps = {
  className?: string;
  isMenuOpen?: boolean;
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
  setAlbumBoxes: (val: Album[]) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
  expandAlbum: boolean;
  setExpandAlbum: (val: boolean) => void;
};
