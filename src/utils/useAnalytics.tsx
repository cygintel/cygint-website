import { useEffect, useCallback } from 'react';
import { trackEvent, trackBusinessEvents, trackEcommerce, isGALoaded } from './analytics';

// Custom hook for Google Analytics in React components
export const useAnalytics = () => {
  // Check if GA is loaded
  const isLoaded = useCallback(() => isGALoaded(), []);

  // Generic event tracking
  const track = useCallback((eventName: string, parameters?: Record<string, any>) => {
    trackEvent(eventName, parameters);
  }, []);

  // Business event tracking methods
  const business = useCallback(() => ({
    contactForm: (formType?: string) => trackBusinessEvents.contactFormSubmit(formType),
    demoRequest: (source?: string) => trackBusinessEvents.demoRequest(source),
    newsletter: (location?: string) => trackBusinessEvents.newsletterSignup(location),
    download: (fileName: string, fileType?: string) => trackBusinessEvents.downloadFile(fileName, fileType),
    videoPlay: (title: string, duration?: number) => trackBusinessEvents.videoPlay(title, duration),
    pricing: (action: string, plan?: string) => trackBusinessEvents.pricingInteraction(action, plan),
    externalLink: (url: string, text: string) => trackBusinessEvents.externalLinkClick(url, text),
    search: (term: string, resultsCount?: number) => trackBusinessEvents.siteSearch(term, resultsCount),
  }), []);

  // E-commerce tracking methods
  const ecommerce = useCallback(() => ({
    purchase: (transactionId: string, value: number, currency?: string, items?: any[]) =>
      trackEcommerce.purchase(transactionId, value, currency, items),
    addToCart: (itemId: string, itemName: string, value: number, currency?: string) =>
      trackEcommerce.addToCart(itemId, itemName, value, currency),
    beginCheckout: (value: number, currency?: string, items?: any[]) =>
      trackEcommerce.beginCheckout(value, currency, items),
  }), []);

  // Auto-track component mount (useful for page views in SPA)
  const trackPageView = useCallback((title: string, path?: string) => {
    useEffect(() => {
      if (isLoaded()) {
        const pagePath = path || window.location.pathname;
        track('page_view', {
          page_title: title,
          page_path: pagePath,
          page_location: window.location.href,
        });
      }
    }, [title, path]);
  }, [isLoaded, track]);

  // Track button clicks with automatic event naming
  const trackButtonClick = useCallback((buttonName: string, category: string = 'button') => {
    track('click', {
      button_name: buttonName,
      event_category: category,
      event_label: `${category}_clicked`,
    });
  }, [track]);

  // Track form interactions
  const trackFormInteraction = useCallback((formName: string, action: 'start' | 'complete' | 'abandon') => {
    track(`form_${action}`, {
      form_name: formName,
      event_category: 'form',
      event_label: `form_${action}`,
    });
  }, [track]);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number, page?: string) => {
    track('scroll', {
      scroll_depth: depth,
      page_name: page || window.location.pathname,
      event_category: 'engagement',
      event_label: 'scroll_depth',
    });
  }, [track]);

  // Track time on page
  const trackTimeOnPage = useCallback((timeInSeconds: number, pageName?: string) => {
    track('timing_complete', {
      name: 'time_on_page',
      value: timeInSeconds * 1000, // GA expects milliseconds
      page_name: pageName || window.location.pathname,
      event_category: 'engagement',
    });
  }, [track]);

  return {
    isLoaded,
    track,
    business: business(),
    ecommerce: ecommerce(),
    trackPageView,
    trackButtonClick,
    trackFormInteraction,
    trackScrollDepth,
    trackTimeOnPage,
  };
};

// Higher-order component for automatic page view tracking
export const withAnalytics = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  pageTitle: string,
  pagePath?: string
) => {
  return (props: P) => {
    const { trackPageView } = useAnalytics();

    useEffect(() => {
      trackPageView(pageTitle, pagePath);
    }, [trackPageView]);

    return <WrappedComponent {...props} />;
  };
};

// Custom hook for tracking user engagement time
export const useEngagementTracking = (pageName?: string) => {
  const { track } = useAnalytics();
  const startTime = useCallback(() => Date.now(), []);

  useEffect(() => {
    const start = startTime();
    let isActive = true;
    let lastActivity = start;

    const trackEngagement = () => {
      if (isActive) {
        const engagementTime = Date.now() - lastActivity;
        if (engagementTime > 1000) { // Only track if engaged for more than 1 second
          track('user_engagement', {
            engagement_time_msec: engagementTime,
            page_name: pageName || window.location.pathname,
            event_category: 'engagement',
          });
        }
        lastActivity = Date.now();
      }
    };

    const handleActivity = () => {
      isActive = true;
      lastActivity = Date.now();
    };

    const handleInactivity = () => {
      trackEngagement();
      isActive = false;
    };

    // Track various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Track when user becomes inactive
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        handleInactivity();
      } else {
        handleActivity();
      }
    });

    // Track engagement every 30 seconds
    const interval = setInterval(trackEngagement, 30000);

    // Cleanup
    return () => {
      trackEngagement(); // Final engagement tracking
      clearInterval(interval);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [track, pageName, startTime]);
};

// Hook for tracking scroll depth milestones
export const useScrollTracking = (pageName?: string, thresholds: number[] = [25, 50, 75, 90, 100]) => {
  const { trackScrollDepth } = useAnalytics();

  useEffect(() => {
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackScrollDepth(threshold, pageName);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackScrollDepth, pageName, thresholds]);
};
