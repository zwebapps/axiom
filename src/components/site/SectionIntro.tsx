"use client";

import type { RevealVariant } from "@/lib/motion-presets";
import { RevealItem, RevealStagger } from "./Reveal";
import { SplitText } from "./SplitText";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleClassName?: string;
  className?: string;
  align?: "left" | "center";
  descriptionClassName?: string;
  descriptionVariant?: RevealVariant;
  /** Set false to reveal the heading as one block instead of word by word. */
  splitTitle?: boolean;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  titleClassName = "mt-5 font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.14] font-light whitespace-pre-line",
  className = "",
  align = "left",
  descriptionClassName = "mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground",
  descriptionVariant = "slideRight",
  splitTitle = true,
}: SectionIntroProps) {
  const alignClass = align === "center" ? "mx-auto max-w-xl text-center" : "";
  const descClass = align === "center" ? `${descriptionClassName} mx-auto` : descriptionClassName;

  return (
    <RevealStagger className={`${alignClass} ${className}`.trim()} stagger={0.16}>
      <RevealItem variant="blur">
        <p className="eyebrow">{eyebrow}</p>
      </RevealItem>
      {splitTitle ? (
        // SplitText renders its own newlines, so drop `whitespace-pre-line`
        // to avoid doubling the line breaks.
        <SplitText text={title} className={titleClassName.replace("whitespace-pre-line", "")} />
      ) : (
        <RevealItem variant="rise">
          <h2 className={titleClassName}>{title}</h2>
        </RevealItem>
      )}
      {description ? (
        <RevealItem variant={descriptionVariant}>
          <p className={descClass}>{description}</p>
        </RevealItem>
      ) : null}
    </RevealStagger>
  );
}
