import { useThemeContext } from "../context/ThemeContext";

const highlightText = (str: string, highlight: string) => {
  const { theme } = useThemeContext();
  const index = str.toLowerCase().indexOf(highlight.toLowerCase());

  if (index === -1) {
    // If the highlight string is not found, return the original string
    return <>{str}</>;
  }

  const highlightedText = str.slice(index, index + highlight.length);
  const restText = str.slice(index + highlight.length);

  return (
    <>
      <span className={`${theme === "dark" ? "bg-gray-700" : "bg-slate-400"}`}>
        {highlightedText}
      </span>
      {restText}
    </>
  );
};

export { highlightText };
