import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import "./styles.css";

import IndexPage from "./pages/index";
import ConsentPage from "./pages/consent";
import OfferPage from "./pages/offer";
import PrivacyPage from "./pages/privacy";
import NotFoundPage from "./pages/not-found";
import UnsubscribePage from "./pages/unsubscribe";

import AdminLayout from "./pages/admin/layout";
import AdminLogin from "./pages/admin/login";
import AdminIndex from "./pages/admin/index";
import AdminSchedule from "./pages/admin/schedule";
import AdminBookings from "./pages/admin/bookings";
import AdminInstructors from "./pages/admin/instructors";
import AdminDirections from "./pages/admin/directions";
import AdminSettings from "./pages/admin/settings";
import AdminAccount from "./pages/admin/account";

function SmoothScrollSetup() {
  React.useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo(0, 0);
    }
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"], a[href*="/#"]',
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const url = new URL(target.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const id = url.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SmoothScrollSetup />
          <Toaster position="top-center" richColors />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/consent" element={<ConsentPage />} />
            <Route path="/offer" element={<OfferPage />} />
            <Route path="/payments" element={<Navigate to="/offer" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminIndex />} />
              <Route path="schedule" element={<AdminSchedule />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="instructors" element={<AdminInstructors />} />
              <Route path="directions" element={<AdminDirections />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="account" element={<AdminAccount />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
