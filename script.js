// Splash screen removal
window.addEventListener('load', () => {
    setTimeout(() => {
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
    }, 3500); // Remove splash screen after 3.5 seconds
});

// Mobile menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!link.hasAttribute('target')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Property search functionality with mock data
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const buyRent = document.querySelector('.filter-select:nth-of-type(1)').value;
        const property = document.querySelector('.filter-select:nth-of-type(2)').value;
        const location = document.querySelector('.filter-select:nth-of-type(3)').value;
        const price = document.querySelector('.filter-select:nth-of-type(4)').value;

        // Mock search results
        const message = `🏠 Search Results:\n\n📍 ${property} for ${buyRent}\n📌 Location: ${location}\n💰 Max Price: ${price}\n\nFound 3 properties matching your criteria!\n\nScroll down to view "Available Houses" section for demo listings.`;

        alert(message);

        // Scroll to houses section
        setTimeout(() => {
            document.getElementById('houses').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handler
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = {
            fullName: formData.get('fullName'),
            phone: '+254' + formData.get('phone'),
            location: formData.get('location'),
            service: formData.get('service')
        };

        // Create WhatsApp message
        const serviceNames = {
            'deposit': 'Rent Deposit Assistance',
            'loan': 'Personal Loan',
            'movers': 'Professional Movers'
        };

        const message = `Hello Eunimark! I would like to request assistance.

*Name:* ${data.fullName}
*Phone:* ${data.phone}
*Location:* ${data.location}
*Service Needed:* ${serviceNames[data.service] || data.service}

Please get back to me. Thank you!`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/254700000000?text=${encodedMessage}`, '_blank');

        // Show success feedback
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '✓ Sent! Opening WhatsApp...';
        submitBtn.style.background = '#25D366';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            this.reset();
        }, 3000);
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to cards
document.querySelectorAll('.step-card, .service-card, .house-card, .trust-point').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Phone number input validation
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        // Remove non-numeric characters
        let value = this.value.replace(/\D/g, '');

        // Limit to 9 digits
        if (value.length > 9) {
            value = value.slice(0, 9);
        }

        this.value = value;
    });
}
