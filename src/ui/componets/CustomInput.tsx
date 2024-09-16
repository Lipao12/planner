import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "flex items-center gap-2 flex-1",
});

interface CustomInputProps
  extends ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  children: ReactNode;
}

export function CustomInput({ children, ...props }: CustomInputProps) {
  return <div className={inputVariants({})}>{children}</div>;
}
