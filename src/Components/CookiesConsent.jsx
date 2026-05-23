"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if user has not already given consent
    if (!localStorage.getItem("ga_consent")) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ga_consent", "granted");

    // ✅ Enable GA tracking if already loaded
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("consent", "update", { analytics_storage: "granted" });

    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("ga_consent", "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-[999] flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
      <p>
        We use cookies for analytics to improve your experience. See our{" "}
        <a href="/terms#privacy-policy" className="underline text-cyan-400">
          Privacy Policy
        </a>.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleDecline}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
