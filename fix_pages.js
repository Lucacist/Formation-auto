const fs = require('fs');
const path = require('path');

// Template HTML correct pour une page
function getPageTemplate(pageNumber) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page ${pageNumber} - Container</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body data-page-number="${pageNumber}">
    <header class="main-header">
        <h1>Container ${pageNumber}</h1>
        <nav>
            <a href="index.html" class="back-btn">Retour à l'accueil</a>
            <div id="adminControls" style="display: none;">
                <button class="quiz-toggle-btn">Activer le Quiz</button>
                <span id="quizStatus" class="quiz-status-text">Quiz désactivé</span>
            </div>
        </nav>
    </header>
        
    <div class="sub-container-wrapper">
        <div class="sub-container-grid">
            <!-- Les sous-containers seront ajoutés dynamiquement -->
        </div>

        <!-- Container Quiz -->
        <div class="quiz-container" id="quizContainer">
            <div class="container-item quiz-item">
                <img src="https://picsum.photos/300/200?random=quiz${pageNumber}" alt="Quiz Image">
                <h3>Quiz Container ${pageNumber}</h3>
                <div class="quiz-status">
                    <p id="quizLockedMessage" style="display: none;">Quiz verrouillé</p>
                    <a href="#" class="quiz-link" id="quizLink">Accéder au Quiz</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Firebase App (the core Firebase SDK) -->
    <script type="module" src="js/firebase-config.js"></script>
    
    <!-- Autres scripts -->
    <script src="js/config.js"></script>
    <script src="js/quiz-config.js"></script>
    <script type="module" src="js/auth.js"></script>
    <script src="js/main.js"></script>
    
    <script type="module">
        document.addEventListener('DOMContentLoaded', function() {
            // Le numéro de page est disponible via data-page-number
            const pageNumber = document.body.getAttribute('data-page-number');
            if (pageNumber) {
                createSubContainers(pageNumber);
            }
        });
    </script>
</body>
</html>`;
}

// Mettre à jour toutes les pages
for (let i = 1; i <= 30; i++) {
    const filePath = path.join(__dirname, `page${i}.html`);
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, getPageTemplate(i), 'utf8');
        console.log(`Page ${i} corrigée`);
    }
}

console.log('Correction des pages terminée');
