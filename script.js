document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    const modeIcons = document.querySelectorAll('.mode-icon');

    // Initial mode check
    if (localStorage.getItem('mode') === 'classic') {
        body.classList.remove('mode-dark');
        body.classList.add('mode-classic');
        modeToggle.checked = true;
    }

    // Mode toggle functionality
    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            body.classList.remove('mode-dark');
            body.classList.add('mode-classic');
            localStorage.setItem('mode', 'classic');
        } else {
            body.classList.remove('mode-classic');
            body.classList.add('mode-dark');
            localStorage.setItem('mode', 'dark');
        }
    });

    // Icon click effects
    modeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.add('animate-bounce');
            setTimeout(() => icon.classList.remove('animate-bounce'), 300);
            modeToggle.checked = !modeToggle.checked;
            modeToggle.dispatchEvent(new Event('change'));
        });
    });

    // Tool card click logging
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolName = card.getAttribute('data-tool');
            console.log(`Clicked on ${toolName}`);
        });
    });

    console.log('ToolVerse Dashboard Loaded');
});
