document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const dropdown = document.getElementById('dropdown');
    const darkToggle = document.getElementById('dark-mode-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const btnToRegister = document.getElementById('go-to-register');
    const btnToLogin = document.getElementById('go-to-login');

    const closeMenu = () => dropdown.classList.remove('active');

    btnToRegister.addEventListener('click', () => {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    btnToLogin.addEventListener('click', () => {
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    darkToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        setTimeout(closeMenu, 300); 
    });

    musicToggle.addEventListener('change', () => {
        musicToggle.checked ? bgMusic.play() : bgMusic.pause();
        setTimeout(closeMenu, 300);
    });

    document.addEventListener('click', closeMenu);
    dropdown.addEventListener('click', (e) => e.stopPropagation());
});