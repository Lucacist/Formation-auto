const fs = require('fs');
const path = require('path');

function updateScriptTags(content) {
    return content.replace(
        /<script src="js\/(.*?)\.js"><\/script>/g,
        '<script type="module" src="js/$1.js"></script>'
    );
}

// Mettre à jour toutes les pages HTML
for (let i = 1; i <= 30; i++) {
    const filePath = path.join(__dirname, `page${i}.html`);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = updateScriptTags(content);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Page ${i} mise à jour avec type="module"`);
    }
}

// Mettre à jour index.html aussi
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    content = updateScriptTags(content);
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('index.html mis à jour avec type="module"');
}

console.log('Mise à jour des scripts terminée');
