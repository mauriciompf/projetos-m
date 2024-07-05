import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "rounded-md bg-transparent px-2 py-1 font-bold hover:ring-4 focus:ring-4",
        className,
      )}
    >
      {children}
    </button>
  );
}
