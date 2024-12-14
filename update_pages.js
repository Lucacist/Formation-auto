const fs = require('fs');
const path = require('path');

// Fonction pour ajouter le script quiz-config.js
function addQuizConfigScript(content) {
    return content.replace(
        '<script src="js/config.js"></script>',
        '<script src="js/config.js"></script>\n    <script src="js/quiz-config.js"></script>'
    );
}

// Parcourir tous les fichiers HTML
for (let i = 1; i <= 30; i++) {
    const filename = `page${i}.html`;
    const filepath = path.join(__dirname, filename);

    if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        const updatedContent = addQuizConfigScript(content);
        fs.writeFileSync(filepath, updatedContent);
        console.log(`Updated ${filename}`);
    }
}
