import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button className={`${variantClass} ${className}`.trim()} {...props} />
  );
};

export default Button;
