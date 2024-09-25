import Heading from "../Heading";
import ThemeButton from "./ThemeButton";
import ToggleMenu from "./ToggleMenu";

export default function SideBarHeader({
  elementVisible,
}: {
  elementVisible: boolean;
}) {
  return (
    <section className={`relative my-4 ml-0.5 flex items-center gap-6`}>
      <ToggleMenu />

      <Heading
        className={`${!elementVisible && "select-none opacity-0 transition-opacity"} relative duration-100`}
        as="h2"
      >
        <div className={`flex items-center gap-6`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <span className="text-2xl">Projetos</span>
          </div>
          <ThemeButton
            className={`relative p-0 text-xl transition-transform duration-300 ease-in-out`}
          />
        </div>
      </Heading>
    </section>
  );
}
