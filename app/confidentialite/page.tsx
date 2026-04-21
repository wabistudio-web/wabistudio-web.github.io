import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";

type SectionItem = { label: string; value: string; href?: string };

export const metadata: Metadata = {
  title: "Politique de confidentialité — WABI Studio",
};

const SECTIONS: { number: string; title: string; body?: string; items?: SectionItem[] }[] = [
  {
    number: "01.",
    title: "Responsable du traitement",
    body: "La présente politique définit la manière dont WABI Studio, représenté par Wladimir Bigand, collecte et traite les données à caractère personnel.",
    items: [
      {
        label: "Contact",
        value: "contact@wabistudio.fr",
        href: "mailto:contact@wabistudio.fr",
      },
    ],
  },
  {
    number: "02.",
    title: "Données collectées",
    body: "Nous collectons uniquement les informations que vous nous transmettez volontairement via le formulaire de contact. Ces informations incluent :",
    items: [
      { label: "Identité", value: "Nom et prénom." },
      { label: "Contact", value: "Adresse email." },
      {
        label: "Contenu",
        value:
          "Toute information relative à votre projet web que vous choisirez de partager dans votre message.",
      },
    ],
  },
  {
    number: "03.",
    title: "Finalité de la collecte",
    items: [
      {
        label: "Demandes",
        value: "Répondre à vos demandes d'informations ou de devis.",
      },
      {
        label: "Suivi",
        value:
          "Assurer le suivi de la relation commerciale si un contrat est établi.",
      },
      {
        label: "Technique",
        value: "Optimiser le fonctionnement technique du site.",
      },
      {
        label: "Engagement",
        value:
          "WABI Studio ne revend, ne loue, ni ne cède jamais vos données personnelles à des tiers à des fins de prospection commerciale.",
      },
    ],
  },
  {
    number: "04.",
    title: "Durée de conservation",
    items: [
      {
        label: "Prospects",
        value:
          "Si aucun contrat n'est conclu, vos données sont supprimées dans un délai de 3 ans après le dernier contact de votre part.",
      },
      {
        label: "Clients",
        value:
          "En cas de collaboration, les données sont conservées pendant toute la durée de la prestation et durant la période légale de conservation des documents comptables.",
      },
    ],
  },
  {
    number: "05.",
    title: "Services tiers",
    body: "Pour assurer le fonctionnement optimal du site, nous utilisons les services de confiance suivants. Ces prestataires traitent vos données conformément aux clauses contractuelles de l'Union Européenne.",
    items: [
      {
        label: "Hébergement",
        value:
          "GitHub Pages (États-Unis) — la politique de sécurité de GitHub assure la protection des fichiers du site.",
      },
      {
        label: "Formulaires",
        value:
          "Formspree (États-Unis) — utilisé pour acheminer vos messages vers notre boîte mail sécurisée.",
      },
    ],
  },
  {
    number: "06.",
    title: "Vos droits",
    body: "Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits suivants sur vos données :",
    items: [
      { label: "Accès", value: "Droit d'accès et de rectification de vos informations." },
      { label: "Suppression", value: "Droit de suppression (droit à l'oubli)." },
      { label: "Opposition", value: "Droit d'opposition au traitement de vos données." },
      {
        label: "Exercer vos droits",
        value: "contact@wabistudio.fr",
        href: "mailto:contact@wabistudio.fr",
      },
    ],
  },
  {
    number: "07.",
    title: "Cookies",
    body: "Ce site est conçu pour être le plus léger et respectueux possible. Nous n'utilisons aucun cookie de pistage publicitaire ni aucun service de profilage. Seuls des cookies techniques essentiels au bon fonctionnement du site peuvent être déposés.",
  },
];

export default function Confidentialite() {
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
            <svg
              width={13}
              height={13}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
            Données personnelles
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#1A1A1A] leading-tight">
            Politique de
            <br />
            <em className="text-[#B85C2C] not-italic">confidentialité.</em>
          </h1>
          <p className="mt-4 font-dm text-[13px] text-[#1A1A1A]/40 font-light">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
            « Informatique et Libertés ».
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
                    <p className="font-dm text-[13px] text-[#1A1A1A]/60 font-light leading-relaxed mb-5">
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
                              <a
                                href={item.href}
                                className="text-[#B85C2C] hover:underline underline-offset-2"
                              >
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
            <svg
              width={13}
              height={13}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
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
