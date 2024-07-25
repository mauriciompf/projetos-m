import { useThemeContext } from "../context/ThemeContext";

const highlightText = (text: string, highlight: string) => {
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  const { theme } = useThemeContext();

  return (
    <>
      {parts.filter(String).map((part, index) =>
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

export default highlightText;
