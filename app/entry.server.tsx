/** @jsxImportSource https://esm.sh/react */
import { StrictMode } from "https://esm.sh/react";
import ReactDOMServer from "https://esm.sh/react-dom/server";
import { StaticRouter } from "https://esm.sh/react-router-dom/server";

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
