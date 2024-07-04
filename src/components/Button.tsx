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
        "rounded-md border-2 border-black bg-transparent px-2 py-1 font-bold hover:ring-2 hover:ring-black focus:ring-2 focus:ring-black",
        className,
      )}
    >
      {children}
    </button>
  );
}
