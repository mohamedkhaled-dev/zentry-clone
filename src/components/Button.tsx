import type React from "react";
type ButtonProps = {
  title: string;
  id: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
};

export default function Button({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
}: ButtonProps) {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black  hover:scale-105 hover:shadow-lg ${containerClass} transition-all duration-300`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
}
