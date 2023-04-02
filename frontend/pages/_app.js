import { useState } from "react";
import Head from "next/head";

import { MantineProvider, ColorSchemeProvider, AppShell } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { AuthProvider } from "@/context/AuthProvider";
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";

import "@/styles/globals.css";

export default function App(props) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "colorScheme",
    defaultValue: "dark",
  });
  const toggleColorScheme = () => {
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AuthProvider>
            <AppShell header={<MyHeader />} footer={<MyFooter />}>
              <Component {...pageProps} />
            </AppShell>
          </AuthProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
