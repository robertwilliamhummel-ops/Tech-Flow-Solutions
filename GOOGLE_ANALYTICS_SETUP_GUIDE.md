# Google Analytics 4 + Google Tag Manager Setup Guide

## Step 1: Set up Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Start measuring" or "Create Property"
3. Enter property details:
   - Property name: "TechFlow Solutions"
   - Reporting time zone: "Canada/Eastern"
   - Currency: "Canadian Dollar (CAD)"
4. Select "Web" as platform
5. Enter website URL: `https://techflowsolutions.ca`
6. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`) - you'll need this for GTM

## Step 2: Set up Google Tag Manager Container

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Click "Create Account"
3. Account setup:
   - Account Name: "TechFlow Solutions"
   - Country: "Canada"
4. Container setup:
   - Container Name: "techflowsolutions.ca"
   - Target Platform: "Web"
5. **Copy your GTM Container ID** (format: `GTM-XXXXXXX`) - this is already added to your HTML files

## Step 3: Configure GA4 Tag in Google Tag Manager

1. In GTM, go to "Tags" → "New"
2. Tag Configuration: "Google Analytics: GA4 Configuration"
3. Measurement ID: Enter your GA4 Measurement ID from Step 1
4. Triggering: Select "All Pages"
5. Enable Enhanced Measurement (recommended)
6. Save the tag as "GA4 Configuration"

## Step 4: Set up Conversion Tracking

### Phone Number Clicks
1. Create new tag: "GA4 Event - Phone Click"
2. Tag Type: "Google Analytics: GA4 Event"
3. Configuration Tag: Select your GA4 Configuration tag
4. Event Name: `phone_click`
5. Event Parameters:
   - `phone_number`: `6475728321`
6. Trigger: Create trigger for clicks on `tel:+16475728321`

### Contact Form Submissions
1. Create new tag: "GA4 Event - Contact Form"
2. Event Name: `contact_form_submit`
3. Trigger: Form submission on contact.html

### Booking Form Submissions
1. Create new tag: "GA4 Event - Booking Form"
2. Event Name: `booking_form_submit`
3. Trigger: Form submission on booking.html

### Remote Support Button Clicks
1. Create new tag: "GA4 Event - Remote Support"
2. Event Name: `remote_support_click`
3. Trigger: Clicks on remote support buttons/links

## Step 5: Custom Events for Business Intelligence

### Service Page Visits
- Event: `service_page_view`
- Parameters: `service_type` (pc-repair, networking, hardware, remote-support)

### CTA Button Clicks
- Event: `cta_click`
- Parameters: `button_text`, `page_location`

## Step 6: Testing

1. Use GTM Preview mode to test all tags
2. Check GA4 Real-time reports
3. Verify all conversion events are firing

## Step 7: Goals and Conversions

In GA4, mark these events as conversions:
- `phone_click`
- `contact_form_submit`
- `booking_form_submit`
- `remote_support_click`

## Important Notes

- GTM code has been added to all HTML pages
- Replace `GTM-XXXXXXX` in the code with your actual GTM Container ID
- All tracking respects user privacy and GDPR compliance
- Enhanced measurement includes scroll tracking, outbound clicks, site search, video engagement, and file downloads

## Business Benefits

This setup will track:
- **Lead Generation**: Phone calls, form submissions, remote support requests
- **User Journey**: How visitors navigate through your services
- **Traffic Sources**: Which marketing channels drive the most qualified leads
- **Conversion Funnels**: Where potential customers drop off
- **Geographic Data**: Service area performance
- **Device/Browser Analytics**: Technical optimization opportunities

## Maintenance

- Monthly review of conversion data
- Quarterly analysis of traffic sources and user behavior
- Annual review of goals and KPIs
- Regular testing of tracking implementation