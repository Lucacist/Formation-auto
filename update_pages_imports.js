const fs = require('fs');
const path = require('path');

function updateHtmlFile(filePath, pageNumber) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Mettre à jour le script module
    const newScript = `
    <script type="module">
        import { createSubContainers, updateQuizContainer } from './js/main.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const pageNumber = document.body.getAttribute('data-page-number');
            if (pageNumber) {
                createSubContainers(pageNumber);
                updateQuizContainer(pageNumber);
            }
        });
    </script>`;

    // Remplacer l'ancien script module
    content = content.replace(
        /<script type="module">\s*document\.addEventListener.*?<\/script>/s,
        newScript
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Page ${pageNumber} mise à jour`);
}

// Mettre à jour toutes les pages
for (let i = 1; i <= 30; i++) {
    const filePath = path.join(__dirname, `page${i}.html`);
    if (fs.existsSync(filePath)) {
        updateHtmlFile(filePath, i);
    }
}

console.log('Mise à jour terminée');
