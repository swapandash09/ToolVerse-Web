document.addEventListener('DOMContentLoaded', () => {
    // 5-second login-style intro
    const loginIntro = document.getElementById('loginIntro');
    setTimeout(() => {
        loginIntro.classList.add('opacity-0');
        setTimeout(() => {
            loginIntro.style.display = 'none';
            document.getElementById('header').style.display = 'block';
            document.getElementById('main-content').style.display = 'block';
            document.getElementById('footer').style.display = 'block';
        }, 500);
    }, 5000);

    // Tool card click logging (for dashboard context)
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolName = card.getAttribute('data-tool');
            console.log(`Clicked on ${toolName}`);
        });
    });

    console.log('ToolVerse Loaded');
});
