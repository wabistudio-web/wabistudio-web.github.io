"use client";

import { useState } from "react";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { Feather, Zap, Aperture, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  {
    value: "simplicite",
    icon: <Feather className="w-4 h-4 shrink-0" />,
    label: "Simplicité Volontaire",
    badge: "Design",
    title: "L'épure comme standard de luxe.",
    description:
      "Nous éliminons le bruit visuel pour ne garder que l'âme de votre projet. Un design WABI n'est pas seulement minimaliste, il est essentiel. Chaque espace blanc est une respiration, chaque typographie est une intention.",
    cta: "Voir notre esthétique",
    imageSrc: "/assets/1.jpg",
    imageAlt: "Simplicité Volontaire",
  },
  {
    value: "performance",
    icon: <Zap className="w-4 h-4 shrink-0" />,
    label: "Performance Durable",
    badge: "Technique",
    title: "Le code au service du temps.",
    description:
      "Un site beau ne suffit pas, il doit être rapide et léger. Nous utilisons des technologies modernes (React, Next.js) pour garantir un temps de chargement instantané et une empreinte carbone réduite. Le luxe, c'est aussi la fluidité.",
    cta: "Nos engagements techniques",
    imageSrc: "/assets/2.jpg",
    imageAlt: "Performance Durable",
  },
  {
    value: "elegance",
    icon: <Aperture className="w-4 h-4 shrink-0" />,
    label: "Élégance Organique",
    badge: "Identité",
    title: "Une présence numérique vivante.",
    description:
      "Nous créons des interactions fluides et des transitions subtiles qui imitent le vivant. Votre site n'est pas une page figée, c'est un prolongement organique de votre savoir-faire, conçu pour évoluer avec vous.",
    cta: "Démarrer un projet",
    imageSrc: "/assets/3.jpg",
    imageAlt: "Élégance Organique",
  },
];

export function AboutSection() {
  const [active, setActive] = useState(TABS[0].value);
  const activeTab = TABS.find((t) => t.value === active)!;

  return (
    <section id="approche" className="py-16 sm:py-32 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <p className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm mb-5">
            L'approche WABI
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#1A1A1A] leading-tight">
            Concevoir moins,
            <br />
            <em className="text-[#B85C2C] not-italic">mais mieux.</em>
          </h2>
          <p className="mt-4 font-dm text-[13px] text-[#1A1A1A]/45 font-light max-w-md leading-relaxed">
            Trois piliers pour un web plus durable, plus serein et plus performant.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs.Root value={active} onValueChange={setActive}>
          {/* Tab triggers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Tabs.List className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-0 mb-10">
              {TABS.map((tab, i) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "group relative flex items-center gap-3 px-7 py-4 font-dm text-[11px] tracking-[0.25em] uppercase transition-all duration-300",
                    "border-b-2 focus:outline-none",
                    active === tab.value
                      ? "border-[#B85C2C] text-[#B85C2C]"
                      : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70",
                    i > 0 && "sm:ml-0",
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors duration-300",
                      active === tab.value ? "text-[#B85C2C]" : "text-[#1A1A1A]/30 group-hover:text-[#1A1A1A]/55",
                    )}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </motion.div>

          {/* Tab content panel */}
          <div className="border border-[#1A1A1A]/6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Tabs.Content value={activeTab.value} forceMount className="grid lg:grid-cols-2">
                  {/* Text side */}
                  <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-16">
                    <p className="font-dm text-[10px] tracking-[0.45em] uppercase text-[#B85C2C]">
                      {activeTab.badge}
                    </p>
                    <h3 className="font-cormorant text-3xl lg:text-4xl font-light text-[#1A1A1A] leading-snug">
                      {activeTab.title}
                    </h3>
                    <p className="font-dm text-[13px] text-[#1A1A1A]/55 font-light leading-relaxed">
                      {activeTab.description}
                    </p>
                    <a
                      href="#contact"
                      className={cn(
                        "group relative overflow-hidden inline-flex items-center mt-2",
                        "px-8 py-3.5 bg-[#B85C2C] text-white w-fit",
                        "font-dm text-[11px] tracking-[0.22em] uppercase transition-opacity duration-300",
                      )}
                    >
                      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
                        {activeTab.cta}
                      </span>
                      <i className="absolute right-1 top-1 bottom-1 grid w-8 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
                        <ChevronRight size={13} />
                      </i>
                    </a>
                  </div>

                  {/* Visual side */}
                  <div className="relative h-64 lg:h-auto min-h-[280px]">
                    <Image
                      src={activeTab.imageSrc}
                      alt={activeTab.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Tabs.Content>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs.Root>
      </div>
    </section>
  );
}
