import { useMenuContext } from "../context/MenuContext";
import Heading from "./Heading";

type WrapOutletProps = {
  children: React.ReactNode;
  projectName: string;
};

export default function WrapOutlet({ children, projectName }: WrapOutletProps) {
  const { isOpenMenu } = useMenuContext();

  return (
    <main
      className={`${isOpenMenu ? "ml-[260px]" : "ml-[60px]"} ease-in-out" mx-auto transition-all duration-300`}
    >
      <section>
        <Heading className="pt-12 text-center tracking-wide" as={"h1"}>
          {projectName}
        </Heading>
      </section>

      {children}
    </main>
  );
}
