"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Diamond, ChevronRight } from "lucide-react";

interface PricingCardProps {
  index: string;
  title: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  buttonText: string;
  href?: string;
  highlighted?: boolean;
  className?: string;
}

const cardVariants = {
  initial: { y: 0 },
  hover: {
    y: -6,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

export function PricingCard({
  index,
  title,
  price,
  subtitle,
  description,
  features,
  buttonText,
  href,
  highlighted = false,
  className,
}: PricingCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      className={cn(
        "relative flex flex-col justify-between border p-8 transition-shadow duration-300",
        highlighted
          ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#FAFAF8]"
          : "bg-[#FAFAF8] border-[#1A1A1A]/10 text-[#1A1A1A]",
        className,
      )}
    >
      {/* Index */}
      <div>
        <p
          className={cn(
            "font-cormorant text-sm tracking-[0.35em] mb-6",
            highlighted ? "text-[#B85C2C]" : "text-[#B85C2C]",
          )}
        >
          {index}
        </p>

        {/* Title + price */}
        <div className="mb-6">
          <h3
            className={cn(
              "font-cormorant text-3xl font-light leading-tight mb-3",
              highlighted ? "text-[#FAFAF8]" : "text-[#1A1A1A]",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "font-dm text-[13px] font-light mb-4",
              highlighted ? "text-[#FAFAF8]/50" : "text-[#1A1A1A]/50",
            )}
          >
            {subtitle}
          </p>
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "font-cormorant text-4xl font-semibold",
                highlighted ? "text-[#FAFAF8]" : "text-[#1A1A1A]",
              )}
            >
              {price}
            </span>
          </div>
        </div>

        {/* Separator */}
        <div
          className={cn(
            "w-full h-px mb-6",
            highlighted ? "bg-[#FAFAF8]/10" : "bg-[#1A1A1A]/8",
          )}
        />

        {/* Description */}
        <p
          className={cn(
            "font-dm text-[13px] font-light leading-relaxed mb-6",
            highlighted ? "text-[#FAFAF8]/60" : "text-[#1A1A1A]/55",
          )}
        >
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Diamond
                className={cn(
                  "h-3 w-3 mt-0.5 shrink-0",
                  highlighted ? "text-[#B85C2C]" : "text-[#B85C2C]",
                )}
              />
              <span
                className={cn(
                  "font-dm text-[13px] font-light leading-snug",
                  highlighted ? "text-[#FAFAF8]/70" : "text-[#1A1A1A]/65",
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      {href ? (
        <a
          href={href}
          className={cn(
            "group relative w-full overflow-hidden py-3.5 px-6",
            "font-dm text-[12px] tracking-[0.2em] uppercase",
            "transition-colors duration-300 flex items-center justify-center gap-2",
            highlighted
              ? "bg-[#B85C2C] text-white hover:bg-[#A04E25]"
              : "border border-[#B85C2C] text-[#B85C2C] hover:bg-[#B85C2C] hover:text-white",
          )}
        >
          <span className="transition-all duration-300 group-hover:translate-x-[-4px]">
            {buttonText}
          </span>
          <ChevronRight
            size={13}
            className="transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:translate-x-1"
          />
        </a>
      ) : (
        <button
          className={cn(
            "group relative w-full overflow-hidden py-3.5 px-6",
            "font-dm text-[12px] tracking-[0.2em] uppercase",
            "transition-colors duration-300 flex items-center justify-center gap-2",
            highlighted
              ? "bg-[#B85C2C] text-white hover:bg-[#A04E25]"
              : "border border-[#B85C2C] text-[#B85C2C] hover:bg-[#B85C2C] hover:text-white",
          )}
        >
          <span className="transition-all duration-300 group-hover:translate-x-[-4px]">
            {buttonText}
          </span>
          <ChevronRight
            size={13}
            className="transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:translate-x-1"
          />
        </button>
      )}
    </motion.div>
  );
}
