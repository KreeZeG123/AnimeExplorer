const animeData = require('./output.json');
let format="TV"
const fs = require('fs');

const fileName = 'example.txt';
const content = ''; // Contenu vide car vous écrivez directement dans la boucle

fs.writeFile(fileName, content, (err) => {
    if (err) {
        console.error('Erreur lors de l\'écriture dans le fichier :', err);
        return;
    }
    let contentToWrite = ''; // Initialisez la variable pour stocker le contenu à écrire dans le fichier
    for (let i = 2024; i > 1970; i--) {
        contentToWrite += `"${i}",`;
    }

    fs.writeFile(fileName, contentToWrite, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture dans le fichier :', err);
            return;
        }
        console.log(`Le contenu a été écrit dans le fichier ${fileName}`);
    });
});

