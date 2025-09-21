/**
 * TechFlow Solutions - Invoice Calculator
 * Handles pricing calculations, line items, and totals
 */

class InvoiceCalculator {
    constructor() {
        this.rates = {
            remote: 80,
            onsite: 100,
            emergency: 110
        };
        this.taxRate = 0.13; // HST 13% for Ontario
        this.lineItems = [];
        this.initializeEventListeners();
        this.updateAllTotals();
    }

    /**
     * Initialize event listeners for calculator functionality
     */
    initializeEventListeners() {
        // Service type change
        document.addEventListener('change', (e) => {
            if (e.target.id === 'service-type') {
                this.updateHourlyRate();
                this.calculateHourlyTotal();
            }
        });

        // Hours worked change
        document.addEventListener('input', (e) => {
            if (e.target.id === 'hours-worked') {
                this.calculateHourlyTotal();
            }
        });

        // Add line item button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'add-line-item-btn') {
                this.addLineItem();
            }
        });

        // Line item changes (using event delegation)
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('line-item-input')) {
                this.calculateLineItemsTotal();
            }
        });

        // Remove line item (using event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-line-item')) {
                this.removeLineItem(e.target);
            }
        });
    }

    /**
     * Update hourly rate based on selected service type
     */
    updateHourlyRate() {
        const serviceType = document.getElementById('service-type');
        const hourlyRateInput = document.getElementById('hourly-rate');
        
        if (serviceType.value && serviceType.selectedOptions[0]) {
            const rate = serviceType.selectedOptions[0].dataset.rate;
            hourlyRateInput.value = rate || 0;
        } else {
            hourlyRateInput.value = 0;
        }
    }

    /**
     * Calculate hourly services total
     */
    calculateHourlyTotal() {
        const hours = parseFloat(document.getElementById('hours-worked').value) || 0;
        const rate = parseFloat(document.getElementById('hourly-rate').value) || 0;
        const total = hours * rate;
        
        document.getElementById('hourly-total').textContent = this.formatCurrency(total);
        this.updateAllTotals();
    }

    /**
     * Add a new line item
     */
    addLineItem() {
        const container = document.getElementById('line-items-container');
        const lineItemId = 'line-item-' + Date.now();
        
        const lineItemHtml = `
            <div class="line-item" data-id="${lineItemId}">
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control line-item-input" data-field="description" placeholder="Service or product description">
                </div>
                <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" class="form-control line-item-input" data-field="quantity" min="1" step="1" value="1">
                </div>
                <div class="form-group">
                    <label>Unit Price</label>
                    <input type="number" class="form-control line-item-input" data-field="price" min="0" step="0.01" placeholder="0.00">
                </div>
                <button type="button" class="remove-line-item" title="Remove line item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', lineItemHtml);
        this.calculateLineItemsTotal();
    }

    /**
     * Remove a line item
     */
    removeLineItem(button) {
        const lineItem = button.closest('.line-item');
        if (lineItem) {
            lineItem.remove();
            this.calculateLineItemsTotal();
        }
    }

    /**
     * Calculate line items total
     */
    calculateLineItemsTotal() {
        const lineItems = document.querySelectorAll('.line-item');
        let total = 0;
        
        lineItems.forEach(item => {
            const quantity = parseFloat(item.querySelector('[data-field="quantity"]').value) || 0;
            const price = parseFloat(item.querySelector('[data-field="price"]').value) || 0;
            total += quantity * price;
        });
        
        document.getElementById('line-items-total').textContent = this.formatCurrency(total);
        this.updateAllTotals();
    }

    /**
     * Update all totals (subtotal, tax, final total)
     */
    updateAllTotals() {
        const hourlyTotal = this.parseAmount(document.getElementById('hourly-total').textContent);
        const lineItemsTotal = this.parseAmount(document.getElementById('line-items-total').textContent);
        
        const subtotal = hourlyTotal + lineItemsTotal;
        const taxAmount = subtotal * this.taxRate;
        const finalTotal = subtotal + taxAmount;
        
        document.getElementById('subtotal').textContent = this.formatCurrency(subtotal);
        document.getElementById('tax-amount').textContent = this.formatCurrency(taxAmount);
        document.getElementById('final-total').textContent = this.formatCurrency(finalTotal);
    }

    /**
     * Format number as currency
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD'
        }).format(amount);
    }

    /**
     * Parse currency string to number
     */
    parseAmount(currencyString) {
        return parseFloat(currencyString.replace(/[^0-9.-]+/g, '')) || 0;
    }

    /**
     * Get hourly service data
     */
    getHourlyServiceData() {
        const serviceType = document.getElementById('service-type');
        const serviceDescription = document.getElementById('service-description');
        const hours = parseFloat(document.getElementById('hours-worked').value) || 0;
        const rate = parseFloat(document.getElementById('hourly-rate').value) || 0;
        
        if (!serviceType.value || hours === 0) {
            return null;
        }
        
        return {
            type: 'hourly',
            serviceType: serviceType.options[serviceType.selectedIndex].text,
            description: serviceDescription.value || serviceType.options[serviceType.selectedIndex].text,
            hours: hours,
            rate: rate,
            total: hours * rate
        };
    }

    /**
     * Get all line items data
     */
    getLineItemsData() {
        const lineItems = document.querySelectorAll('.line-item');
        const items = [];
        
        lineItems.forEach(item => {
            const description = item.querySelector('[data-field="description"]').value.trim();
            const quantity = parseFloat(item.querySelector('[data-field="quantity"]').value) || 0;
            const price = parseFloat(item.querySelector('[data-field="price"]').value) || 0;
            
            if (description && quantity > 0 && price > 0) {
                items.push({
                    type: 'line-item',
                    description: description,
                    quantity: quantity,
                    price: price,
                    total: quantity * price
                });
            }
        });
        
        return items;
    }

    /**
     * Get invoice totals
     */
    getInvoiceTotals() {
        const subtotal = this.parseAmount(document.getElementById('subtotal').textContent);
        const taxAmount = this.parseAmount(document.getElementById('tax-amount').textContent);
        const finalTotal = this.parseAmount(document.getElementById('final-total').textContent);
        
        return {
            subtotal: subtotal,
            taxAmount: taxAmount,
            taxRate: this.taxRate,
            finalTotal: finalTotal
        };
    }

    /**
     * Clear all calculations
     */
    clearCalculations() {
        // Clear hourly service
        document.getElementById('service-type').value = '';
        document.getElementById('service-description').value = '';
        document.getElementById('hours-worked').value = '';
        document.getElementById('hourly-rate').value = '';
        
        // Clear line items
        document.getElementById('line-items-container').innerHTML = '';
        
        // Reset totals
        document.getElementById('hourly-total').textContent = '$0.00';
        document.getElementById('line-items-total').textContent = '$0.00';
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('tax-amount').textContent = '$0.00';
        document.getElementById('final-total').textContent = '$0.00';
    }

    /**
     * Validate invoice data
     */
    validateInvoiceData() {
        const errors = [];
        
        // Check if there's at least one service or line item
        const hourlyService = this.getHourlyServiceData();
        const lineItems = this.getLineItemsData();
        
        if (!hourlyService && lineItems.length === 0) {
            errors.push('Please add at least one service or line item');
        }
        
        // Validate hourly service if present
        if (hourlyService) {
            if (hourlyService.hours <= 0) {
                errors.push('Hours worked must be greater than 0');
            }
            if (hourlyService.rate <= 0) {
                errors.push('Hourly rate must be greater than 0');
            }
        }
        
        // Validate line items
        lineItems.forEach((item, index) => {
            if (!item.description.trim()) {
                errors.push(`Line item ${index + 1}: Description is required`);
            }
            if (item.quantity <= 0) {
                errors.push(`Line item ${index + 1}: Quantity must be greater than 0`);
            }
            if (item.price <= 0) {
                errors.push(`Line item ${index + 1}: Price must be greater than 0`);
            }
        });
        
        return errors;
    }

    /**
     * Get service suggestions based on common TechFlow services
     */
    getServiceSuggestions() {
        return [
            { description: 'PC Repair & Diagnostics', defaultHours: 2 },
            { description: 'Virus & Malware Removal', defaultHours: 1.5 },
            { description: 'Performance Optimization', defaultHours: 1 },
            { description: 'Hardware Installation', defaultHours: 1.5 },
            { description: 'Network Setup & Configuration', defaultHours: 2.5 },
            { description: 'Data Recovery', defaultHours: 3 },
            { description: 'Software Installation & Setup', defaultHours: 1 },
            { description: 'System Maintenance', defaultHours: 1.5 },
            { description: 'Custom PC Build', defaultHours: 4 },
            { description: 'Remote Support Session', defaultHours: 1 }
        ];
    }

    /**
     * Apply service suggestion
     */
    applyServiceSuggestion(suggestion) {
        document.getElementById('service-description').value = suggestion.description;
        if (suggestion.defaultHours) {
            document.getElementById('hours-worked').value = suggestion.defaultHours;
            this.calculateHourlyTotal();
        }
    }

    /**
     * Get pricing summary for display
     */
    getPricingSummary() {
        const hourlyService = this.getHourlyServiceData();
        const lineItems = this.getLineItemsData();
        const totals = this.getInvoiceTotals();
        
        return {
            hourlyService: hourlyService,
            lineItems: lineItems,
            totals: totals,
            itemCount: (hourlyService ? 1 : 0) + lineItems.length
        };
    }

    /**
     * Export calculation data for backup/import
     */
    exportCalculationData() {
        return {
            hourlyService: this.getHourlyServiceData(),
            lineItems: this.getLineItemsData(),
            totals: this.getInvoiceTotals(),
            exportedAt: new Date().toISOString()
        };
    }

    /**
     * Import calculation data
     */
    importCalculationData(data) {
        try {
            this.clearCalculations();
            
            // Import hourly service
            if (data.hourlyService) {
                const service = data.hourlyService;
                // Find matching service type
                const serviceTypeSelect = document.getElementById('service-type');
                for (let option of serviceTypeSelect.options) {
                    if (option.dataset.rate == service.rate) {
                        serviceTypeSelect.value = option.value;
                        break;
                    }
                }
                
                document.getElementById('service-description').value = service.description;
                document.getElementById('hours-worked').value = service.hours;
                this.updateHourlyRate();
                this.calculateHourlyTotal();
            }
            
            // Import line items
            if (data.lineItems && data.lineItems.length > 0) {
                data.lineItems.forEach(item => {
                    this.addLineItem();
                    const lastLineItem = document.querySelector('.line-item:last-child');
                    lastLineItem.querySelector('[data-field="description"]').value = item.description;
                    lastLineItem.querySelector('[data-field="quantity"]').value = item.quantity;
                    lastLineItem.querySelector('[data-field="price"]').value = item.price;
                });
                this.calculateLineItemsTotal();
            }
            
            return true;
        } catch (error) {
            console.error('Error importing calculation data:', error);
            return false;
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.invoiceCalculator = new InvoiceCalculator();
});