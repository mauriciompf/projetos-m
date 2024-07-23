const toCapitalizeCase = (str: string | null) => {
  const splitStr = str!
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase().concat(word.substring(1));
    });
  return splitStr.join(" ");
};

export default toCapitalizeCase;
