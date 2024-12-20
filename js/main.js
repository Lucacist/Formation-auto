import { homeContainers, pageContainers } from './config.js';

// Fonction pour créer les containers sur la page d'accueil
export function createContainers() {
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
export function createSubContainers(pageNumber) {
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
}

// Fonction pour mettre à jour le container quiz
export function updateQuizContainer(pageNumber) {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    const pageKey = `page${pageNumber}`;
    
    // Importer directement depuis quiz-config.js
    import('./quiz-config.js').then(module => {
        const quizData = module.quizConfig[pageKey];
        
        if (!quizData) {
            console.error(`No quiz data found for ${pageKey}`);
            return;
        }

        // Générer le HTML du quiz
        quizContainer.innerHTML = `
            <div class="container-item quiz-item">
                <img src="${quizData.image}" alt="${quizData.title}">
                <h3>${quizData.title}</h3>
                <div class="quiz-status">
                    <p id="quizLockedMessage" style="display: none;">${quizData.lockedMessage}</p>
                    <a href="${quizData.link}" class="quiz-link" id="quizLink">Accéder au Quiz</a>
                </div>
            </div>
        `;
    }).catch(error => {
        console.error('Error loading quiz config:', error);
    });
}

// Fonction pour mettre à jour l'état du quiz
export function updateQuizStatus(pageNumber) {
    const quizContainer = document.getElementById('quizContainer');
    const quizStatus = document.getElementById('quizStatus');
    const quizToggleBtn = document.querySelector('.quiz-toggle-btn');
    
    // On vérifie seulement quizStatus et quizToggleBtn pour le header
    if (quizStatus && quizToggleBtn) {
        const isEnabled = isQuizEnabled(pageNumber);
        
        if (isEnabled) {
            if (quizContainer) quizContainer.classList.remove('quiz-locked');
            quizStatus.textContent = 'Quiz activé';
            quizToggleBtn.textContent = 'Désactiver le Quiz';
            quizToggleBtn.style.backgroundColor = '#e74c3c';
        } else {
            if (quizContainer) quizContainer.classList.add('quiz-locked');
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
export function checkAuth() {
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
export function addQuizButtons() {
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
document.addEventListener('DOMContentLoaded', () => {
    const pageNumber = document.body.getAttribute('data-page-number');
    if (pageNumber) {
        createSubContainers(pageNumber);
        updateQuizContainer(pageNumber);
    } else if (document.querySelector('.container-grid')) {
        createContainers();
    }
});
