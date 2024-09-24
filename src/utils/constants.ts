export const tableLength = 50;
export const tableHeaders = [
  "ID",
  "Nome",
  "Idade",
  "Sexo",
  "Email",
  "Telefone",
  "Data de Nasc.",
];

export const regexImageFile = new RegExp(
  "\\.(jpg|gif|png|jpeg|webp)(\\?.*)?$",
  "i",
);
export const isNumber = /^[0-9]+$/;
export const SIZELIMIT = 1.5 * 1024 * 1024; // 1.5 MB
export const INTERVALTIME = 4500; // 1000ms === 1 seconds
export const ALBUM_IMAGE_LIMIT = 6;
