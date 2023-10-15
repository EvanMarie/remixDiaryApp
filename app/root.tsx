import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import CustomTheme from "./styles/customTheme";
import Navigation from "./components/navigation";
import styles from "./styles/global.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <ChakraProvider theme={CustomTheme}>
          <Flex w="100vw" h="100vh" justify="center">
            <Navigation />
            <Flex w="100%" pt="70px" justify="center">
              <Outlet />
            </Flex>
          </Flex>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
