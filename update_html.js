const fs = require('fs');
const path = require('path');

// Fonction pour mettre à jour le HTML d'une page
function updateHtmlFile(filePath, pageNumber) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Ajouter l'attribut data-page-number au body
    content = content.replace(/<body[^>]*>/, `<body data-page-number="${pageNumber}">`);
    
    // Mettre à jour le bouton de quiz (supprimer l'attribut onclick)
    content = content.replace(
        /<button class="quiz-toggle-btn"[^>]*>/,
        `<button class="quiz-toggle-btn">`
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
