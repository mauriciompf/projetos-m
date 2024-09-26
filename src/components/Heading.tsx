import { twMerge } from "tailwind-merge";
import { HeadingProps } from "../utils/types";

export default function Heading({
  as: Component = "h1",
  children,
  className,
  ...props
}: HeadingProps) {
  return (
    <Component {...props} className={twMerge("text-4xl font-bold", className)}>
      {children}
    </Component>
  );
}
