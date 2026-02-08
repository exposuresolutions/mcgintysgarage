/* =============================================
   MCGINTY'S GARAGE REPAIR - FORMS
   Form handling, validation, and submission
   ============================================= */

(function() {
    'use strict';

    // Form submission handler
    function handleFormSubmit(form, options = {}) {
        const {
            endpoint = '/api/submit-booking',
            successMessage = 'Submitted successfully!',
            errorMessage = 'There was an error. Please try again.',
            onSuccess = null,
            onError = null
        } = options;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Disable and show loading
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Submitting...';

            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                // Success
                submitBtn.textContent = successMessage;
                submitBtn.classList.remove('loading');
                form.reset();

                if (onSuccess) {
                    onSuccess(result);
                }

                // Show success notification
                showNotification(successMessage, 'success');

            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.classList.remove('loading');

                if (onError) {
                    onError(error);
                }

                showNotification(errorMessage, 'error');

            } finally {
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 3000);
            }
        });
    }

    // Simple form validation
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('[required]');

        inputs.forEach(input => {
            clearError(input);

            if (!input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email');
                isValid = false;
            } else if (input.type === 'tel' && !isValidPhone(input.value)) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        // Irish phone number validation (flexible)
        return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
    }

    function showError(input, message) {
        input.classList.add('error');
        const errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.textContent = message;
        input.parentNode.appendChild(errorEl);
    }

    function clearError(input) {
        input.classList.remove('error');
        const errorEl = input.parentNode.querySelector('.form-error');
        if (errorEl) {
            errorEl.remove();
        }
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close" aria-label="Close">&times;</button>
        `;

        // Add styles if not already present
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 16px 20px;
                    border-radius: 8px;
                    background: #fff;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                    max-width: 90vw;
                }
                .notification-success { border-left: 4px solid #25D366; }
                .notification-error { border-left: 4px solid #D40000; }
                .notification-info { border-left: 4px solid #005A9C; }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    color: #666;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Initialize booking form if present
    function initBookingForm() {
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            handleFormSubmit(bookingForm, {
                endpoint: '/api/submit-booking',
                successMessage: 'Booking submitted! We\'ll confirm shortly.',
                onSuccess: () => {
                    // Track conversion if analytics available
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'booking_submitted', {
                            event_category: 'engagement'
                        });
                    }
                }
            });
        }
    }

    // Initialize waitlist form
    function initWaitlistForm() {
        const waitlistForms = document.querySelectorAll('.waitlist-form');
        waitlistForms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const input = form.querySelector('input[type="email"], input[type="tel"]');
                const btn = form.querySelector('button');
                
                if (input && input.value.trim()) {
                    btn.disabled = true;
                    btn.textContent = 'Joining...';
                    
                    // Simulate API call (replace with actual endpoint)
                    setTimeout(() => {
                        btn.textContent = '✓ You\'re on the list!';
                        input.value = '';
                        showNotification('Welcome! You\'re on the early access list.', 'success');
                    }, 1000);
                }
            });
        });
    }

    // Service selection (for booking page)
    function initServiceSelection() {
        const serviceButtons = document.querySelectorAll('.quick-link-btn');
        serviceButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active from all
                serviceButtons.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                this.classList.add('active');
                
                // Get service type
                const service = this.dataset.service || this.textContent.trim();
                console.log('Selected service:', service);
                
                // Could update hidden form field or calendar filter here
            });
        });

        // Check URL for pre-selected service
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        if (serviceParam) {
            const matchingBtn = document.querySelector(`[data-service="${serviceParam}"]`);
            if (matchingBtn) {
                matchingBtn.classList.add('active');
            }
        }
    }

    // Initialize all form handlers
    function init() {
        initBookingForm();
        initWaitlistForm();
        initServiceSelection();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for external use
    window.McGintysForums = {
        handleFormSubmit,
        validateForm,
        showNotification
    };

})();
