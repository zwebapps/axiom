import type { ElementType, ReactNode } from "react";

type PageWrapProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Same horizontal inset as hero copy (`--page-x`). */
export function PageWrap({ as: Tag = "div", className = "", children }: PageWrapProps) {
  return <Tag className={`page-wrap ${className}`.trim()}>{children}</Tag>;
}
