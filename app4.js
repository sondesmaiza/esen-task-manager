document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu & Dark Mode & Musique (Même logique que Ajouter)
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
        localStorage.setItem('darkMode', document.body.classList.contains('dark') ? 'enabled' : 'disabled');
        setTimeout(closeMenu, 300);
    });

    musicToggle.addEventListener('change', () => {
        musicToggle.checked ? bgMusic.play() : bgMusic.pause();
        setTimeout(closeMenu, 300);
    });

    document.addEventListener('click', () => closeMenu());

    // 2. Gestion de l'affichage des tâches
    const display = document.getElementById('tasks-display');

    const refreshList = () => {
        const tasks = JSON.parse(localStorage.getItem('esen_tasks')) || [];
        display.innerHTML = '';
        const prios = ['Urgente', 'Moyenne', 'Faible'];

        prios.forEach(p => {
            const filtered = tasks.filter(t => t.priority === p);
            if (filtered.length > 0) {
                const group = document.createElement('div');
                group.className = 'prio-group';
                group.innerHTML = `<div class="prio-title" style="color: var(--esen-blue)">• ${p}</div>`;
                
                filtered.forEach(t => {
                    const item = document.createElement('div');
                    item.className = `task-item ${t.status === 'Terminée' ? 'task-done' : ''} ${t.status === 'En attente' ? 'task-waiting' : ''}`;
                    item.innerHTML = `
                        <span>${t.task}</span>
                        <div class="action-btns">
                            <button class="btn-act btn-edit" onclick="modifyTask(${t.id})"><i class="fas fa-pen"></i></button>
                            <button class="btn-act btn-del" onclick="deleteTask(${t.id})"><i class="fas fa-trash"></i></button>
                            <button class="btn-act btn-wait" onclick="toggleWait(${t.id})"><i class="fas fa-clock"></i></button>
                            <button class="btn-act btn-check" onclick="toggleComplete(${t.id})"><i class="fas fa-check"></i></button>
                        </div>
                    `;
                    group.appendChild(item);
                });
                display.appendChild(group);
            }
        });
    };

    // Actions avec confirmation pour la suppression
    window.deleteTask = (id) => {
        if(confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            let tasks = JSON.parse(localStorage.getItem('esen_tasks')).filter(x => x.id !== id);
            localStorage.setItem('esen_tasks', JSON.stringify(tasks));
            refreshList();
        }
    };

    window.modifyTask = (id) => {
        let tasks = JSON.parse(localStorage.getItem('esen_tasks'));
        const t = tasks.find(x => x.id === id);
        const n = prompt("Modifier le nom de la tâche :", t.task);
        if(n) { t.task = n; localStorage.setItem('esen_tasks', JSON.stringify(tasks)); refreshList(); }
    };

    window.toggleWait = (id) => {
        let tasks = JSON.parse(localStorage.getItem('esen_tasks'));
        const t = tasks.find(x => x.id === id);
        t.status = t.status === 'En attente' ? 'À faire' : 'En attente';
        localStorage.setItem('esen_tasks', JSON.stringify(tasks)); refreshList();
    };

    window.toggleComplete = (id) => {
        let tasks = JSON.parse(localStorage.getItem('esen_tasks'));
        const t = tasks.find(x => x.id === id);
        t.status = t.status === 'Terminée' ? 'À faire' : 'Terminée';
        localStorage.setItem('esen_tasks', JSON.stringify(tasks)); refreshList();
    };

    refreshList();
});