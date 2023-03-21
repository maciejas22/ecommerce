import { useEffect, useState } from "react";

import { MantineProvider, ColorSchemeProvider, AppShell } from "@mantine/core";

import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

import "./App.css";
import MyHeader from "./components/MyHeader";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import PoliciesPage from "./pages/PoliciesPage";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthProvider";

const categories = [
  { name: "TVs", slug: "tvs" },
  { name: "Audio", slug: "audio" },
  { name: "Smartphones", slug: "smartphones" },
  { name: "Computers", slug: "computers" },
  { name: "Consoles and games", slug: "consoles-and-games" },
  { name: "Fridges", slug: "fridges" },
  { name: "Microwaves", slug: "microwaves" },
  { name: "Washing machines", slug: "washing-machines" },
];

const unprotectedLinks = [
  { name: "Home", url: "/", element: <MainPage /> },
  { name: "Serach", url: "/search", element: <SearchResults /> },
  { name: "Contact", url: "/contact", element: <ContactPage /> },
  {
    name: "Policies",
    url: "/terms-and-conditions",
    element: <PoliciesPage />,
  },
  ...categories.map((category) => ({
    name: category.name,
    url: category.slug,
    element: (
      <CategoryPage categoryName={category.name} categorySlug={category.slug} />
    ),
  })),
];

const protectedLinks = [
  {
    name: "Login",
    url: "/login",
    element: <LoginPage />,
    permissions: "anonymousUser",
  },
  {
    name: "Register",
    url: "/register",
    element: <RegisterPage />,
    permissions: "anonymousUser",
  },
  {
    name: "Account",
    url: "/account",
    element: <AccountPage />,
    permissions: "authUser",
  },
];

function App() {
  const [colorScheme, setColorScheme] = useState("dark");
  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <BrowserRouter>
          <AuthProvider>
            <AppShell
              header={<MyHeader categories={categories} />}
              footer={<Footer />}
            >
              <Routes>
                {unprotectedLinks.map((link) => (
                  <Route
                    key={link.name}
                    path={link.url}
                    element={link.element}
                    errorElement={<ErrorPage />}
                  />
                ))}
                {protectedLinks.map((link) => (
                  <Route
                    key={link.name}
                    path={link.url}
                    element={
                      <PrivateRoute permissions={link.permissions}>
                        {link.element}
                      </PrivateRoute>
                    }
                    errorElement={<ErrorPage />}
                  />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppShell>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
