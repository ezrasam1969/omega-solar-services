import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Omega PO service worker registration failed:", error);
      });
    };

    if (document.readyState === "loading") {
      window.addEventListener("load", register, { once: true });
    } else {
      register();
    }

    return () => {
      window.removeEventListener("load", register);
    };
  }, []);

  return null;
}
