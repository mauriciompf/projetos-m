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
