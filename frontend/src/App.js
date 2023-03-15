import { useState } from "react";

import { MantineProvider, ColorSchemeProvider, AppShell } from "@mantine/core";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MyHeader from "./components/MyHeader";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
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

const unprotectedLinks = [
  { name: "Home", url: "/", element: <MainPage /> },
  { name: "Login", url: "/login", element: <LoginPage /> },
  { name: "Register", url: "/register", element: <RegisterPage /> },
  { name: "Category", url: "/:category", element: <CategoryPage /> },
  { name: "Contact", url: "/contact", element: <ContactPage /> },
  {
    name: "Policies",
    url: "/terms-and-conditions",
    element: <PoliciesPage />,
  },
];

const protectedLinks = [
  { name: "Account", url: "/account", element: <AccountPage /> },
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
            <AppShell header={<MyHeader />} footer={<Footer />}>
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
                    element={<PrivateRoute>{link.element}</PrivateRoute>}
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
