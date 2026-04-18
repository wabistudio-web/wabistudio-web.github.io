import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions légales — WABI Studio",
};

const SECTIONS = [
  {
    number: "01.",
    title: "Édition du site",
    items: [
      { label: "Raison sociale", value: "Wladimir BIGAND" },
      { label: "Siège social", value: "155 Av. Jean Jaurès, 47000 Agen" },
      { label: "SIRET", value: "En cours d'enregistrement" },
      { label: "Email", value: "wabistudio.contact@gmail.com", href: "mailto:wabistudio.contact@gmail.com" },
      { label: "Directeur de la publication", value: "Wladimir BIGAND" },
    ],
  },
  {
    number: "02.",
    title: "Hébergement",
    items: [
      { label: "Hébergeur", value: "GitHub, Inc." },
      { label: "Adresse", value: "88 Colin P. Kelly Jr. St, San Francisco, CA 94107, États-Unis" },
      { label: "Téléphone", value: "+1 877 448 4820" },
      { label: "Site web", value: "github.com/pages", href: "https://pages.github.com" },
    ],
  },
  {
    number: "03.",
    title: "Propriété intellectuelle",
    body: "L'ensemble de ce site, notamment les textes, logos, représentations iconographiques et photographiques, relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite, sauf autorisation écrite préalable de l'auteur.",
  },
  {
    number: "04.",
    title: "Données personnelles",
    items: [
      { label: "Finalité", value: "Les données collectées via le formulaire de contact servent uniquement à répondre à vos demandes de prestations." },
      { label: "Conservation", value: "Les données sont conservées pendant une durée maximale de 3 ans après le dernier contact." },
      { label: "Droits", value: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant : wabistudio.contact@gmail.com." },
    ],
  },
  {
    number: "05.",
    title: "Cookies",
    body: "Ce site n'utilise aucun cookie nécessitant le consentement préalable de l'utilisateur. Seuls des cookies techniques nécessaires au fonctionnement du site peuvent être déposés.",
  },
  {
    number: "06.",
    title: "Dispositions fiscales",
    body: "TVA non applicable, article 293 B du Code général des impôts.",
  },
];

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] antialiased">
      {/* Header */}
      <header className="border-b border-[#1A1A1A]/6 px-8 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="font-cormorant text-xl font-semibold tracking-[0.3em] text-[#1A1A1A] hover:text-[#B85C2C] transition-colors duration-300"
          >
            WABI
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 font-dm text-[11px] tracking-[0.25em] uppercase text-[#1A1A1A]/45 hover:text-[#B85C2C] transition-colors duration-300"
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Retour
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-20">
        {/* Title */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.55em] text-[#B85C2C] uppercase font-dm mb-5">
            Informations légales
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#1A1A1A] leading-tight">
            Mentions légales
          </h1>
          <p className="mt-4 font-dm text-[13px] text-[#1A1A1A]/40 font-light">
            Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {SECTIONS.map((section) => (
            <div key={section.number} className="border-t border-[#1A1A1A]/6 pt-10">
              <div className="flex items-start gap-8 flex-col sm:flex-row">
                <p className="font-cormorant text-sm tracking-[0.35em] text-[#B85C2C] shrink-0 pt-0.5">
                  {section.number}
                </p>
                <div className="flex-1">
                  <h2 className="font-cormorant text-2xl font-light text-[#1A1A1A] mb-5">
                    {section.title}
                  </h2>
                  {section.body && (
                    <p className="font-dm text-[13px] text-[#1A1A1A]/60 font-light leading-relaxed">
                      {section.body}
                    </p>
                  )}
                  {section.items && (
                    <dl className="space-y-3">
                      {section.items.map((item) => (
                        <div key={item.label} className="flex flex-col sm:flex-row sm:gap-6">
                          <dt className="font-dm text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A]/35 shrink-0 sm:w-44 pt-0.5">
                            {item.label}
                          </dt>
                          <dd className="font-dm text-[13px] text-[#1A1A1A]/70 font-light leading-relaxed">
                            {item.href ? (
                              <a href={item.href} className="text-[#B85C2C] hover:underline underline-offset-2">
                                {item.value}
                              </a>
                            ) : (
                              item.value
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back CTA */}
        <div className="mt-20 pt-10 border-t border-[#1A1A1A]/6">
          <a
            href="/"
            className="group inline-flex items-center gap-3 font-dm text-[12px] tracking-[0.2em] uppercase text-[#1A1A1A]/45 hover:text-[#B85C2C] transition-colors duration-300"
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Retour à l'accueil
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A]/5 px-8 py-8 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-dm text-[11px] text-[#1A1A1A]/28">
            © 2025 WABI Studio. Tous droits réservés.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 font-dm text-[11px] tracking-[0.2em] uppercase text-[#B85C2C] hover:text-[#A04E25] transition-colors"
          >
            Démarrer un projet
            <ChevronRight size={11} />
          </a>
        </div>
      </footer>
    </div>
  );
}
