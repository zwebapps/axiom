import type { heroClientLogos } from "@/content/site";

type ClientId = (typeof heroClientLogos)[number];

type HeroClientLogoProps = {
  id: ClientId;
  className?: string;
};

const iconClass = "client__icon shrink-0";

export function HeroClientLogo({ id, className = "" }: HeroClientLogoProps) {
  const root = `client client--${id} ${className}`.trim();

  switch (id) {
    case "siemens":
      return (
        <span className={root} aria-label="Siemens">
          <span className="client__word client__word--siemens">SIEMENS</span>
        </span>
      );
    case "dpworld":
      return (
        <span className={root} aria-label="DP World">
          <svg className={iconClass} width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden>
            <path
              d="M4 11c4-7 10-9 14-6 2 2 2 5 0 7-3 3-9 2-12-1M24 11c-4 7-10 9-14 6-2-2-2-5 0-7 3-3 9-2 12 1"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path d="M14 4v14" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
          </svg>
          <span className="client__word">DP WORLD</span>
        </span>
      );
    case "standard-chartered":
      return (
        <span className={root} aria-label="Standard Chartered">
          <svg className={iconClass} width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
            <path
              d="M13 3c3 4 6 4 8 2 1 3-1 7-5 9M13 23c-3-4-6-4-8-2-1-3 1-7 5-9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M13 8c2 3 4 3 5 1M13 18c-2-3-4-3-5-1"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity=".85"
            />
          </svg>
          <span className="client__word client__word--sc">Standard Chartered</span>
        </span>
      );
    case "aramco":
      return (
        <span className={root} aria-label="Aramco">
          <span className="client__word client__word--aramco">aramco</span>
        </span>
      );
    case "emaar":
      return (
        <span className={root} aria-label="Emaar">
          <span className="client__word client__word--emaar">EMAAR</span>
        </span>
      );
    case "ericsson":
      return (
        <span className={root} aria-label="Ericsson">
          <span className="client__word">ERICSSON</span>
          <svg className={iconClass} width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden>
            <path d="M2 3h18M2 9h14M2 15h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      );
    case "unilever":
      return (
        <span className={root} aria-label="Unilever">
          <svg className={iconClass} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <path
              d="M14 2v24M8 6c0 4 2.5 8 6 10M20 6c0 4-2.5 8-6 10M8 22c2-3 4-4 6-4s4 1 6 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="14" cy="8" r="1.2" fill="currentColor" />
            <circle cx="11" cy="14" r="1" fill="currentColor" opacity=".8" />
            <circle cx="17" cy="14" r="1" fill="currentColor" opacity=".8" />
          </svg>
          <span className="client__word client__word--unilever">Unilever</span>
        </span>
      );
    case "pepsico":
      return (
        <span className={root} aria-label="PepsiCo">
          <svg className={iconClass} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M3 11h16M11 3c3 2.5 3 13 0 16M11 3c-3 2.5-3 13 0 16"
              stroke="currentColor"
              strokeWidth="1"
              opacity=".75"
            />
          </svg>
          <span className="client__word">PEPSICO</span>
        </span>
      );
    default:
      return null;
  }
}
