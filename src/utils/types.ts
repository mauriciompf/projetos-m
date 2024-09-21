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
