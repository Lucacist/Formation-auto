const fs = require('fs');
const path = require('path');

// Fonction pour mettre à jour le HTML d'une page
function updateHtmlFile(filePath, pageNumber) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Ajouter les scripts Firebase et modifier les imports
    const scriptTags = `
    <!-- Firebase App (the core Firebase SDK) -->
    <script type="module" src="js/firebase-config.js"></script>
    
    <!-- Autres scripts -->
    <script src="js/config.js"></script>
    <script src="js/quiz-config.js"></script>
    <script type="module" src="js/auth.js"></script>
    <script src="js/main.js"></script>
    
    <script type="module">
        // Initialiser après le chargement des modules
        document.addEventListener('DOMContentLoaded', function() {
            // Les fonctions seront appelées automatiquement par les modules
        });
    </script>`;
    
    // Remplacer les anciens scripts
    content = content.replace(/<script.*?<\/script>\s*<\/body>/s, scriptTags + '\n</body>');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Page ${pageNumber} mise à jour avec Firebase`);
}

// Mettre à jour toutes les pages
for (let i = 1; i <= 30; i++) {
    const filePath = path.join(__dirname, `page${i}.html`);
    if (fs.existsSync(filePath)) {
        updateHtmlFile(filePath, i);
    }
}

console.log('Mise à jour Firebase terminée');
