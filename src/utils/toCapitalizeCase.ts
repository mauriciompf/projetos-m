// Each word's first letter is capitalized. Except for "id" which is fully capitalized as "ID".
const toCapitalizeCase = (str: string | null) => {
  if (!str) return ""; // Handle null or undefined input

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word === "id") {
        return "ID";
      }
      return word.charAt(0).toUpperCase() + word.substring(1);
    })
    .join(" ");
};

export default toCapitalizeCase;
