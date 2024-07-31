import { useThemeContext } from "../context/ThemeContext";

const highlightText = (str: string, highlight: string) => {
  const { theme } = useThemeContext();
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = str.split(regex);

  return (
    <>
      {parts.filter(String).map((part, index) =>
        // Check if the current part matches the highlight letter
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={index}
            className={`${theme === "dark" ? "bg-gray-700" : "bg-slate-400"}`}
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

export { highlightText };
