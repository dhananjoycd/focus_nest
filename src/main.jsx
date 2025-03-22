import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeProvider from "./Providers/ThemeContext/ThemeContext.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router/Router.jsx";
import FinanceProvider from "./Providers/FinanceContext/FinanceProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <HelmetProvider>
          <FinanceProvider>
            <RouterProvider router={router} />
          </FinanceProvider>
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
