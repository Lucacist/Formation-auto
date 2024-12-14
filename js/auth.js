// Informations de connexion (à remplacer par une vraie authentification sécurisée)
const validCredentials = {
    username: 'admin',
    password: 'admin123'
};

// États des quiz pour chaque page
let quizStates = {};

// Initialisation des états des quiz
for (let i = 1; i <= 30; i++) {
    quizStates[`page${i}`] = false;
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
            // Connexion réussie
            loginModal.style.display = 'none';
            document.getElementById('loginBtn').style.display = 'none';
            
            // Afficher les contrôles admin sur toutes les pages
            const adminControls = document.getElementById('adminControls');
            if (adminControls) {
                adminControls.style.display = 'flex';
            }
            
            // Stocker l'état de connexion
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Rafraîchir l'état du quiz si on est sur une page de quiz
            const pageMatch = window.location.pathname.match(/page(\d+)\.html/);
            if (pageMatch) {
                updateQuizStatus(pageMatch[1]);
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
        sessionStorage.removeItem('isLoggedIn');
        
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

// Vérifier l'état de connexion au chargement de la page
window.addEventListener('load', function() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
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

// Fonction pour basculer l'état d'un quiz
function toggleQuiz(pageNumber) {
    quizStates[`page${pageNumber}`] = !quizStates[`page${pageNumber}`];
    // Sauvegarder l'état dans le sessionStorage
    sessionStorage.setItem('quizStates', JSON.stringify(quizStates));
    // Mettre à jour l'interface
    updateQuizStatus(pageNumber);
}

// Fonction pour vérifier si un quiz est activé
function isQuizEnabled(pageNumber) {
    const states = JSON.parse(sessionStorage.getItem('quizStates')) || quizStates;
    return states[`page${pageNumber}`];
}

// Fonction pour mettre à jour l'état du quiz
function updateQuizStatus(pageNumber) {
    const quizStatus = isQuizEnabled(pageNumber);
    const quizElement = document.getElementById(`quiz-${pageNumber}`);
    if (quizElement) {
        if (quizStatus) {
            quizElement.style.display = 'block';
        } else {
            quizElement.style.display = 'none';
        }
    }
}
