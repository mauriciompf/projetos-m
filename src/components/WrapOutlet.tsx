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
        isOpenMenu ? "ml-[300px]" : "ml-[150px]",
        "mx-auto w-[80%] p-6 py-12 transition-all duration-500 ease-in-out",
      )}
    >
      <section>
        <Heading className="text-center tracking-wide" as={"h2"}>
          {projectName}
        </Heading>
      </section>

      {children}
    </main>
  );
}
