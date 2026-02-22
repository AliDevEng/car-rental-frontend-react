import type { InputHTMLAttributes } from "react";

const Input = ({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`.trim()}
      {...props}
    />
  );
};

export default Input;
