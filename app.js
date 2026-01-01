document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const dropdown = document.getElementById('dropdown');
    const darkToggle = document.getElementById('dark-mode-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    const closeMenu = () => dropdown.classList.remove('active');

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

    document.addEventListener('click', () => closeMenu());
    dropdown.addEventListener('click', (e) => e.stopPropagation());
});
// Ajoutez simplement ceci à l'intérieur de votre DOMContentLoaded existant
const btnStart = document.querySelector('.btn-start');
if (btnStart) {
    btnStart.addEventListener('click', () => {
        window.location.href = "inscription.html";
    });
}