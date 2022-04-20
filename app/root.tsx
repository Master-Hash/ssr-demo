/** @jsxImportSource https://esm.sh/react */
import { Routes, Route, Outlet, Link } from "https://esm.sh/react-router-dom";
import { Home } from "./routes/index.tsx";
import { Dashboard } from "./routes/dashboard.tsx";
import { About } from "./routes/about.tsx";
import { Count } from "./routes/count.tsx";

export function App() {
  return <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="count" element={<Count />} />
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
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR Demo</title>
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
