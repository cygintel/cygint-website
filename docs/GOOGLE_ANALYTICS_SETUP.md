# Google Analytics Setup Guide

This guide explains how to set up and use Google Analytics tracking on your Cygint website.

## Quick Setup

### 1. Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or use an existing one
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

You can set the Google Analytics ID in two ways:

#### Option A: Using .env file (Development)

Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Edit `.env` and replace `GA_MEASUREMENT_ID` with your actual measurement ID:

```env
# Google Analytics Configuration
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Development mode - set to false to enable GA in development
DEV_DISABLE_GA=true
```

#### Option B: System Environment Variables (Production)

Set environment variables directly at the system level (useful for production deployments):

```bash
# Linux/macOS
export PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
export DEV_DISABLE_GA=false

# Windows
set PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
set DEV_DISABLE_GA=false
```

**Note:** The system will automatically detect and use environment variables even when no `.env` file is present. System-level variables take precedence over `.env` file values.

### 3. Deploy

Google Analytics is now automatically loaded on all pages. The tracking code will:
- Only load in production by default
- Respect GDPR/privacy settings
- Track page views automatically
- Read configuration from `.env` files or system environment variables

## Environment Variables

| Variable | Description | Required | Default | Source |
|----------|-------------|----------|---------|---------|
| `PUBLIC_GA_MEASUREMENT_ID` | Your GA4 Measurement ID | ✅ Yes | - | `.env` file or system env |
| `DEV_DISABLE_GA` | Disable GA in development | ❌ No | `true` | `.env` file or system env |

**Environment Variable Priority:**
1. System environment variables (highest priority)
2. `.env` file variables
3. Default values (lowest priority)

This means you can override `.env` file settings with system-level environment variables, making it perfect for production deployments where you don't want to store sensitive values in files.

## Usage Examples

### Basic Event Tracking

```javascript
import { trackEvent } from '../utils/analytics';

// Track a custom event
trackEvent('button_click', {
  button_name: 'cta_hero',
  page_location: '/home'
});
```

### React Components

```jsx
import { useAnalytics } from '../utils/useAnalytics';

function ContactForm() {
  const analytics = useAnalytics();

  const handleSubmit = () => {
    analytics.business.contactForm('main_contact');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form content */}
    </form>
  );
}
```

### Common Business Events

```javascript
import { useAnalytics } from '../utils/useAnalytics';

function MyComponent() {
  const analytics = useAnalytics();

  // Demo request
  const handleDemoRequest = () => {
    analytics.business.demoRequest('pricing_page');
  };

  // Newsletter signup
  const handleNewsletterSignup = () => {
    analytics.business.newsletter('footer');
  };

  // File download
  const handleDownload = () => {
    analytics.business.download('cybersecurity_whitepaper.pdf', 'pdf');
  };

  // Pricing interaction
  const handlePricingClick = () => {
    analytics.business.pricing('view_plan', 'enterprise');
  };
}
```

### Automatic Tracking Hooks

```jsx
import { useEngagementTracking, useScrollTracking } from '../utils/useAnalytics';

function BlogPost() {
  // Automatically track user engagement time
  useEngagementTracking('blog_post_title');
  
  // Track scroll depth at 25%, 50%, 75%, 90%, 100%
  useScrollTracking('blog_post_title');

  return <article>{/* content */}</article>;
}
```

## Available Tracking Methods

### Business Events
- `contactForm(formType)` - Contact form submissions
- `demoRequest(source)` - Demo requests
- `newsletter(location)` - Newsletter signups
- `download(fileName, fileType)` - File downloads
- `videoPlay(title, duration)` - Video engagement
- `pricing(action, plan)` - Pricing page interactions
- `externalLink(url, text)` - External link clicks
- `search(term, resultsCount)` - Site search

### E-commerce Events
- `purchase(transactionId, value, currency, items)` - Purchase completion
- `addToCart(itemId, itemName, value, currency)` - Add to cart
- `beginCheckout(value, currency, items)` - Checkout initiation

### General Tracking
- `track(eventName, parameters)` - Custom events
- `trackButtonClick(buttonName, category)` - Button clicks
- `trackFormInteraction(formName, action)` - Form interactions
- `trackScrollDepth(depth, page)` - Scroll tracking
- `trackTimeOnPage(seconds, pageName)` - Time on page

## Privacy & GDPR Compliance

### Consent Management

```javascript
import { updateConsent, initializeConsent } from '../utils/analytics';

// Initialize consent before GA loads
initializeConsent({
  analytics_storage: 'denied',
  ad_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});

// Update consent when user accepts
const handleAcceptCookies = () => {
  updateConsent({
    analytics_storage: 'granted',
    ad_storage: 'granted'
  });
};
```

### User Properties

```javascript
import { setUserProperties } from '../utils/analytics';

// Set user properties for enhanced analytics
setUserProperties({
  user_type: 'enterprise_customer',
  subscription_tier: 'premium',
  company_size: 'large'
});
```

## Development & Testing

### Debug Mode

```javascript
import { enableDebugMode } from '../utils/analytics';

// Enable debug mode for development
if (import.meta.env.DEV) {
  enableDebugMode();
}
```

### Testing Events

1. Open Chrome DevTools
2. Go to Network tab
3. Filter by "collect" or "analytics"
4. Trigger events and verify requests are sent

### GA4 DebugView

1. Enable debug mode in your code
2. Go to GA4 Admin > DebugView
3. See real-time event data

## Best Practices

### Event Naming
- Use lowercase with underscores: `contact_form_submit`
- Be descriptive but concise
- Group related events with common prefixes

### Parameters
- Keep parameter names consistent
- Use meaningful values
- Don't send personally identifiable information (PII)

### Performance
- Events are batched and sent asynchronously
- Minimal impact on page load speed
- Graceful degradation if GA fails to load

## Common Implementation Examples

### CTA Button Tracking
```jsx
function CTAButton({ children, variant = 'primary' }) {
  const analytics = useAnalytics();
  
  const handleClick = () => {
    analytics.trackButtonClick(`cta_${variant}`, 'conversion');
  };
  
  return (
    <button onClick={handleClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
}
```

### Form Tracking
```jsx
function ContactForm() {
  const analytics = useAnalytics();
  const [formStarted, setFormStarted] = useState(false);
  
  const handleFocus = () => {
    if (!formStarted) {
      analytics.trackFormInteraction('contact', 'start');
      setFormStarted(true);
    }
  };
  
  const handleSubmit = () => {
    analytics.trackFormInteraction('contact', 'complete');
    analytics.business.contactForm('main');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onFocus={handleFocus} />
    </form>
  );
}
```

### Page View Tracking (SPA)
```jsx
function ProductPage({ productId }) {
  const analytics = useAnalytics();
  
  useEffect(() => {
    analytics.trackPageView(`Product: ${productId}`, `/product/${productId}`);
  }, [productId]);
  
  return <div>{/* product content */}</div>;
}
```

## Troubleshooting

### GA Not Loading
1. Check your Measurement ID is correct
2. Verify environment variables are set (both `.env` file and system level)
3. Check browser dev tools for console errors
4. Ensure ad blockers aren't interfering

### Environment Variable Issues
1. **Development**: Check if `.env` file exists and contains `PUBLIC_GA_MEASUREMENT_ID`
2. **Production**: Verify system environment variables are set correctly
3. **Priority**: Remember system env vars override `.env` file values
4. **Debugging**: Add `console.log()` to check which values are being used

### Events Not Showing
1. Check GA4 DebugView for real-time data
2. Standard reports can take 24-48 hours to populate
3. Verify event names and parameters are correct

### Development Issues
1. Set `DEV_DISABLE_GA=false` to test in development
2. Use browser network tab to verify requests
3. Check console for analytics utility errors

## Support

For issues with this implementation:
1. Check the browser console for errors
2. Verify your GA4 configuration
3. Test with GA4 DebugView
4. Review the analytics utility code in `/src/utils/analytics.ts`

For Google Analytics questions, refer to the [official GA4 documentation](https://developers.google.com/analytics/devguides/collection/ga4).