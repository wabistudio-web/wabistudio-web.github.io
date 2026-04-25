"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "filled" | "outline" | "outline-dark";
type Size = "sm" | "md" | "lg";

interface CTAButtonProps {
  label: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

const sizeConfig: Record<Size, {
  padding: string;
  text: string;
  spanMr: string;
  iconW: string;
  iconPos: string;
  iconHoverW: string;
  chevronSize: number;
}> = {
  sm: {
    padding: "px-6 py-2.5",
    text: "text-[12px] tracking-[0.18em]",
    spanMr: "mr-6",
    iconW: "w-8",
    iconPos: "right-0.5 top-0.5 bottom-0.5",
    iconHoverW: "group-hover:w-[calc(100%-0.25rem)]",
    chevronSize: 13,
  },
  md: {
    padding: "px-8 py-3.5",
    text: "text-[12px] tracking-[0.2em]",
    spanMr: "mr-8",
    iconW: "w-9",
    iconPos: "right-1 top-1 bottom-1",
    iconHoverW: "group-hover:w-[calc(100%-0.5rem)]",
    chevronSize: 13,
  },
  lg: {
    padding: "px-9 py-4",
    text: "text-[12px] tracking-[0.22em]",
    spanMr: "mr-10",
    iconW: "w-9",
    iconPos: "right-1 top-1 bottom-1",
    iconHoverW: "group-hover:w-[calc(100%-0.5rem)]",
    chevronSize: 15,
  },
};

const variantConfig: Record<Variant, { base: string; iconBg: string }> = {
  filled: {
    base: "bg-[#B85C2C] text-white",
    iconBg: "bg-white/15",
  },
  outline: {
    base: "border border-[#B85C2C] text-[#B85C2C] hover:text-white",
    iconBg: "bg-[#B85C2C]/20 group-hover:bg-[#B85C2C]",
  },
  "outline-dark": {
    base: "border border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#B85C2C] hover:text-[#B85C2C]",
    iconBg: "bg-[#1A1A1A]/6 group-hover:bg-[#B85C2C]/15",
  },
};

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  function CTAButton(
    { label, href, variant = "filled", size = "lg", onClick, type = "button", disabled, className, target, rel },
    ref,
  ) {
    const s = sizeConfig[size];
    const v = variantConfig[variant];

    const baseClass = cn(
      "group relative overflow-hidden inline-flex items-center",
      "font-dm uppercase transition-colors duration-500",
      s.padding,
      s.text,
      v.base,
      disabled && "opacity-50 cursor-not-allowed",
      className,
    );

    const inner = (
      <>
        <span className={cn("transition-opacity duration-500 group-hover:opacity-0", s.spanMr)}>
          {label}
        </span>
        <i
          className={cn(
            "absolute z-10 grid place-items-center transition-all duration-500 group-active:scale-95",
            s.iconW,
            s.iconPos,
            s.iconHoverW,
            v.iconBg,
          )}
        >
          <ChevronRight size={s.chevronSize} />
        </i>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={baseClass}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          target={target}
          rel={rel}
        >
          {inner}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={baseClass}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      >
        {inner}
      </button>
    );
  },
);

CTAButton.displayName = "CTAButton";

export { CTAButton };
