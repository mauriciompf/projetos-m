import Heading from "../Heading";
import ThemeButton from "../ThemeButton";

export default function HomeHeader() {
  return (
    <header className="flex flex-col items-center justify-center gap-6 text-center sm:flex-row">
      <Heading as="h1">Projetos</Heading>
      <ul className="flex gap-4">
        <li>
          <ThemeButton themeName={"light"} />
        </li>
        <li>
          <ThemeButton themeName={"dark"} />
        </li>
      </ul>
    </header>
  );
}
