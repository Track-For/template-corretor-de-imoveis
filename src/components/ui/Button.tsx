import { ArrowRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "ink" | "bronze" | "outline" | "light";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  showArrow?: boolean;
};

const variants = {
  ink: "border-ink bg-ink text-sand hover:bg-[#302b24]",
  bronze: "border-bronze bg-bronze text-white hover:bg-[#714b1e]",
  outline: "border-ink/35 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-sand",
  light: "border-sand bg-sand text-ink hover:bg-white",
};

export function Button({
  children,
  href,
  variant = "ink",
  className = "",
  type = "button",
  disabled,
  target,
  rel,
  onClick,
  showArrow = true,
}: ButtonProps) {
  const classes = `group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border px-6 py-3 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.8}
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
