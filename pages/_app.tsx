import "tailwindcss/tailwind.css";
import "styles/prism.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Nav from "components/nav";
import { WrapperLayout } from "layouts/global";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav
        navItems={[
          {
            name: "home",
            url: "https://vidhan.io",
          },
          {
            name: "blog",
            url: "/",
          },
          {
            name: "resume",
            url: "https://vidhan.io/resume",
          },
        ]}
      />
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
    </>
  );
}

export default App;
