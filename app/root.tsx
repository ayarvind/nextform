import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import "./tailwind.css";
import { DOT_ENV } from "./client-dotenv";
import { UserProvider } from "./context/useUserContext";
import App from "./App";

// Links for fonts and styles
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Loader function to pass environment variables to the front-end
export const loader: LoaderFunction = async () => {
  return json({
    env: DOT_ENV,
  });
};

// Layout component for the application
export default function Layout({ children }: { children: React.ReactNode }) {
  const { env } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)};`,
          }}
        />
        <UserProvider>
          <App>{children}</App>
          <ScrollRestoration />
          <Outlet />
          <Scripts />
        </UserProvider>
      </body>
    </html>
  );
}