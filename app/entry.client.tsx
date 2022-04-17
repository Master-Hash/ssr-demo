/** @jsxImportSource https://esm.sh/react */
/// <reference lib="DOM" />
import { StrictMode } from "https://esm.sh/react";
import { hydrateRoot } from "https://esm.sh/react-dom/client";
import { BrowserRouter } from "https://esm.sh/react-router-dom";
import { App } from "./root.tsx";

const root = hydrateRoot(
  document.querySelector("html")!,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
