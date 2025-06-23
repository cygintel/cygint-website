// Google Analytics utility functions for event tracking
// This module provides a clean interface for tracking GA4 events

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Check if Google Analytics is loaded and available
export const isGALoaded = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

// Get the GA Measurement ID from environment
// Try Astro's import.meta.env first, then fallback to process.env for system-level variables
export const getGAMeasurementId = (): string | undefined => {
  return (
    import.meta.env.PUBLIC_GA_MEASUREMENT_ID ||
    (typeof process !== "undefined" && process.env
      ? process.env.PUBLIC_GA_MEASUREMENT_ID
      : undefined)
  );
};

// Basic event tracking
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>,
): void => {
  if (!isGALoaded()) {
    console.warn("Google Analytics not loaded");
    return;
  }

  window.gtag("event", eventName, parameters);
};

// Page view tracking (useful for SPA navigation)
export const trackPageView = (
  pageTitle: string,
  pagePath: string,
  pageLocation?: string,
): void => {
  if (!isGALoaded()) return;

  window.gtag("config", getGAMeasurementId(), {
    page_title: pageTitle,
    page_path: pagePath,
    page_location: pageLocation || window.location.href,
  });
};

// Common business events
export const trackBusinessEvents = {
  // Contact form submission
  contactFormSubmit: (formType: string = "contact") => {
    trackEvent("contact_form_submit", {
      form_type: formType,
      engagement_time_msec: Date.now(),
    });
  },

  // Demo request
  demoRequest: (source: string = "website") => {
    trackEvent("demo_request", {
      source: source,
      event_category: "engagement",
      event_label: "demo_requested",
    });
  },

  // Newsletter signup
  newsletterSignup: (location: string = "footer") => {
    trackEvent("newsletter_signup", {
      location: location,
      event_category: "engagement",
      event_label: "newsletter_subscribed",
    });
  },

  // Download tracking (whitepapers, case studies, etc.)
  downloadFile: (fileName: string, fileType: string = "pdf") => {
    trackEvent("file_download", {
      file_name: fileName,
      file_type: fileType,
      event_category: "engagement",
      event_label: "file_downloaded",
    });
  },

  // Video engagement
  videoPlay: (videoTitle: string, videoLength?: number) => {
    trackEvent("video_play", {
      video_title: videoTitle,
      video_duration: videoLength,
      event_category: "engagement",
      event_label: "video_started",
    });
  },

  // Pricing page interaction
  pricingInteraction: (action: string, plan?: string) => {
    trackEvent("pricing_interaction", {
      action: action,
      plan_name: plan,
      event_category: "conversion",
      event_label: "pricing_engaged",
    });
  },

  // External link clicks
  externalLinkClick: (url: string, linkText: string) => {
    trackEvent("click", {
      link_url: url,
      link_text: linkText,
      event_category: "engagement",
      event_label: "external_link_clicked",
    });
  },

  // Search functionality
  siteSearch: (searchTerm: string, resultsCount?: number) => {
    trackEvent("search", {
      search_term: searchTerm,
      search_results_count: resultsCount,
      event_category: "engagement",
      event_label: "site_searched",
    });
  },
};

// E-commerce tracking (if applicable)
export const trackEcommerce = {
  // Purchase event
  purchase: (
    transactionId: string,
    value: number,
    currency: string = "USD",
    items: any[] = [],
  ) => {
    trackEvent("purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  },

  // Add to cart
  addToCart: (
    itemId: string,
    itemName: string,
    value: number,
    currency: string = "USD",
  ) => {
    trackEvent("add_to_cart", {
      currency: currency,
      value: value,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          price: value,
          quantity: 1,
        },
      ],
    });
  },

  // Begin checkout
  beginCheckout: (
    value: number,
    currency: string = "USD",
    items: any[] = [],
  ) => {
    trackEvent("begin_checkout", {
      currency: currency,
      value: value,
      items: items,
    });
  },
};

// Conversion tracking
export const trackConversion = (
  conversionLabel: string,
  value?: number,
  currency?: string,
) => {
  if (!isGALoaded()) return;

  const conversionData: Record<string, any> = {
    send_to: `${getGAMeasurementId()}/${conversionLabel}`,
  };

  if (value !== undefined) {
    conversionData.value = value;
  }

  if (currency) {
    conversionData.currency = currency;
  }

  window.gtag("event", "conversion", conversionData);
};

// User properties (for enhanced analytics)
export const setUserProperties = (properties: Record<string, any>) => {
  if (!isGALoaded()) return;

  window.gtag("config", getGAMeasurementId(), {
    user_properties: properties,
  });
};

// Debug mode (useful for development)
export const enableDebugMode = () => {
  if (!isGALoaded()) return;

  window.gtag("config", getGAMeasurementId(), {
    debug_mode: true,
  });
};

// Consent management (for GDPR compliance)
export const updateConsent = (consentSettings: {
  analytics_storage?: "granted" | "denied";
  ad_storage?: "granted" | "denied";
  functionality_storage?: "granted" | "denied";
  personalization_storage?: "granted" | "denied";
  security_storage?: "granted" | "denied";
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", consentSettings);
  }
};

// Initialize consent (call before GA loads)
export const initializeConsent = (defaultConsent: {
  analytics_storage?: "granted" | "denied";
  ad_storage?: "granted" | "denied";
  functionality_storage?: "granted" | "denied";
  personalization_storage?: "granted" | "denied";
  security_storage?: "granted" | "denied";
  wait_for_update?: number;
}) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["consent", "default", defaultConsent]);
  }
};
