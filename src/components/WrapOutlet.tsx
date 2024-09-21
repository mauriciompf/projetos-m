import { useMenuContext } from "../context/MenuContext";
import Heading from "./Heading";

type WrapOutletProps = {
  children: React.ReactNode;
  projectName: string;
};

export default function WrapOutlet({ children, projectName }: WrapOutletProps) {
  const { isMenuOpen } = useMenuContext();

  return (
    <div
      className={`${isMenuOpen ? "sm:ml-[260px]" : "min-[640px]:ml-[60px]"} relative mx-auto ml-[60px] transition-all duration-300 ease-in-out`}
    >
      <header>
        <Heading className="pt-12 text-center tracking-wide" as={"h1"}>
          {projectName}
        </Heading>
      </header>
      <main>{children}</main>
    </div>
  );
}
