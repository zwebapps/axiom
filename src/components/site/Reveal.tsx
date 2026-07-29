import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "li" | "span" | "article";
}) {

  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      data-shown={shown}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Comp>
  );
}
