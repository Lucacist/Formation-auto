const fs = require('fs');
const path = require('path');

// Template HTML pour chaque page
function getPageTemplate(pageNumber) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page ${pageNumber} - Container</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <header class="main-header">
        <h1>Container ${pageNumber}</h1>
        <nav>
            <a href="index.html" class="back-btn">Retour à l'accueil</a>
            <div id="adminControls" style="display: none;">
                <button class="quiz-toggle-btn" onclick="toggleQuiz(${pageNumber})">Activer le Quiz</button>
                <span id="quizStatus" class="quiz-status-text">Quiz désactivé</span>
            </div>
        </nav>
    </header>
        
    <div class="sub-container-wrapper">
        <div class="sub-container-grid">
            <!-- Les 5 sous-containers standard -->
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

    <script src="js/config.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/main.js"></script>
    <script>
        // Vérifier l'authentification pour le panel admin
        checkAuth();
        // Créer les sous-containers
        createSubContainers(${pageNumber});
        // Mettre à jour l'état du quiz
        updateQuizStatus(${pageNumber});
    </script>
</body>
</html>`;
}

// Générer les pages
for (let i = 1; i <= 30; i++) {
    const pageContent = getPageTemplate(i);
    const filePath = path.join(__dirname, `page${i}.html`);
    fs.writeFileSync(filePath, pageContent);
    console.log(`Page ${i} générée avec succès`);
}
