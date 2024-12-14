// Informations de connexion (à remplacer par une vraie authentification sécurisée)
const validCredentials = {
    username: 'admin',
    password: 'admin123'
};

// États des quiz pour chaque page
let quizStates = {};

// Initialisation des états des quiz depuis le localStorage global
function initQuizStates() {
    console.log('Initialisation des états des quiz...');
    const savedStates = localStorage.getItem('globalQuizStates');
    if (savedStates) {
        quizStates = JSON.parse(savedStates);
        console.log('États chargés:', quizStates);
    } else {
        for (let i = 1; i <= 30; i++) {
            quizStates[`page${i}`] = false;
        }
        localStorage.setItem('globalQuizStates', JSON.stringify(quizStates));
        console.log('Nouveaux états créés:', quizStates);
    }
}

// Gestion de la modal de connexion
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.getElementById('closeModal');

if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'flex';
    });
}

if (closeModal) {
    closeModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
}

window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Gestion du formulaire de connexion
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validCredentials.username && password === validCredentials.password) {
            console.log('Connexion admin réussie');
            loginModal.style.display = 'none';
            document.getElementById('loginBtn').style.display = 'none';
            
            // Stocker l'état de connexion
            localStorage.setItem('isAdmin', 'true');
            
            // Afficher les contrôles admin
            const adminControls = document.getElementById('adminControls');
            if (adminControls) {
                adminControls.style.display = 'block';
                console.log('Contrôles admin affichés');
            }
            
            // Ajouter les écouteurs d'événements aux boutons
            addQuizButtonListeners();
            
            // Rafraîchir l'état du quiz
            const pageNumber = document.body.getAttribute('data-page-number');
            if (pageNumber) {
                updateQuizStatus(pageNumber);
            }
        } else {
            alert('Identifiants incorrects');
        }
    });
}

// Gestion de la déconnexion
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        // Déconnexion
        localStorage.removeItem('isAdmin');
        
        // Cacher les contrôles admin
        const adminControls = document.getElementById('adminControls');
        if (adminControls) {
            adminControls.style.display = 'none';
        }
        
        // Afficher le bouton de connexion
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.style.display = 'block';
        }
        
        // Réinitialiser le formulaire
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
    });
}

// Fonction pour basculer l'état d'un quiz
function toggleQuiz(pageNumber) {
    console.log('Tentative de basculement du quiz', pageNumber);
    
    if (!isAdmin()) {
        console.log('Non autorisé: utilisateur non admin');
        return;
    }

    const pageKey = `page${pageNumber}`;
    quizStates[pageKey] = !quizStates[pageKey];
    console.log('Nouvel état du quiz:', pageKey, quizStates[pageKey]);
    
    // Sauvegarder dans le localStorage global
    localStorage.setItem('globalQuizStates', JSON.stringify(quizStates));
    
    // Mettre à jour l'interface
    updateQuizStatus(pageNumber);
}

// Fonction pour vérifier si un quiz est activé
function isQuizEnabled(pageNumber) {
    const currentStates = JSON.parse(localStorage.getItem('globalQuizStates') || '{}');
    const isEnabled = currentStates[`page${pageNumber}`] === true;
    console.log('État du quiz', pageNumber, ':', isEnabled);
    return isEnabled;
}

// Fonction pour vérifier si l'utilisateur est admin
function isAdmin() {
    const isAdminUser = localStorage.getItem('isAdmin') === 'true';
    console.log('Est admin?', isAdminUser);
    return isAdminUser;
}

// Fonction pour mettre à jour l'état du quiz
function updateQuizStatus(pageNumber) {
    console.log('Mise à jour du statut du quiz', pageNumber);
    
    const quizContainer = document.querySelector('.quiz-container');
    const quizLockedMessage = document.getElementById('quizLockedMessage');
    const quizLink = document.getElementById('quizLink');
    const quizToggleBtn = document.querySelector('.quiz-toggle-btn');
    
    if (!quizContainer || !quizLockedMessage || !quizLink) {
        console.log('Éléments manquants dans le DOM');
        return;
    }
    
    const isEnabled = isQuizEnabled(pageNumber);
    console.log('Quiz activé?', isEnabled);
    
    if (isEnabled) {
        quizContainer.classList.remove('quiz-locked');
        quizLockedMessage.style.display = 'none';
        quizLink.style.display = 'block';
        if (quizToggleBtn) {
            quizToggleBtn.textContent = 'Désactiver le Quiz';
            quizToggleBtn.style.backgroundColor = '#e74c3c';
        }
    } else {
        quizContainer.classList.add('quiz-locked');
        quizLockedMessage.style.display = 'block';
        quizLink.style.display = 'none';
        if (quizToggleBtn) {
            quizToggleBtn.textContent = 'Activer le Quiz';
            quizToggleBtn.style.backgroundColor = '#2ecc71';
        }
    }
}

// Fonction pour ajouter les écouteurs d'événements aux boutons de quiz
function addQuizButtonListeners() {
    console.log('Ajout des écouteurs aux boutons de quiz');
    const quizToggleBtn = document.querySelector('.quiz-toggle-btn');
    
    if (quizToggleBtn) {
        console.log('Bouton trouvé, ajout du listener');
        quizToggleBtn.removeAttribute('onclick');
        
        quizToggleBtn.addEventListener('click', function() {
            console.log('Clic sur le bouton de quiz');
            const pageNumber = document.body.getAttribute('data-page-number');
            if (pageNumber) {
                console.log('Numéro de page trouvé:', pageNumber);
                toggleQuiz(parseInt(pageNumber));
            } else {
                console.log('Pas de numéro de page trouvé');
            }
        });
    } else {
        console.log('Bouton de quiz non trouvé');
    }
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page chargée');
    initQuizStates();
    
    const pageNumber = document.body.getAttribute('data-page-number');
    console.log('Numéro de page:', pageNumber);
    
    if (pageNumber) {
        updateQuizStatus(pageNumber);
    }

    // Vérifier si l'utilisateur est admin
    if (isAdmin()) {
        console.log('Utilisateur admin détecté');
        const adminControls = document.querySelectorAll('.admin-only, #adminControls');
        adminControls.forEach(control => {
            if (control) {
                control.style.display = 'block';
                console.log('Contrôle admin affiché:', control);
            }
        });
        
        // Ajouter les écouteurs d'événements aux boutons
        addQuizButtonListeners();
    } else {
        console.log('Utilisateur non admin');
    }
});

// Vérifier l'état de connexion au chargement de la page
window.addEventListener('load', function() {
    if (localStorage.getItem('isAdmin') === 'true') {
        const loginBtn = document.getElementById('loginBtn');
        const adminControls = document.getElementById('adminControls');
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (adminControls) adminControls.style.display = 'flex';
        
        // Mettre à jour l'état du quiz si on est sur une page de quiz
        const pageMatch = window.location.pathname.match(/page(\d+)\.html/);
        if (pageMatch) {
            updateQuizStatus(pageMatch[1]);
        }
    }
});

// Écouter les changements d'état des quiz dans d'autres onglets/fenêtres
window.addEventListener('storage', function(e) {
    if (e.key === 'globalQuizStates') {
        quizStates = JSON.parse(e.newValue || '{}');
        const pageNumber = document.body.getAttribute('data-page-number');
        if (pageNumber) {
            updateQuizStatus(pageNumber);
        }
    }
});

// Écouter les changements d'état des quiz dans l'onglet courant
window.addEventListener('quizStateChanged', function(e) {
    const pageNumber = document.body.getAttribute('data-page-number');
    if (pageNumber && pageNumber === e.detail.pageNumber.toString()) {
        updateQuizStatus(pageNumber);
    }
});
