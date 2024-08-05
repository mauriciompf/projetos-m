import img from "../../assets/images/image.png";

type Projects = {
  demoImg?: string;
  label: string;
  icon: string;
};

const projectList: Projects[] = [
  {
    demoImg: img,
    label: "Ordenação e Filtro",
    icon: "📊",
  },
  {
    label: "Galeria",
    icon: "🖼️",
  },
];

export default projectList;
