/**
 * TechFlow Solutions - Customer Management System
 * Handles customer data storage and retrieval using localStorage
 */

class CustomerManager {
    constructor() {
        this.storageKey = 'techflow_customers';
        this.customers = this.loadCustomers();
        this.initializeEventListeners();
        this.populateCustomerDropdown();
    }

    /**
     * Load customers from localStorage
     */
    loadCustomers() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading customers:', error);
            return [];
        }
    }

    /**
     * Save customers to localStorage
     */
    saveCustomers() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.customers));
            return true;
        } catch (error) {
            console.error('Error saving customers:', error);
            this.showNotification('Error saving customer data', 'error');
            return false;
        }
    }

    /**
     * Add or update a customer
     */
    saveCustomer(customerData) {
        // Validate required fields
        if (!customerData.name || !customerData.phone) {
            this.showNotification('Customer name and phone are required', 'error');
            return false;
        }

        // Check if customer already exists (by phone number)
        const existingIndex = this.customers.findIndex(c => c.phone === customerData.phone);
        
        if (existingIndex !== -1) {
            // Update existing customer
            this.customers[existingIndex] = {
                ...this.customers[existingIndex],
                ...customerData,
                updatedAt: new Date().toISOString()
            };
            this.showNotification('Customer updated successfully', 'success');
        } else {
            // Add new customer
            const newCustomer = {
                id: this.generateCustomerId(),
                ...customerData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.customers.push(newCustomer);
            this.showNotification('Customer saved successfully', 'success');
        }

        this.saveCustomers();
        this.populateCustomerDropdown();
        return true;
    }

    /**
     * Get customer by ID
     */
    getCustomer(id) {
        return this.customers.find(c => c.id === id);
    }

    /**
     * Get customer by phone number
     */
    getCustomerByPhone(phone) {
        return this.customers.find(c => c.phone === phone);
    }

    /**
     * Delete customer
     */
    deleteCustomer(id) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers.splice(index, 1);
            this.saveCustomers();
            this.populateCustomerDropdown();
            this.showNotification('Customer deleted successfully', 'success');
            return true;
        }
        return false;
    }

    /**
     * Generate unique customer ID
     */
    generateCustomerId() {
        return 'CUST_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Populate customer dropdown
     */
    populateCustomerDropdown() {
        const dropdown = document.getElementById('existing-customer');
        if (!dropdown) return;

        // Clear existing options except the first one
        dropdown.innerHTML = '<option value="">Select existing customer or add new</option>';

        // Sort customers by name
        const sortedCustomers = [...this.customers].sort((a, b) => 
            a.name.localeCompare(b.name)
        );

        // Add customer options
        sortedCustomers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = `${customer.name}${customer.company ? ` (${customer.company})` : ''} - ${customer.phone}`;
            dropdown.appendChild(option);
        });
    }

    /**
     * Load customer data into form
     */
    loadCustomerIntoForm(customerId) {
        const customer = this.getCustomer(customerId);
        if (!customer) return;

        document.getElementById('customer-name').value = customer.name || '';
        document.getElementById('customer-company').value = customer.company || '';
        document.getElementById('customer-phone').value = customer.phone || '';
        document.getElementById('customer-email').value = customer.email || '';
        document.getElementById('customer-address').value = customer.address || '';
    }

    /**
     * Get customer data from form
     */
    getCustomerDataFromForm() {
        return {
            name: document.getElementById('customer-name').value.trim(),
            company: document.getElementById('customer-company').value.trim(),
            phone: document.getElementById('customer-phone').value.trim(),
            email: document.getElementById('customer-email').value.trim(),
            address: document.getElementById('customer-address').value.trim()
        };
    }

    /**
     * Clear customer form
     */
    clearCustomerForm() {
        document.getElementById('customer-name').value = '';
        document.getElementById('customer-company').value = '';
        document.getElementById('customer-phone').value = '';
        document.getElementById('customer-email').value = '';
        document.getElementById('customer-address').value = '';
        document.getElementById('existing-customer').value = '';
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Customer dropdown change
        document.addEventListener('change', (e) => {
            if (e.target.id === 'existing-customer') {
                const customerId = e.target.value;
                if (customerId) {
                    this.loadCustomerIntoForm(customerId);
                }
            }
        });

        // New customer button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'new-customer-btn') {
                this.clearCustomerForm();
            }
        });

        // Save customer button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'save-customer-btn') {
                const customerData = this.getCustomerDataFromForm();
                this.saveCustomer(customerData);
            }
        });
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;

        // Add notification styles to document if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 0.25rem;
                    border-radius: 0.25rem;
                    opacity: 0.8;
                }
                .notification-close:hover {
                    opacity: 1;
                    background: rgba(255, 255, 255, 0.1);
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    /**
     * Get notification icon based on type
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    /**
     * Get notification color based on type
     */
    getNotificationColor(type) {
        const colors = {
            success: '#238636',
            error: '#da3633',
            warning: '#d29922',
            info: '#58a6ff'
        };
        return colors[type] || colors.info;
    }

    /**
     * Export customers data (for backup)
     */
    exportCustomers() {
        const dataStr = JSON.stringify(this.customers, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `techflow_customers_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showNotification('Customer data exported successfully', 'success');
    }

    /**
     * Import customers data
     */
    importCustomers(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedCustomers = JSON.parse(e.target.result);
                if (Array.isArray(importedCustomers)) {
                    // Merge with existing customers (avoid duplicates by phone)
                    importedCustomers.forEach(customer => {
                        if (!this.getCustomerByPhone(customer.phone)) {
                            this.customers.push({
                                ...customer,
                                id: this.generateCustomerId(),
                                importedAt: new Date().toISOString()
                            });
                        }
                    });
                    this.saveCustomers();
                    this.populateCustomerDropdown();
                    this.showNotification(`Imported ${importedCustomers.length} customers successfully`, 'success');
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                console.error('Import error:', error);
                this.showNotification('Error importing customer data', 'error');
            }
        };
        reader.readAsText(file);
    }

    /**
     * Get customer statistics
     */
    getCustomerStats() {
        return {
            total: this.customers.length,
            withEmail: this.customers.filter(c => c.email).length,
            withCompany: this.customers.filter(c => c.company).length,
            recentlyAdded: this.customers.filter(c => {
                const createdDate = new Date(c.createdAt);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return createdDate > thirtyDaysAgo;
            }).length
        };
    }
}

// Initialize customer manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.customerManager = new CustomerManager();
});