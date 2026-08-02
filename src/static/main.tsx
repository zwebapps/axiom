import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles.css";

import { StaticApp } from "./StaticApp";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Static app mount point #root not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <StaticApp />
  </StrictMode>,
);
