/* =============================================
   LAVELLE'S AUTO - MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Simulation
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/submit-booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                submitBtn.textContent = 'Booking Sent!';
                bookingForm.reset();

            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.textContent = 'Submission Failed';
                alert('There was an error submitting your booking. Please try again.');
            } finally {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 3000);
            }
        });
    }

    // The rest of the forms can keep their simulation for now
    const otherForms = ['parts-form', 'payment-form'];
    otherForms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = form.querySelector('button[type="submit"], button[type="button"]');
                const originalText = submitBtn.textContent;

                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';

                setTimeout(() => {
                    if (formId === 'parts-form') {
                        submitBtn.textContent = 'Finding...';
                        document.getElementById('parts-results').innerHTML = `<p>Searching for parts for your vehicle...</p>`;
                    } else {
                        submitBtn.textContent = 'Request Sent!';
                    }

                    if(formId === 'payment-form') submitBtn.textContent = 'Payment Successful!';
                    
                    if (formId !== 'parts-form') {
                        form.reset();
                    }

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        if (formId === 'parts-form') {
                            document.getElementById('parts-results').innerHTML = '';
                        }
                    }, 3000);
                }, 1500);
            });
        }
    });

    // Show/Hide NCT Upload Field
    const serviceTypeSelect = document.getElementById('service_type');
    const nctUploadSection = document.getElementById('nct-upload-section');
    if (serviceTypeSelect && nctUploadSection) {
        serviceTypeSelect.addEventListener('change', function() {
            if (this.value === 'post-nct') {
                nctUploadSection.style.display = 'block';
            } else {
                nctUploadSection.style.display = 'none';
            }
        });
    }

    // Parts Finder Button
    const findPartsBtn = document.getElementById('find-parts-btn');
    if(findPartsBtn) {
        findPartsBtn.addEventListener('click', function() {
            const partsForm = document.getElementById('parts-form');
            partsForm.dispatchEvent(new Event('submit'));
        });
    }

    // Modal-like functionality for uploads/listings
    const uploadShowcaseBtn = document.getElementById('upload-showcase-btn');
    if(uploadShowcaseBtn) {
        uploadShowcaseBtn.addEventListener('click', () => {
            alert("Showcase upload form would appear here.");
            // In a real app, this would open a modal with a form
        });
    }

    const listCarBtn = document.getElementById('list-car-btn');
    if(listCarBtn) {
        listCarBtn.addEventListener('click', () => {
            alert("List your car for sale form would appear here.");
            // In a real app, this would open a modal with a form
        });
    }

    // Video play on hover
    const videoItems = document.querySelectorAll('.gallery-item-video');
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        item.addEventListener('mouseenter', () => {
            video.play();
        });
        item.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // Stripe Integration Placeholder
    const paymentForm = document.getElementById('payment-form');
    if(paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would initialize Stripe here,
            // create a payment intent on your server, and then confirm the payment.
            console.log("Stripe payment processing would be initiated here.");
        });
    }

    // Console Branding
    console.log('%c?? Lavelle\'s Auto Diagnostics & Repair', 'font-size: 20px; font-weight: bold; color: #005A9C;');
    console.log('The future of car repairs on Achill Island.');
});
