document.addEventListener('DOMContentLoaded', () => {
    // --- Éléments du Menu ---
    const menuBtn = document.getElementById('menuBtn');
    const dropdown = document.getElementById('dropdown');
    const darkToggle = document.getElementById('dark-mode-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    const closeMenu = () => dropdown.classList.remove('active');

    // Ouverture Menu
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Dark Mode
    darkToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        // Sauvegarde le choix de l'utilisateur
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
        setTimeout(closeMenu, 300); 
    });

    // Musique
    musicToggle.addEventListener('change', () => {
        musicToggle.checked ? bgMusic.play() : bgMusic.pause();
        setTimeout(closeMenu, 300);
    });

    // Fermer menu au clic extérieur
    document.addEventListener('click', () => closeMenu());
    if(dropdown) dropdown.addEventListener('click', (e) => e.stopPropagation());

    // Vérification du Dark Mode au chargement
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        if(darkToggle) darkToggle.checked = true;
    }
});