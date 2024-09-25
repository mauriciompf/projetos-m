import { Projects } from "./types";

const projectList: Projects[] = [
  {
    id: 1,
    label: "Ordenação e Filtro",
    path: "/pages/filter" || "/",
    icon: "📊",
  },
  {
    id: 2,
    label: "Galeria",
    path: "/pages/gallery",
    icon: "🖼️",
  },
  {
    id: 3,
    label: "Hora Atual",
    path: "/pages/time",
    icon: "🕗",
  },
];

export default projectList;
