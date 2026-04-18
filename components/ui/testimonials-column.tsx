"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...Array(2)].map((_, dupIdx) => (
          <React.Fragment key={dupIdx}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={`${dupIdx}-${i}`}
                className="p-7 border border-white/10 bg-[#FAFAF8] max-w-xs w-full"
              >
                <p className="text-[#1A1A1A]/75 font-dm text-sm leading-relaxed font-light">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={36}
                    height={36}
                    src={image}
                    alt={name}
                    className="h-9 w-9 rounded-full object-cover grayscale"
                  />
                  <div className="flex flex-col">
                    <span className="font-dm font-medium text-[#1A1A1A] text-sm leading-tight">
                      {name}
                    </span>
                    <span className="font-dm text-xs text-[#1A1A1A]/45 leading-tight mt-0.5">
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
