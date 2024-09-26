import { twMerge } from "tailwind-merge";
import { ButtonProps } from "../utils/types";

export default function Button({
  children,
  className,
  refBtn,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={refBtn}
      {...props}
      className={twMerge(
        `bg-transparent px-2 py-1 font-bold hover:ring-4 focus:outline-none focus:ring-4`,
        className,
      )}
    >
      {children}
    </button>
  );
}
