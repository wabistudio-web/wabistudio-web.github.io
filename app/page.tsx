"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SpotlightBackground from "@/components/ui/spotlight-background";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-column";
import { PricingCard } from "@/components/ui/pricing-card";
import { ContactForm } from "@/components/ui/contact-form";
import { AboutSection } from "@/components/ui/about";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// ─── Animation preset ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Réalisations", href: "#realisations" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

const PLANS = [
  {
    index: "01.",
    title: "L'Instant",
    price: "950 €",
    subtitle: "Landing Page Essentielle",
    description: "Le point d'entrée idéal. Une page unique, claire et performante pour lancer votre présence en ligne sans compromis.",
    features: [
      "Design minimaliste & épuré (One-page)",
      "Développement Next.js ultra-rapide",
      "Optimisation SEO & Responsive",
      "Déploiement inclus",
    ],
    buttonText: "Choisir cette formule",
    href: "#contact",
  },
  {
    index: "02.",
    title: "L'Expérience",
    price: "1 850 €",
    subtitle: "Landing Page 3D",
    description: "Le pack immersif. Une landing page qui marque les esprits grâce à une intégration 3D signature et une narration visuelle unique.",
    features: [
      "Intégration Hero 3D (Spline / Three.js)",
      "Interactions organiques & fluides",
      "Direction Artistique WABI signature",
      "Narration visuelle immersive",
      "Optimisation des assets 3D",
    ],
    buttonText: "Choisir cette formule",
    href: "#contact",
    highlighted: true,
  },
  {
    index: "03.",
    title: "L'Étendue",
    price: "2 850 €",
    subtitle: "Site Vitrine Premium",
    description: "La présence complète. Un site multi-pages pensé pour construire un univers de marque fort et convertir durablement.",
    features: [
      "Arborescence de 3 à 5 pages",
      "Univers de marque cohérent et profond",
      "Stratégie SEO avancée",
      "Animations de transition premium",
      "Formulaire de contact & outils de conversion",
    ],
    buttonText: "Choisir cette formule",
    href: "#contact",
  },
  {
    index: "04.",
    title: "Le Suivi",
    price: "60 € / mois",
    subtitle: "Maintenance & Sérénité",
    description: "Votre site entre de bonnes mains. Tranquillité d'esprit garantie, mois après mois.",
    features: [
      "Hébergement & SSL sécurisé",
      "Mises à jour techniques & sécurité",
      "Support prioritaire (24/48h)",
      "Modifications mineures incluses chaque mois",
    ],
    buttonText: "Ajouter cette option",
    href: "#contact",
  },
];

const PROJECTS: CardStackItem[] = [
  {
    id: 1,
    title: "Maison Ōkami",
    description: "Architecture de marque · Site vitrine",
    imageSrc: "https://picsum.photos/seed/wabi-1/520/340",
    tag: "Branding",
  },
  {
    id: 2,
    title: "Noma Paris",
    description: "Restaurant gastronomique · Identité digitale",
    imageSrc: "https://picsum.photos/seed/wabi-2/520/340",
    tag: "Web Design",
  },
  {
    id: 3,
    title: "Galerie Terre",
    description: "Art contemporain · Expérience immersive",
    imageSrc: "https://picsum.photos/seed/wabi-3/520/340",
    tag: "UX / UI",
  },
  {
    id: 4,
    title: "Atelier Sōgen",
    description: "Céramiste artisanal · Site vitrine",
    imageSrc: "https://picsum.photos/seed/wabi-4/520/340",
    tag: "Artisanat",
  },
  {
    id: 5,
    title: "Hôtel Le Refuge",
    description: "Hôtellerie de caractère · Réservation en ligne",
    imageSrc: "https://picsum.photos/seed/wabi-5/520/340",
    tag: "Hospitality",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    text: "WABI Studio a su capturer l'essence même de notre marque. Le site est d'une élégance rare — nos clients nous le disent régulièrement.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Claire Fontaine",
    role: "Directrice, Atelier Terres",
  },
  {
    text: "Une collaboration d'exception. La précision dans les détails, la compréhension de notre univers — WABI ne fait pas du web, ils créent des expériences.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Thomas Beaumont",
    role: "Fondateur, Noma Paris",
  },
  {
    text: "Le studio a livré bien au-delà de nos attentes. Un site qui respire le luxe sans jamais être ostentatoire. Exactement ce que nous cherchions.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    name: "Ambre Leclerc",
    role: "CEO, Maison Ōkami",
  },
  {
    text: "Processus clair, équipe à l'écoute, résultat magistral. WABI comprend que le design épuré n'est pas une absence de travail mais l'aboutissement de la réflexion.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Nicolas Pernot",
    role: "Propriétaire, Hôtel Le Refuge",
  },
  {
    text: "Notre chiffre d'affaires en ligne a augmenté de 40% depuis le relancement. L'expérience utilisateur pensée par WABI fait toute la différence.",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    name: "Sakura Morel",
    role: "Fondatrice, Atelier Sōgen",
  },
  {
    text: "Un studio qui ose le silence dans le design. Quand tout le monde crie, WABI chuchote — et c'est justement ce qui attire l'attention.",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    name: "Édouard Vidal",
    role: "Directeur, Galerie Terre",
  },
];

const FAQ_ITEMS = [
  {
    q: "Comment se déroule un projet avec WABI Studio ?",
    a: "Chaque projet débute par une session d'immersion approfondie : nous explorons votre univers, vos valeurs et vos objectifs. Nous travaillons en trois phases — découverte & stratégie, design & prototypage, puis développement & lancement. Vous êtes impliqué à chaque étape, sans les réunions superflues.",
  },
  {
    q: "Quels sont les tarifs pour un site web ?",
    a: "Nos forfaits débutent à 750 € pour une landing page et 1 450 € pour un site vitrine complet. Des projets sur-mesure sont également possibles — contactez-nous pour un devis personnalisé. Nous privilégions la transparence totale : vous recevez un devis détaillé avant tout engagement.",
  },
  {
    q: "Combien de temps prend la création d'un site ?",
    a: "Un site vitrine prend généralement 4 à 6 semaines de la conception au lancement. Pour des projets plus complexes, nous établissons un calendrier précis dès notre première rencontre. La qualité n'est jamais sacrifiée pour la rapidité.",
  },
  {
    q: "Proposez-vous un suivi après le lancement ?",
    a: "Oui. Chaque projet inclut une période de support de 30 jours post-lancement. Nous proposons également des contrats de maintenance mensuelle pour assurer la performance, la sécurité et l'évolution de votre site sur le long terme.",
  },
  {
    q: "Travaillez-vous avec des entreprises de toute taille ?",
    a: "WABI Studio collabore principalement avec des marques qui accordent une importance particulière à l'image et à l'expérience. Qu'il s'agisse d'un artisan d'art ou d'une maison établie, ce qui compte c'est la volonté de créer quelque chose d'authentique et de durable.",
  },
];

const FOOTER_SECTIONS = [
  {
    title: "Studio",
    links: [
      { name: "À propos", href: "#approche" },
      { name: "Notre approche", href: "#approche" },
      { name: "Réalisations", href: "#realisations" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Design web", href: "#" },
      { name: "Identité visuelle", href: "#" },
      { name: "Maintenance", href: "#tarifs" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Démarrer un projet", href: "#contact" },
      { name: "wabistudio.contact@gmail.com", href: "mailto:wabistudio.contact@gmail.com" },
      { name: "Paris, France", href: "#" },
    ],
  },
];

// ─── Header — from header.txt (Header-2 + MenuToggleIcon + useScroll) ─────────

function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(40);

  // useEffect requis — pas de DOM access pendant le render (SSR)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled && !open
            ? "bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#1A1A1A]/6 py-4 shadow-sm shadow-black/[0.03]"
            : open
              ? "bg-[#FAFAF8] py-5 border-b border-[#1A1A1A]/5"
              : "bg-transparent py-6",
        )}
      >
        <nav className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image
              src="/assets/BannerWABI.png"
              alt="WABI Studio"
              width={160}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-wide text-[#1A1A1A]/55 hover:text-[#1A1A1A] transition-colors duration-300 font-dm"
              >
                {link.label}
              </a>
            ))}
            {/* CTA — GetStartedButton animation from CTA_button.txt */}
            <a
              href="#contact"
              className={cn(
                "group relative overflow-hidden inline-flex items-center",
                "text-[12px] tracking-[0.18em] uppercase font-dm",
                "border border-[#B85C2C] text-[#B85C2C] px-6 py-2.5",
                "hover:text-white transition-colors duration-500",
              )}
            >
              <span className="relative z-10 mr-6 transition-opacity duration-500 group-hover:opacity-0">
                Démarrer
              </span>
              <i className="absolute right-0.5 top-0.5 bottom-0.5 z-10 grid w-8 place-items-center transition-all duration-500 bg-[#B85C2C]/20 group-hover:w-[calc(100%-0.25rem)] group-hover:bg-[#B85C2C]">
                <ChevronRight size={13} />
              </i>
            </a>
          </div>

          {/* Mobile hamburger — MenuToggleIcon from header.txt */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 text-[#1A1A1A]"
          >
            <MenuToggleIcon open={open} className="size-5" duration={380} />
          </button>
        </nav>
      </header>

      {/* Mobile menu — framer-motion au lieu de tailwindcss-animate (non installé) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[57px] z-40 flex flex-col md:hidden bg-[#FAFAF8]"
          >
            <div className="flex h-full flex-col justify-between px-8 py-8">
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "py-4 font-cormorant text-2xl font-light text-[#1A1A1A]",
                      "border-b border-[#1A1A1A]/6 last:border-0",
                      "hover:text-[#B85C2C] hover:pl-2 transition-all duration-300",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="py-4 text-center text-[12px] tracking-[0.25em] uppercase font-dm bg-[#B85C2C] text-white hover:bg-[#A04E25] transition-colors"
              >
                Démarrer un projet
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero — SpotlightBackground (hero_background.txt) + AnimatedTextCycle + CTA ─

function HeroSection() {
  return (
    <SpotlightBackground>
      <section className="min-h-screen flex flex-col items-center justify-center px-8">
        <div className="text-center max-w-5xl mx-auto w-full">
          {/* Brand label */}
          <div className="hero-1 mb-10 flex items-center justify-center gap-4">
            <span className="block w-10 h-px bg-[#B85C2C]/35" />
            <span className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm">
              WABI Studio
            </span>
            <span className="block w-10 h-px bg-[#B85C2C]/35" />
          </div>

          {/* Headline */}
          <h1 className="hero-2 font-cormorant font-light leading-[1.06] text-[#1A1A1A] text-[clamp(3rem,8vw,6.5rem)]">
            L&apos;essentiel,
            <br />
            <em className="text-[#B85C2C] not-italic">magnifié.</em>
          </h1>

          {/* Animated subtitle */}
          <div className="hero-3 mt-7 text-base md:text-lg font-dm font-light text-[#1A1A1A]/50 max-w-lg mx-auto leading-relaxed">
            Studio de design spécialisé en{" "}
            <AnimatedTextCycle
              words={["sites d'exception", "identités visuelles", "expériences digitales", "narrations visuelles"]}
              interval={3200}
              className="text-[#B85C2C]"
            />
          </div>

          {/* CTA */}
          <div className="hero-4 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className={cn(
                "group relative overflow-hidden inline-flex items-center",
                "px-9 py-4 bg-[#B85C2C] text-white",
                "font-dm text-[12px] tracking-[0.22em] uppercase",
              )}
            >
              <span className="mr-10 transition-opacity duration-500 group-hover:opacity-0">
                Démarrer un projet
              </span>
              <i className="absolute right-1 top-1 bottom-1 z-10 grid w-9 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
                <ChevronRight size={15} />
              </i>
            </a>
            <a
              href="#realisations"
              className={cn(
                "inline-block px-9 py-4 border border-[#1A1A1A]/18 text-[#1A1A1A]/65",
                "font-dm text-[12px] tracking-[0.22em] uppercase",
                "hover:border-[#B85C2C] hover:text-[#B85C2C] transition-all duration-300",
              )}
            >
              Voir les réalisations
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-5 mt-24 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.5em] text-[#1A1A1A]/25 uppercase font-dm">
            Défiler
          </span>
          <div className="hero-bounce w-px h-12 bg-gradient-to-b from-[#B85C2C]/30 to-transparent" />
        </div>
      </section>
    </SpotlightBackground>
  );
}

// ─── Realisations ─────────────────────────────────────────────────────────────

function RealisationsSection() {
  // CardStack responsive — width adapté au viewport pour éviter l'overflow mobile
  const [cardDims, setCardDims] = useState({ width: 520, height: 340, spread: 38, overlap: 0.46 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        const w = Math.min(vw - 48, 340);
        setCardDims({ width: w, height: Math.round(w * 0.62), spread: 20, overlap: 0.32 });
      } else if (vw < 1024) {
        setCardDims({ width: 420, height: 275, spread: 28, overlap: 0.40 });
      } else {
        setCardDims({ width: 520, height: 340, spread: 38, overlap: 0.46 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="realisations" className="hidden sm:block py-32 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-20"
        >
          <p className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm mb-5">
            Réalisations
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#1A1A1A] leading-tight">
            Projets récents
          </h2>
          <p className="mt-4 text-[#1A1A1A]/45 font-dm font-light text-base max-w-md leading-relaxed">
            Chaque projet est une collaboration unique, façonnée avec précision et intention.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          {/* CardStack — from realisations.txt, dimensions responsive */}
          <CardStack
            items={PROJECTS}
            initialIndex={0}
            autoAdvance
            intervalMs={3200}
            pauseOnHover
            showDots
            cardWidth={cardDims.width}
            cardHeight={cardDims.height}
            spreadDeg={cardDims.spread}
            overlap={cardDims.overlap}
            depthPx={90}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing — PricingCard from pricing.txt ───────────────────────────────────

function PricingSection() {
  return (
    <section id="tarifs" className="py-32 bg-[#F5F2EE]">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-20"
        >
          <p className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm mb-5">
            Tarifs
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#1A1A1A] leading-tight">
            Des offres claires,
            <br />
            <em className="text-[#B85C2C] not-italic">sans surprise.</em>
          </h2>
          <p className="mt-4 text-[#1A1A1A]/45 font-dm font-light text-base max-w-md leading-relaxed">
            Chaque formule est pensée pour offrir un maximum de valeur, à l'essentiel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <PricingCard {...plan} href={plan.href} />
            </motion.div>
          ))}
        </div>

        {/* Custom project nudge */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-10 border border-[#1A1A1A]/8 bg-[#FAFAF8] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="font-cormorant text-xl text-[#1A1A1A] font-light">
              Un projet hors-norme ?
            </p>
            <p className="mt-1 font-dm text-[13px] text-[#1A1A1A]/50 font-light">
              Parlez-nous de votre vision — nous construisons des solutions sur-mesure.
            </p>
          </div>
          <a
            href="#contact"
            className={cn(
              "group relative overflow-hidden inline-flex items-center shrink-0",
              "px-8 py-3.5 border border-[#1A1A1A]/20 text-[#1A1A1A]",
              "font-dm text-[12px] tracking-[0.2em] uppercase",
              "hover:border-[#B85C2C] hover:text-[#B85C2C] transition-all duration-300",
            )}
          >
            Discutons-en
            <ChevronRight size={13} className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Clients Feedback ─────────────────────────────────────────────────────────

function ClientsFeedbackSection() {
  const col1 = TESTIMONIALS.slice(0, 2);
  const col2 = TESTIMONIALS.slice(2, 4);
  const col3 = TESTIMONIALS.slice(4, 6);

  return (
    <section id="avis" className="py-32 bg-[#1A1A1A] overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-20 text-center"
        >
          <p className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm mb-5">
            Témoignages
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#FAFAF8] leading-tight">
            Ce qu&apos;ils en disent
          </h2>
          <p className="mt-5 text-[#FAFAF8]/40 font-dm font-light text-base max-w-sm mx-auto leading-relaxed">
            La confiance de nos clients est notre meilleure réalisation.
          </p>
        </motion.div>

        {/* TestimonialsColumn — from clients_feedback.txt */}
        <div
          className={cn(
            "flex justify-center gap-5 overflow-hidden",
            "max-h-[680px]",
            "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
          )}
        >
          <TestimonialsColumn testimonials={col1} duration={20} />
          <TestimonialsColumn testimonials={col2} duration={25} className="hidden md:block" />
          <TestimonialsColumn testimonials={col3} duration={17} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FaqSection() {
  return (
    <section id="approche" className="py-32 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">
          {/* Left: heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="max-w-md"
          >
            <p className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm mb-5">
              FAQ
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#1A1A1A] leading-tight">
              Questions
              <br />
              <em className="text-[#B85C2C] not-italic">fréquentes</em>
            </h2>
            <p className="mt-6 text-[#1A1A1A]/45 font-dm font-light text-base leading-relaxed">
              Tout ce que vous devez savoir avant de démarrer votre projet avec nous. Une question qui manque ?
              Écrivez-nous.
            </p>
          </motion.div>

          {/* Right: FAQ trigger — adapted from faq_button.txt (Dialog) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-auto"
          >
            {/* Quick FAQ preview */}
            <div className="mb-8 space-y-4 max-w-md">
              {FAQ_ITEMS.slice(0, 3).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[#1A1A1A]/6 pb-4"
                >
                  <p className="font-dm text-[14px] text-[#1A1A1A] font-medium">{item.q}</p>
                  <p className="mt-1.5 font-dm text-[13px] text-[#1A1A1A]/45 font-light leading-relaxed line-clamp-2">
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  className={cn(
                    "group flex items-center gap-4 px-9 py-4",
                    "border border-[#B85C2C] text-[#B85C2C]",
                    "font-dm text-[12px] tracking-[0.22em] uppercase",
                    "hover:bg-[#B85C2C] hover:text-white transition-all duration-300",
                  )}
                >
                  <span>Voir toutes les questions</span>
                  <svg
                    width={13}
                    height={13}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </DialogTrigger>

              <DialogContent
                className={cn(
                  "bg-[#FAFAF8] border border-[#1A1A1A]/8 !rounded-none",
                  "sm:max-w-[500px] max-h-[82vh] overflow-y-auto",
                )}
              >
                <DialogHeader className="pb-5 border-b border-[#1A1A1A]/8">
                  <DialogTitle className="font-cormorant text-2xl font-light text-[#1A1A1A]">
                    Questions fréquentes
                  </DialogTitle>
                </DialogHeader>
                <div className="pt-5 space-y-6">
                  {FAQ_ITEMS.map((item, i) => (
                    <div key={i} className="pb-6 border-b border-[#1A1A1A]/5 last:border-0 last:pb-0">
                      <h3 className="font-dm font-medium text-[#1A1A1A] text-[14px] mb-2.5">
                        {item.q}
                      </h3>
                      <p className="font-dm text-[13px] text-[#1A1A1A]/55 leading-relaxed font-light">
                        {item.a}
                      </p>
                    </div>
                  ))}
                  <div className="pt-2">
                    <a
                      href="mailto:wabistudio.contact@gmail.com"
                      className={cn(
                        "inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase",
                        "font-dm text-[#B85C2C] border-b border-[#B85C2C]/40",
                        "hover:border-[#B85C2C] transition-colors pb-0.5",
                      )}
                    >
                      Une autre question ? Écrivez-nous
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-[#F5F2EE]">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-start gap-20">
          {/* Left: heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="lg:max-w-xs shrink-0"
          >
            <p className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm mb-5">
              Contact
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#1A1A1A] leading-tight">
              Parlons de
              <br />
              <em className="text-[#B85C2C] not-italic">votre projet.</em>
            </h2>
            <p className="mt-6 text-[#1A1A1A]/45 font-dm font-light text-[13px] leading-relaxed">
              Une idée, une vision, un projet ? Décrivez-le nous — nous vous répondons sous 48 h.
            </p>
            <p className="mt-8 font-dm text-[13px] font-light text-[#1A1A1A]/40">
              Ou directement à{" "}
              <a
                href="mailto:wabistudio.contact@gmail.com"
                className="text-[#B85C2C] border-b border-[#B85C2C]/30 hover:border-[#B85C2C] transition-colors pb-0.5"
              >
                wabistudio.contact@gmail.com
              </a>
            </p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function FooterSection() {
  const SOCIAL_LINKS = [
    {
      label: "Instagram",
      href: "#",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
      label: "LinkedIn",
      href: "#",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
  ];

  return (
    <footer
      className="bg-[#FAFAF8] border-t border-[#1A1A1A]/6 pt-20 pb-10 px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          {/* Brand column — footer adapted from footer.txt (Footer7) */}
          <div className="max-w-xs">
            <a
              href="/"
              className="font-cormorant text-2xl font-semibold tracking-[0.28em] text-[#1A1A1A] hover:text-[#B85C2C] transition-colors block mb-6"
            >
              WABI
            </a>
            <p className="text-[13px] text-[#1A1A1A]/45 font-dm font-light leading-relaxed mb-8">
              Studio de design web fondé sur les principes du wabi-sabi.
              <br />
              L&apos;épure comme philosophie, l&apos;excellence comme standard.
            </p>
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-[#1A1A1A]/30 hover:text-[#B85C2C] transition-colors duration-300"
                >
                  <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h4 className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/70 uppercase font-dm font-medium mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[13px] text-[#1A1A1A]/40 font-dm hover:text-[#B85C2C] transition-colors duration-300 font-light"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#1A1A1A]/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#1A1A1A]/28 font-dm">
            © 2025 WABI Studio. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {[
              { name: "Mentions légales", href: "/mentions-legales" },
              { name: "Confidentialité", href: "/confidentialite" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] text-[#1A1A1A]/28 font-dm hover:text-[#B85C2C] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WABIHomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] antialiased">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <RealisationsSection />
        <PricingSection />
        <ClientsFeedbackSection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
