/**
 * Google Analytics 4 + Google Tag Manager Enhanced Tracking
 * TechFlow Solutions - Advanced Event Tracking
 */

// Initialize dataLayer if it doesn't exist
window.dataLayer = window.dataLayer || [];

// GTM gtag function
function gtag() {
    dataLayer.push(arguments);
}

// Enhanced tracking functions
const TechFlowAnalytics = {
    
    // Track phone number clicks
    trackPhoneClick: function(phoneNumber) {
        gtag('event', 'phone_click', {
            'phone_number': phoneNumber,
            'event_category': 'contact',
            'event_label': 'Phone Click',
            'value': 1
        });
        console.log('Analytics: Phone click tracked -', phoneNumber);
    },

    // Track form submissions
    trackFormSubmission: function(formType, formId) {
        gtag('event', formType + '_form_submit', {
            'form_type': formType,
            'form_id': formId,
            'event_category': 'form',
            'event_label': formType + ' Form Submission',
            'value': 1
        });
        console.log('Analytics: Form submission tracked -', formType);
    },

    // Track CTA button clicks
    trackCTAClick: function(buttonText, buttonLocation) {
        gtag('event', 'cta_click', {
            'button_text': buttonText,
            'button_location': buttonLocation,
            'event_category': 'engagement',
            'event_label': 'CTA Click',
            'value': 1
        });
        console.log('Analytics: CTA click tracked -', buttonText);
    },

    // Track service page visits
    trackServicePageView: function(serviceType) {
        gtag('event', 'service_page_view', {
            'service_type': serviceType,
            'event_category': 'page_view',
            'event_label': 'Service Page View',
            'value': 1
        });
        console.log('Analytics: Service page view tracked -', serviceType);
    },

    // Track remote support interactions
    trackRemoteSupportClick: function(actionType) {
        gtag('event', 'remote_support_click', {
            'action_type': actionType,
            'event_category': 'conversion',
            'event_label': 'Remote Support Click',
            'value': 1
        });
        console.log('Analytics: Remote support click tracked -', actionType);
    },

    // Track file downloads
    trackFileDownload: function(fileName, fileType) {
        gtag('event', 'file_download', {
            'file_name': fileName,
            'file_type': fileType,
            'event_category': 'engagement',
            'event_label': 'File Download',
            'value': 1
        });
        console.log('Analytics: File download tracked -', fileName);
    },

    // Track external link clicks
    trackExternalLink: function(url, linkText) {
        gtag('event', 'external_link_click', {
            'link_url': url,
            'link_text': linkText,
            'event_category': 'engagement',
            'event_label': 'External Link Click',
            'value': 1
        });
        console.log('Analytics: External link click tracked -', url);
    },

    // Track scroll depth
    trackScrollDepth: function(percentage) {
        gtag('event', 'scroll_depth', {
            'scroll_percentage': percentage,
            'event_category': 'engagement',
            'event_label': 'Scroll Depth',
            'value': percentage
        });
        console.log('Analytics: Scroll depth tracked -', percentage + '%');
    }
};

// Auto-initialize tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const phoneNumber = this.href.replace('tel:', '').replace(/\D/g, '');
            TechFlowAnalytics.trackPhoneClick(phoneNumber);
        });
    });

    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function() {
            const formId = this.id || 'unknown';
            let formType = 'contact';
            
            // Determine form type based on page or form ID
            if (window.location.pathname.includes('booking')) {
                formType = 'booking';
            } else if (formId.includes('booking')) {
                formType = 'booking';
            } else if (formId.includes('contact')) {
                formType = 'contact';
            }
            
            TechFlowAnalytics.trackFormSubmission(formType, formId);
        });
    });

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn, .cta-button, [class*="btn-"]');
    ctaButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonLocation = window.location.pathname;
            TechFlowAnalytics.trackCTAClick(buttonText, buttonLocation);
        });
    });

    // Track remote support clicks
    const remoteSupportLinks = document.querySelectorAll('a[href*="remote-support"], a[href*="anydesk"]');
    remoteSupportLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const actionType = this.textContent.trim();
            TechFlowAnalytics.trackRemoteSupportClick(actionType);
        });
    });

    // Track service page views
    if (window.location.pathname.includes('services')) {
        TechFlowAnalytics.trackServicePageView('services_overview');
    } else if (window.location.pathname.includes('remote-support')) {
        TechFlowAnalytics.trackServicePageView('remote_support');
    }

    // Track external links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="techflowsolutions.ca"])');
    externalLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const url = this.href;
            const linkText = this.textContent.trim();
            TechFlowAnalytics.trackExternalLink(url, linkText);
        });
    });

    // Track file downloads
    const fileLinks = document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"]');
    fileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const fileName = this.href.split('/').pop();
            const fileType = fileName.split('.').pop();
            TechFlowAnalytics.trackFileDownload(fileName, fileType);
        });
    });

    // Track scroll depth
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    let trackedThresholds = [];

    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            scrollThresholds.forEach(function(threshold) {
                if (scrollPercent >= threshold && !trackedThresholds.includes(threshold)) {
                    trackedThresholds.push(threshold);
                    TechFlowAnalytics.trackScrollDepth(threshold);
                }
            });
        }
    });

    console.log('TechFlow Analytics initialized successfully');
});

// Export for manual tracking if needed
window.TechFlowAnalytics = TechFlowAnalytics;