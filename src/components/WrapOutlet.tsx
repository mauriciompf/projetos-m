import { useMenuContext } from "../context/MenuContext";
import toggleThemeClasses from "../utils/toggleThemeClasses";
import Heading from "./Heading";

type WrapOutletProps = {
  children: React.ReactNode;
  projectName: string;
};

export default function WrapOutlet({ children, projectName }: WrapOutletProps) {
  const { isOpenMenu } = useMenuContext();

  return (
    <main
      className={toggleThemeClasses(
        isOpenMenu ? "ml-[300px]" : "ml-[60px]",
        "mx-auto transition-all duration-500 ease-in-out",
      )}
    >
      <section>
        <Heading className="pt-12 text-center tracking-wide" as={"h2"}>
          {projectName}
        </Heading>
      </section>

      {children}
    </main>
  );
}
