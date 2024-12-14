// Fonction pour créer les containers sur la page d'accueil
function createContainers() {
    const grid = document.querySelector('.container-grid');
    if (!grid) return;

    // Si homeContainers est vide, utiliser des données par défaut
    const containers = homeContainers.length > 0 ? homeContainers : Array.from({length: 30}, (_, i) => ({
        id: i + 1,
        title: `Container ${i + 1}`,
        image: `https://picsum.photos/300/200?random=${i + 1}`,
        link: `page${i + 1}.html`
    }));

    containers.forEach(container => {
        const containerElement = document.createElement('div');
        containerElement.className = 'container-item';
        containerElement.innerHTML = `
            <a href="${container.link}">
                <img src="${container.image}" alt="${container.title}">
                <h3>${container.title}</h3>
            </a>
        `;
        grid.appendChild(containerElement);
    });
}

// Fonction pour créer les sous-containers dans les pages individuelles
function createSubContainers(pageNumber) {
    const grid = document.querySelector('.sub-container-grid');
    if (!grid) return;

    // Récupérer les données de configuration
    const pageKey = `page${pageNumber}`;
    const containers = pageContainers[pageKey];

    if (!containers || containers.length === 0) {
        console.error(`No containers found for ${pageKey}`);
        return;
    }

    grid.innerHTML = ''; // Nettoyer le contenu existant
    containers.forEach(container => {
        const containerElement = document.createElement('div');
        containerElement.className = 'container-item';
        containerElement.innerHTML = `
            <a href="${container.link}">
                <img src="${container.image}" alt="${container.title}">
                <h3>${container.title}</h3>
            </a>
        `;
        grid.appendChild(containerElement);
    });

    // Mettre à jour le container quiz
    updateQuizContainer(pageNumber);
}

// Fonction pour mettre à jour le container quiz
function updateQuizContainer(pageNumber) {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;

    const pageKey = `page${pageNumber}`;
    const quizData = quizConfig[pageKey] || {
        title: `Quiz ${pageNumber}`,
        image: `https://picsum.photos/300/200?random=quiz${pageNumber}`,
        link: `#quiz${pageNumber}`,
        description: `Description du quiz ${pageNumber}`
    };

    const quizElement = quizContainer.querySelector('.quiz-item');
    if (quizElement) {
        quizElement.innerHTML = `
            <img src="${quizData.image}" alt="${quizData.title}">
            <h3>${quizData.title}</h3>
            <div class="quiz-status">
                <p class="quiz-description">${quizData.description}</p>
                <p id="quizLockedMessage" style="display: none;">Quiz verrouillé</p>
                <a href="${quizData.link}" class="quiz-link" id="quizLink">Accéder au Quiz</a>
            </div>
        `;
    }
}

// Fonction pour mettre à jour l'état du quiz
function updateQuizStatus(pageNumber) {
    const quizContainer = document.getElementById('quizContainer');
    const quizStatus = document.getElementById('quizStatus');
    const quizToggleBtn = document.querySelector('.quiz-toggle-btn');
    
    if (quizContainer && quizStatus && quizToggleBtn) {
        const isEnabled = isQuizEnabled(pageNumber);
        
        if (isEnabled) {
            quizContainer.classList.remove('quiz-locked');
            quizStatus.textContent = 'Quiz activé';
            quizToggleBtn.textContent = 'Désactiver le Quiz';
            quizToggleBtn.style.backgroundColor = '#e74c3c';
        } else {
            quizContainer.classList.add('quiz-locked');
            quizStatus.textContent = 'Quiz désactivé';
            quizToggleBtn.textContent = 'Activer le Quiz';
            quizToggleBtn.style.backgroundColor = '#3498db';
        }
    }
}

// Surcharger la fonction toggleQuiz pour mettre à jour l'interface
const originalToggleQuiz = window.toggleQuiz;
window.toggleQuiz = function(pageNumber) {
    originalToggleQuiz(pageNumber);
    updateQuizStatus(pageNumber);
};

// Vérifier si l'utilisateur est connecté et afficher les contrôles admin
function checkAuth() {
    const adminControls = document.getElementById('adminControls');
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        if (adminControls) {
            adminControls.style.display = 'flex';
        }
    } else {
        if (adminControls) {
            adminControls.style.display = 'none';
        }
    }
}

// Ajouter les boutons de quiz si l'utilisateur est connecté
function addQuizButtons() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const currentPage = window.location.pathname.match(/page(\d+)\.html/);
        if (currentPage) {
            const pageNumber = currentPage[1];
            const adminPanel = document.querySelector('.admin-panel');
            if (adminPanel) {
                const quizButton = document.createElement('button');
                quizButton.className = 'quiz-toggle-btn';
                quizButton.textContent = isQuizEnabled(pageNumber) ? 'Désactiver Quiz' : 'Activer Quiz';
                quizButton.onclick = () => {
                    toggleQuiz(pageNumber);
                    quizButton.textContent = isQuizEnabled(pageNumber) ? 'Désactiver Quiz' : 'Activer Quiz';
                };
                adminPanel.appendChild(quizButton);
            }
        }
    }
}

// Initialiser les containers au chargement de la page
if (document.querySelector('.container-grid')) {
    createContainers();
}
