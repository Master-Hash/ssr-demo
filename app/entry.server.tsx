/** @jsxImportSource react */
import { StrictMode } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { App } from "./root.tsx";

export async function render(url: string) {
  const stream = await ReactDOMServer.renderToReadableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  await stream.allReady;
  return new Response(stream, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
