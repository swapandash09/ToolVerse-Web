// Navigation Handling
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Show corresponding section
        const sectionId = this.getAttribute('data-section');
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        // Smooth scroll to top of content on mobile
        if (window.innerWidth <= 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Theme Toggle (Header Button)
document.querySelector('.theme-toggle').addEventListener('click', function() {
    const app = document.querySelector('.app-container');
    const currentTheme = app.dataset.theme;
    app.dataset.theme = currentTheme === 'light' ? 'dark' : 'light';
    updateThemeStatus(app.dataset.theme);
});

// Theme Switcher (Settings)
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        document.querySelector('.app-container').dataset.theme = theme;
        updateThemeStatus(theme);

        // Save theme preference to localStorage
        localStorage.setItem('toolverseTheme', theme);
    });
});

// Update Theme Status Text
function updateThemeStatus(theme) {
    document.getElementById('themeStatus').textContent = `Current Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
}

// Load Saved Theme on Page Load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('toolverseTheme') || 'light';
    document.querySelector('.app-container').dataset.theme = savedTheme;
    updateThemeStatus(savedTheme);
});

// Tool Search Functionality
document.getElementById('toolSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.tool-card').forEach(card => {
        const title = card.querySelector('a').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'flex' : 'none';
    });

    // If in tools section, ensure visibility
    const toolsSection = document.getElementById('tools');
    if (searchTerm && !toolsSection.classList.contains('active')) {
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        toolsSection.classList.add('active');
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-item[data-section="tools"]').classList.add('active');
    }
});

// Storage Permission Functions
function requestStoragePermission() {
    try {
        // Simulate permission request (actual implementation depends on browser APIs)
        if ('permissions' in navigator) {
            navigator.permissions.request({ name: 'persistent-storage' }).then(() => {
                document.getElementById('storageStatus').textContent = 'Status: Granted';
                localStorage.setItem('storagePermission', 'granted');
            }).catch(() => {
                document.getElementById('storageStatus').textContent = 'Status: Denied by Browser';
            });
        } else {
            document.getElementById('storageStatus').textContent = 'Status: Granted (Simulated)';
            localStorage.setItem('storagePermission', 'granted');
        }
    } catch (error) {
        console.error('Storage Permission Error:', error);
        document.getElementById('storageStatus').textContent = 'Status: Error';
    }
}

function denyStoragePermission() {
    document.getElementById('storageStatus').textContent = 'Status: Denied';
    localStorage.setItem('storagePermission', 'denied');
}

// Load Storage Permission Status
document.addEventListener('DOMContentLoaded', function() {
    const permission = localStorage.getItem('storagePermission');
    if (permission) {
        document.getElementById('storageStatus').textContent = `Status: ${permission.charAt(0).toUpperCase() + permission.slice(1)}`;
    }
});

// Contact Form Submission (Simulated)
function sendContact() {
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    if (email && message) {
        // Simulate sending (replace with actual API call if needed)
        console.log('Contact Form Submitted:', { email, message });
        alert('Message sent successfully! (Simulated)');
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

// Lazy Load Tool Previews (Optional Enhancement)
document.addEventListener('scroll', function() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && !card.classList.contains('loaded')) {
            card.classList.add('loaded');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Smooth Scroll for Anchor Links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Handle Window Resize for Responsive Adjustments
let timeout;
window.addEventListener('resize', function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth <= 768) {
            sidebar.style.transform = 'translateY(0)';
        } else {
            sidebar.style.transform = 'translateX(0)';
        }
    }, 100);
});
