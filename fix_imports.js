const fs = require('fs');
const path = require('path');

function updateHtmlImports(content) {
    // Remplacer le script inline par un import de module
    return content.replace(
        /<script type="module">\s*document\.addEventListener\('DOMContentLoaded'.*?<\/script>/s,
        `<script type="module">
            import { createContainers, createSubContainers, updateQuizContainer } from './js/main.js';
            
            document.addEventListener('DOMContentLoaded', () => {
                const pageNumber = document.body.getAttribute('data-page-number');
                if (pageNumber) {
                    createSubContainers(pageNumber);
                    updateQuizContainer(pageNumber);
                } else if (document.querySelector('.container-grid')) {
                    createContainers();
                }
            });
        </script>`
    );
}

// Mettre à jour toutes les pages HTML
for (let i = 1; i <= 30; i++) {
    const filePath = path.join(__dirname, `page${i}.html`);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = updateHtmlImports(content);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Page ${i} mise à jour avec les imports`);
    }
}

// Mettre à jour index.html aussi
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    content = updateHtmlImports(content);
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('index.html mis à jour avec les imports');
}

console.log('Mise à jour des imports terminée');
