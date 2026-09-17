"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

interface DeferredAnalyticsProps {
  gaId?: string;
  gtmId?: string;
}

export function DeferredAnalytics({ gaId, gtmId }: DeferredAnalyticsProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load if valid IDs are provided and not placeholders
    const hasValidGA = gaId && gaId !== "G-XXXXXXXXXX" && !gaId.includes("XXXX");
    const hasValidGTM = gtmId && gtmId !== "GTM-XXXXXXX" && !gtmId.includes("XXXX");

    if (!hasValidGA && !hasValidGTM) {
      return;
    }

    let loaded = false;
    const triggerLoad = () => {
      if (!loaded) {
        loaded = true;
        setShouldLoad(true);
        cleanup();
      }
    };

    const cleanup = () => {
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("click", triggerLoad);
      window.removeEventListener("keydown", triggerLoad);
    };

    // Listen for first user interaction
    window.addEventListener("scroll", triggerLoad, { passive: true, once: true });
    window.addEventListener("touchstart", triggerLoad, { passive: true, once: true });
    window.addEventListener("mousemove", triggerLoad, { passive: true, once: true });
    window.addEventListener("click", triggerLoad, { passive: true, once: true });
    window.addEventListener("keydown", triggerLoad, { passive: true, once: true });

    // Fallback: load during idle time or after 3.5s timeout
    if ("requestIdleCallback" in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
        () => triggerLoad(),
        { timeout: 3500 }
      );
      return () => {
        cleanup();
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(triggerLoad, 3500);
      return () => {
        cleanup();
        clearTimeout(timer);
      };
    }
  }, [gaId, gtmId]);

  if (!shouldLoad) return null;

  const validGA = gaId && gaId !== "G-XXXXXXXXXX" && !gaId.includes("XXXX") ? gaId : null;
  const validGTM = gtmId && gtmId !== "GTM-XXXXXXX" && !gtmId.includes("XXXX") ? gtmId : null;

  return (
    <>
      {/* Google Tag Manager */}
      {validGTM && (
        <Script
          id="gtm-deferred-loader"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${validGTM}');`,
          }}
        />
      )}

      {/* Google Analytics 4 */}
      {validGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${validGA}`}
            strategy="lazyOnload"
          />
          <Script
            id="ga-deferred-loader"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${validGA}', { page_path: window.location.pathname });`,
            }}
          />
        </>
      )}
    </>
  );
}
