/** @jsxImportSource react */
/// <reference lib="DOM" />
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./root.tsx";

const root = hydrateRoot(
  document.querySelector("html")!,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
