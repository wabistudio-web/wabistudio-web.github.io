"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "succeeded" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    setErrorMsg(null);

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://formspree.io/f/mwvaorkg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setState("succeeded");
        (e.target as HTMLFormElement).reset();
      } else {
        const json = await res.json();
        const msg =
          json.errors?.[0]?.message ?? "Une erreur est survenue. Réessayez.";
        setErrorMsg(msg);
        setState("error");
      }
    } catch {
      setErrorMsg("Impossible d'envoyer le message. Vérifiez votre connexion.");
      setState("error");
    }
  };

  if (state === "succeeded") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-16"
      >
        <p className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm mb-4">
          Message envoyé
        </p>
        <h3 className="font-cormorant text-3xl font-light text-[#1A1A1A]">
          Merci pour votre message.
        </h3>
        <p className="mt-4 font-dm text-[13px] text-[#1A1A1A]/50 font-light max-w-sm leading-relaxed">
          Nous vous répondrons dans les plus brefs délais — généralement sous 24 à 48 heures.
        </p>
      </motion.div>
    );
  }

  const inputClass = cn(
    "w-full h-11 px-4 bg-transparent border border-[#1A1A1A]/12",
    "font-dm text-[13px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25",
    "focus:outline-none focus:border-[#B85C2C] transition-colors duration-300",
  );

  const labelClass =
    "block text-[11px] tracking-[0.3em] uppercase font-dm text-[#1A1A1A]/55 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom complet
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Marie Dupont"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="marie@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="projet" className={labelClass}>
          Type de projet
        </label>
        <input
          id="projet"
          type="text"
          name="projet"
          placeholder="Landing page, site vitrine, identité visuelle…"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre projet, vos objectifs, votre univers…"
          className={cn(
            "w-full px-4 py-3 bg-transparent border border-[#1A1A1A]/12",
            "font-dm text-[13px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25",
            "focus:outline-none focus:border-[#B85C2C] transition-colors duration-300 resize-none",
          )}
        />
      </div>

      {errorMsg && (
        <p className="text-[12px] text-red-400 font-dm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className={cn(
          "group relative overflow-hidden inline-flex items-center",
          "px-10 py-4 bg-[#B85C2C] text-white",
          "font-dm text-[12px] tracking-[0.22em] uppercase",
          "disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300",
        )}
      >
        <span className="mr-10 transition-opacity duration-500 group-hover:opacity-0">
          {state === "submitting" ? "Envoi…" : "Envoyer le message"}
        </span>
        <i className="absolute right-1 top-1 bottom-1 grid w-9 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
          <ChevronRight size={15} />
        </i>
      </button>
    </form>
  );
}
