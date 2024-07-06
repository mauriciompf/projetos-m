const toggleThemeClasses = (
  ...classes: (string | boolean | undefined)[]
): string => {
  return classes
    .concat("transition-colors", "duration-100", "ease-in-out")
    .join(" ");
};

export default toggleThemeClasses;
