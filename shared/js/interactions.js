/* =============================================
   MCGINTY'S GARAGE REPAIR - INTERACTIONS
   Engaging micro-interactions and animations
   ============================================= */

(function() {
    'use strict';

    // ==================== INTERSECTION OBSERVER ====================
    // Animate elements when they come into view
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children if present
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.animate-on-scroll, .service-card, .card, .feature-item, .step-card, .partner-card, .reward-card, .tier-card, .payment-card, .faq-item').forEach(el => {
        el.classList.add('pre-animate');
        animateOnScroll.observe(el);
    });

    // ==================== COUNTER ANIMATION ====================
    // Animate numbers counting up
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Initialize counters when visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseInt(entry.target.dataset.count) || 0;
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    // ==================== TYPING EFFECT ====================
    // Typewriter effect for hero text
    
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ==================== PARALLAX EFFECT ====================
    // Subtle parallax on scroll
    
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    // ==================== HOVER EFFECTS ====================
    // Enhanced hover interactions
    
    function initHoverEffects() {
        // Card tilt effect
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // Magnetic button effect
        document.querySelectorAll('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ==================== RIPPLE EFFECT ====================
    // Material-style ripple on buttons
    
    function createRipple(event) {
        const button = event.currentTarget;
        
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }

    // Add ripple to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.addEventListener('click', createRipple);
    });

    // ==================== SCROLL PROGRESS ====================
    // Show reading/scroll progress
    
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }, { passive: true });
    }

    // ==================== TOAST NOTIFICATIONS ====================
    // Enhanced notification system
    
    function showToast(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Close">&times;</button>
        `;
        
        // Get or create toast container
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('toast-show');
        });
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            removeToast(toast);
        });
        
        // Auto remove
        setTimeout(() => removeToast(toast), duration);
    }

    function removeToast(toast) {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 300);
    }

    // ==================== LAZY LOADING IMAGES ====================
    // Progressive image loading with blur effect
    
    function initLazyImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==================== SMOOTH REVEAL ====================
    // Reveal sections smoothly on scroll
    
    function initSmoothReveal() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            section.classList.add('reveal-section');
        });
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => revealObserver.observe(section));
    }

    // ==================== LIVE CLOCK ====================
    // Show current time (useful for business hours)
    
    function initLiveClock() {
        const clockElements = document.querySelectorAll('[data-live-clock]');
        
        if (clockElements.length === 0) return;
        
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IE', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            
            clockElements.forEach(el => {
                el.textContent = timeString;
            });
        }
        
        updateClock();
        setInterval(updateClock, 1000);
    }

    // ==================== BUSINESS HOURS STATUS ====================
    // Show if currently open/closed
    
    function initBusinessStatus() {
        const statusElements = document.querySelectorAll('[data-business-status]');
        
        if (statusElements.length === 0) return;
        
        function updateStatus() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday
            const hour = now.getHours();
            
            let isOpen = false;
            let statusText = 'Closed';
            let statusClass = 'status-closed';
            
            if (day >= 1 && day <= 5) {
                // Mon-Fri: 6pm - 9pm
                if (hour >= 18 && hour < 21) {
                    isOpen = true;
                    statusText = 'Open Now';
                    statusClass = 'status-open';
                } else if (hour < 18) {
                    statusText = 'Opens at 6pm';
                }
            } else if (day === 6) {
                // Saturday: 9am - 2pm
                if (hour >= 9 && hour < 14) {
                    isOpen = true;
                    statusText = 'Open Now';
                    statusClass = 'status-open';
                } else if (hour < 9) {
                    statusText = 'Opens at 9am';
                }
            }
            
            statusElements.forEach(el => {
                el.textContent = statusText;
                el.className = `business-status ${statusClass}`;
            });
        }
        
        updateStatus();
        setInterval(updateStatus, 60000); // Update every minute
    }

    // ==================== CONFETTI EFFECT ====================
    // Celebration animation for form submissions
    
    function showConfetti() {
        const colors = ['#FDB813', '#005A9C', '#D40000', '#25D366'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // ==================== ADD REQUIRED STYLES ====================
    
    function addInteractionStyles() {
        if (document.getElementById('interaction-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'interaction-styles';
        styles.textContent = `
            /* Pre-animation state */
            .pre-animate {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            /* Ripple effect */
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Scroll progress */
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--primary, #005A9C), var(--accent, #FDB813));
                z-index: 9999;
                transition: width 0.1s ease;
            }
            
            /* Toast notifications */
            .toast-container {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .toast {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 20px;
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                transform: translateX(120%);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            
            .toast-show {
                transform: translateX(0);
            }
            
            .toast-hide {
                transform: translateX(120%);
            }
            
            .toast-success { border-left: 4px solid #25D366; }
            .toast-error { border-left: 4px solid #D40000; }
            .toast-warning { border-left: 4px solid #FDB813; }
            .toast-info { border-left: 4px solid #005A9C; }
            
            .toast-icon { font-size: 1.5rem; }
            .toast-message { flex: 1; font-size: 0.95rem; }
            .toast-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                padding: 0;
                line-height: 1;
            }
            
            /* Business status */
            .business-status {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
            }
            
            .status-open {
                background: #d4edda;
                color: #155724;
            }
            
            .status-open::before {
                content: '';
                width: 8px;
                height: 8px;
                background: #28a745;
                border-radius: 50%;
                animation: pulse 1.5s infinite;
            }
            
            .status-closed {
                background: #f8d7da;
                color: #721c24;
            }
            
            /* Confetti */
            .confetti {
                position: fixed;
                top: -10px;
                width: 10px;
                height: 10px;
                border-radius: 2px;
                animation: confetti-fall linear forwards;
                z-index: 9999;
                pointer-events: none;
            }
            
            @keyframes confetti-fall {
                to {
                    top: 100vh;
                    transform: rotate(720deg);
                }
            }
            
            /* Reveal sections */
            .reveal-section {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .reveal-section.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Lazy loaded images */
            img[data-src] {
                filter: blur(10px);
                transition: filter 0.5s ease;
            }
            
            img.loaded {
                filter: blur(0);
            }
            
            /* Tilt card */
            .tilt-card {
                transition: transform 0.1s ease;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(styles);
    }

    // ==================== INITIALIZE ====================
    
    function init() {
        addInteractionStyles();
        initParallax();
        initHoverEffects();
        initScrollProgress();
        initLazyImages();
        initSmoothReveal();
        initLiveClock();
        initBusinessStatus();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose public API
    window.McGintysInteractions = {
        showToast,
        showConfetti,
        typeWriter,
        animateCounter
    };

})();
