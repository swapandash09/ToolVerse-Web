document.addEventListener('DOMContentLoaded', () => {
    // Show Section
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            sections.forEach(section => {
                section.classList.toggle('active', section.id === sectionId);
            });
            navItems.forEach(nav => {
                nav.classList.toggle('active', nav === item);
            });
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Search Tools
    window.searchTools = function() {
        const query = document.getElementById('toolSearch').value.toLowerCase();
        document.querySelectorAll('.tool-card').forEach(card => {
            const title = card.querySelector('a').textContent.toLowerCase();
            card.style.display = title.includes(query) ? 'block' : 'none';
        });
    };

    // Contact Form
    window.sendContact = function() {
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        if (email && message) {
            alert('Message sent successfully!');
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactMessage').value = '';
        } else {
            alert('Please fill in all fields.');
        }
    };

    // Storage Permission
    window.requestStoragePermission = function() {
        document.getElementById('storageStatus').textContent = 'Status: Granted';
        localStorage.setItem('storagePermission', 'granted');
    };

    window.denyStoragePermission = function() {
        document.getElementById('storageStatus').textContent = 'Status: Denied';
        localStorage.setItem('storagePermission', 'denied');
    };

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const container = document.querySelector('.app-container');
    themeToggle.addEventListener('click', () => {
        const currentTheme = container.dataset.theme === 'light' ? 'dark' : 'light';
        container.dataset.theme = currentTheme;
        localStorage.setItem('theme', currentTheme);
        themeToggle.querySelector('i').classList.toggle('fa-moon');
        themeToggle.querySelector('i').classList.toggle('fa-sun');
    });

    // Load Saved Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    container.dataset.theme = savedTheme;
    if (savedTheme === 'dark') {
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
});
