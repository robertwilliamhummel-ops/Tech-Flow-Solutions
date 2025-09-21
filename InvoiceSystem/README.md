# TechFlow Solutions - Invoice Generator

A professional invoice generation system designed specifically for TechFlow Solutions, featuring TechFlow branding, customer management, and automated calculations.

## Features

### 🎨 Professional Branding
- TechFlow Solutions logo and branding
- Dark theme matching your website design
- Professional invoice layout for printing

### 👥 Customer Management
- Save customer information locally
- Quick customer selection for repeat clients
- Customer data includes: Name, Company, Phone, Email, Address
- Export/import customer data for backup

### 💰 Flexible Pricing
- **Remote Support**: $80/hour
- **On-site Standard**: $100/hour  
- **Emergency/Same-day**: $110/hour
- Custom line items for non-hourly services
- Automatic HST (13%) calculation
- Real-time total calculations

### 📄 Invoice Features
- Auto-generated invoice numbers (TFS-YYYY-NNNN format)
- Professional print layout
- Invoice preview before printing
- Invoice history and records
- Export invoice data

## How to Use

### 1. Customer Information
- Select an existing customer from the dropdown, or
- Click "New Customer" to clear the form
- Fill in customer details (Name and Phone are required)
- Click "Save Customer" to store for future use

### 2. Invoice Details
- Invoice number is auto-generated
- Date defaults to today (can be changed)

### 3. Services

#### Hourly Services
- Select service type (Remote/On-site/Emergency)
- Choose service description from dropdown
- Enter hours worked
- Rate is automatically set based on service type

#### Custom Line Items
- Click "Add Line Item" for non-hourly services
- Enter description, quantity, and unit price
- Use for hardware, software licenses, travel fees, etc.

### 4. Generate Invoice
- Click "Preview Invoice" to see the formatted invoice
- Click "Print Invoice" to print (this finalizes the invoice)
- Click "Clear Form" to start a new invoice

## File Structure

```
InvoiceSystem/
├── index.html          # Main invoice generator interface
├── css/
│   └── invoice.css     # TechFlow-branded styling
├── js/
│   ├── customer.js     # Customer management system
│   ├── calculator.js   # Pricing and calculations
│   └── invoice.js      # Main invoice generation logic
└── README.md          # This file
```

## Technical Details

### Data Storage
- Uses browser localStorage for data persistence
- Customer data stored locally on your computer
- Invoice records kept for reference (last 100 invoices)
- No external database required

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for desktop and mobile
- Print-optimized CSS for clean invoice output

### Security
- All data stored locally on your computer
- No data sent to external servers
- Customer information remains private

## Business Information

The invoice system includes your TechFlow Solutions business details:
- **Company**: TechFlow Solutions
- **Service**: Professional PC Repair & Networking
- **Coverage**: Greater Toronto Area
- **Phone**: (647) 572-8321
- **Email**: rob@techflowsolutions.ca

## Usage Tips

1. **Save Customers**: Always save customer information for faster future invoicing
2. **Service Descriptions**: Use the predefined service descriptions for consistency
3. **Line Items**: Use custom line items for hardware, parts, or flat-rate services
4. **Preview First**: Always preview before printing to ensure accuracy
5. **Print to PDF**: Use your browser's "Print to PDF" option to save digital copies

## Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Ctrl+P**: Print invoice (when preview is visible)
- **Enter**: Submit forms and trigger calculations

## Troubleshooting

### Invoice Not Printing
- Ensure you've clicked "Preview Invoice" first
- Check your browser's print settings
- Try printing to PDF first

### Customer Data Not Saving
- Check if localStorage is enabled in your browser
- Clear browser cache if experiencing issues
- Export customer data regularly as backup

### Calculations Not Working
- Ensure JavaScript is enabled in your browser
- Check that all required fields are filled
- Refresh the page if calculations seem stuck

## Deploying to GitHub Pages

To make your TechFlow Solutions website (including this invoice system) available online via GitHub Pages:

### 1. Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., `techflow-solutions-website`)
4. Make sure it's set to **Public** (required for free GitHub Pages)
5. Check "Add a README file"
6. Click "Create repository"

### 2. Upload Your Website Files
1. In your new repository, click "uploading an existing file"
2. Drag and drop your **public website files** (for customers to see):
   - `index.html`
   - `services.html`
   - `contact.html`
   - `booking.html`
   - `remote-support.html`
   - `about.html`
   - `portfolio.html`
   - `css/` folder (with styles.css)
   - `js/` folder (with main.js)
   - `assets/` folder (with images and favicon)
   - **Optional**: `InvoiceSystem/` folder (only if you want it online)
3. Write a commit message like "Initial website upload"
4. Click "Commit changes"

**Note**: You can keep the `InvoiceSystem/` folder on your local computer only. Your customers don't need access to your private invoice generator.

### 3. Enable GitHub Pages
1. In your repository, click on the "Settings" tab
2. Scroll down to the "Pages" section in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

### 4. Access Your Live Website
- GitHub will provide you with a URL like: `https://yourusername.github.io/techflow-solutions-website`
- It may take a few minutes for the site to become available
- Your invoice system will be accessible at: `https://yourusername.github.io/techflow-solutions-website/InvoiceSystem/`

### 5. Custom Domain (Optional)
If you own a domain name (like `techflowsolutions.ca`):
1. In the Pages settings, add your custom domain
2. Update your domain's DNS settings to point to GitHub Pages
3. Enable "Enforce HTTPS" for security

### 6. Updating Your Website
To make changes to your live website:
1. Edit files directly on GitHub using the web interface, or
2. Use Git to clone the repository locally, make changes, and push updates
3. Changes will automatically deploy to your live site

### Important Notes for GitHub Pages
- **GitHub Pages Limitation**: Only supports static sites (HTML, CSS, JavaScript only)
- **Current Invoice System**: Uses local storage (data stays on user's computer)
- **Database Limitation**: GitHub Pages cannot run databases or server-side code

### Database Options for Invoice System

**Option 1: Keep Local Storage (Recommended for Privacy)**
- ✅ **No need to upload to GitHub Pages** - keep invoice system local on your computer
- ✅ Customer data stays completely private on your computer
- ✅ No monthly costs
- ✅ No internet connection required to use
- ❌ Data not shared between devices
- ❌ No automatic backups
- **Use Case**: Personal invoice tool, just open `InvoiceSystem/index.html` in your browser

**Option 2: Firebase (Google's Database Service)**
- ✅ Real-time database that works with static sites
- ✅ Data syncs across all your devices
- ✅ Automatic backups
- ✅ Free tier available (up to 1GB storage)
- ❌ Customer data stored on Google servers
- ❌ Requires Firebase setup and configuration

**Option 3: Airtable API**
- ✅ Easy-to-use spreadsheet-like database
- ✅ Works with static sites via API
- ✅ Visual interface for managing data
- ✅ Free tier available
- ❌ Customer data stored on Airtable servers
- ❌ API key management required

**Option 4: Netlify + Serverless Functions**
- ✅ Can run server-side code and databases
- ✅ Free tier available
- ✅ Easy deployment from GitHub
- ❌ More complex setup than GitHub Pages
- ❌ Requires learning serverless functions

### Recommendation
For **TechFlow Solutions**, I recommend:
1. **Start with GitHub Pages + Local Storage** (current setup)
   - Simple, private, and free
   - Perfect for a single-user invoice system
2. **Upgrade to Firebase later** if you need:
   - Multi-device access
   - Data backup/sync
   - Multiple users

### Converting to Firebase Database
If you want to add a database later, the invoice system can be modified to use Firebase:
```javascript
// Instead of localStorage, use Firebase
firebase.firestore().collection('customers').add(customerData);
firebase.firestore().collection('invoices').add(invoiceData);
```

This would require:
- Firebase account setup
- Adding Firebase SDK to the project
- Modifying the JavaScript files
- Setting up authentication for security

## Support

For technical support with this invoice system, contact your system administrator or refer to the TechFlow Solutions main website.

---

**TechFlow Solutions Invoice Generator v1.0**
Built with HTML, CSS, and JavaScript for reliable local operation.