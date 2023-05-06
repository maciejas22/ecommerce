import Head from "next/head";

import {AppShell, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {useLocalStorage} from "@mantine/hooks";
import {AuthProvider} from "@/context/AuthProvider";
import {CartProvider} from "@/context/CartProvider";
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";

import "@/styles/globals.css";

export default function App(props) {
    const {Component, pageProps} = props;

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
                <title>MyShop</title>
                <link rel="icon" href="/favicon.svg"/>
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
                    theme={{colorScheme}}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <AuthProvider>
                        <CartProvider>
                            <Notifications/>
                            <AppShell header={<MyHeader/>} footer={<MyFooter/>}>
                                <Component {...pageProps} />
                            </AppShell>
                        </CartProvider>
                    </AuthProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}
