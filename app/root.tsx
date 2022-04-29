/** @jsxImportSource react */
import { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home } from "./routes/index.tsx";
import { Dashboard } from "./routes/dashboard.tsx";
import { About } from "./routes/about.tsx";
import { Count } from "./routes/count.tsx";

const Lazy = lazy(() => import("./routes/lazy.tsx"));

export function App() {
  return <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="count" element={<Count />} />
        <Route path="lazy" element={
          <Suspense fallback={<>...</>}>
            {/* @ts-ignore ignore safely */}
            <Lazy />
          </Suspense>
        } />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </>;
}

function Layout() {
  return <>
    <html lang="zh-cn">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR Demo</title>
        {/* <script type="importmap" src="/import_map.json" /> */}
        <script type="importmap" dangerouslySetInnerHTML={{
          __html: `{
            "imports": {
              "std/": "https://deno.land/std@0.136.0/",
              "react": "https://esm.sh/react@18.1.0?dev",
              "react/jsx-runtime": "https://esm.sh/react@18.1.0/jsx-runtime?dev",
              "react-dom/client": "https://esm.sh/react-dom@18.1.0/client?dev",
              "react-dom/server": "https://esm.sh/react-dom@18.1.0/server?dev",
              "react-router-dom": "https://esm.sh/react-router-dom@6.3.0?deps=react@18.1.0&dev",
              "react-router-dom/server": "https://esm.sh/react-router-dom@6.3.0/server?deps=react@18.1.0&dev"
            }
          }
`}} />
      </head>
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/nothing-here">Nothing Here</Link>
              </li>
              <li>
                <Link to="/count">Count</Link>
              </li>
              <li>
                <Link to="/lazy">Lazy</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main><Outlet /></main>
        <footer></footer>
        <script type="module" src="/app/entry.client.tsx" />
      </body>
    </html>
  </>;
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
