import { AllHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends AllHTMLAttributes<HTMLHeadingElement> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

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
