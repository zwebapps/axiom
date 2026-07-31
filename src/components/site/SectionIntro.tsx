"use client";

import { RevealItem, RevealStagger } from "./Reveal";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleClassName?: string;
  className?: string;
  align?: "left" | "center";
  descriptionClassName?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  titleClassName = "mt-5 font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.14] font-light whitespace-pre-line",
  className = "",
  align = "left",
  descriptionClassName = "mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground",
}: SectionIntroProps) {
  const alignClass = align === "center" ? "mx-auto max-w-xl text-center" : "";
  const descClass =
    align === "center" ? `${descriptionClassName} mx-auto` : descriptionClassName;

  return (
    <RevealStagger className={`${alignClass} ${className}`.trim()} stagger={0.16}>
      <RevealItem variant="blur">
        <p className="eyebrow">{eyebrow}</p>
      </RevealItem>
      <RevealItem variant="rise">
        <h2 className={titleClassName}>{title}</h2>
      </RevealItem>
      {description ? (
        <RevealItem variant="slideRight">
          <p className={descClass}>{description}</p>
        </RevealItem>
      ) : null}
    </RevealStagger>
  );
}
