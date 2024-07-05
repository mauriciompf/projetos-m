import Heading from "../Heading";
import ThemeButton from "../ThemeButton";

export default function HomeHeader() {
  return (
    <header className="flex items-center justify-center gap-6 text-center">
      <Heading as="h1">Projetos</Heading>
      <ul className="flex gap-4">
        <li>
          <ThemeButton themeIcon={"light"} />
        </li>
        <li>
          <ThemeButton themeIcon={"dark"} />
        </li>
      </ul>
    </header>
  );
}
