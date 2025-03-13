// script.js
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggle = document.querySelector('.theme-toggle');
    const appContainer = document.querySelector('.app-container');
    const toolSearch = document.getElementById('toolSearch');

    // Navigation for dashboard.html
    if (contentSections.length > 0) { // Check if we're on dashboard.html
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Only handle section navigation for items with data-section
                if (item.hasAttribute('data-section')) {
                    navItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');

                    const section = item.getAttribute('data-section');
                    contentSections.forEach(s => s.classList.remove('active'));
                    document.getElementById(section).classList.add('active');
                }
            });
        });
    }

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = appContainer.getAttribute('data-theme');
            if (currentTheme === 'light') {
                appContainer.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else if (currentTheme === 'dark') {
                appContainer.setAttribute('data-theme', 'cosmic');
            } else {
                appContainer.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Tool Search (only on dashboard.html)
    if (toolSearch) {
        toolSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const toolCards = document.querySelectorAll('.tool-card');

            toolCards.forEach(card => {
                const toolName = card.querySelector('a').textContent.toLowerCase();
                card.style.display = toolName.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
});
