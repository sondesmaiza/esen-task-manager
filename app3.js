document.addEventListener('DOMContentLoaded', () => {
    // --- PART 1: Menu/Dark Mode/Music logic ---
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
    if(dropdown) dropdown.addEventListener('click', (e) => e.stopPropagation());

    // --- PART 2: Task Form Logic & Validation ---
    const taskForm = document.getElementById('task-form');
    const dateInput = document.getElementById('date-tache');

    if (dateInput) {
        const todayStr = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', todayStr);
    }

    const showError = (inputId, message) => {
        const inputElement = document.getElementById(inputId);
        const errorSpan = inputElement.nextElementSibling; 

        inputElement.classList.add('input-error');
        if (errorSpan && errorSpan.classList.contains('error-msg')) {
            errorSpan.textContent = message;
            errorSpan.classList.add('visible');
        }
    };

    const clearErrors = () => {
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('input-error');
        });
        document.querySelectorAll('.error-msg').forEach(span => {
            span.textContent = '';
            span.classList.remove('visible');
        });
    };

    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            let hasError = false;
            const userName = document.getElementById('nom-user').value.trim();
            const taskName = document.getElementById('nom-tache').value.trim();
            const priorityInput = document.querySelector('input[name="priority"]:checked');
            const taskDate = document.getElementById('date-tache').value;
            const taskDuration = document.getElementById('duree-tache').value;

            const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
            if (userName === "") {
                showError('nom-user', "Veuillez entrer votre nom.");
                hasError = true;
            } else if (!nameRegex.test(userName)) {
                showError('nom-user', "Le nom ne doit contenir que des lettres.");
                hasError = true;
            }

            if (taskName === "") {
                showError('nom-tache', "Veuillez donner un nom à la tâche.");
                hasError = true;
            }

            const selectedDate = new Date(taskDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (!taskDate) {
                showError('date-tache', "Veuillez choisir une date.");
                hasError = true;
            } else if (selectedDate < today) {
                showError('date-tache', "La date ne peut pas être dans le passé.");
                hasError = true;
            }

            if (!taskDuration || taskDuration <= 0) {
                showError('duree-tache', "Entrez une durée valide.");
                hasError = true;
            }

            if (hasError) return;

            const newTask = {
                id: Date.now(),
                user: userName,
                task: taskName,
                priority: priorityInput ? priorityInput.value : 'Moyenne',
                date: taskDate,
                duration: taskDuration,
                status: 'À faire'
            };

            const savedTasks = JSON.parse(localStorage.getItem('esen_tasks')) || [];
            savedTasks.push(newTask);
            localStorage.setItem('esen_tasks', JSON.stringify(savedTasks));

            alert("✅ Tâche ajoutée avec succès !");
            taskForm.reset(); 
        });

        taskForm.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT') {
                e.target.classList.remove('input-error');
                const errorSpan = e.target.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('error-msg')) {
                    errorSpan.classList.remove('visible');
                }
            }
        });
    }
});