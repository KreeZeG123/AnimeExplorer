// Parocours animeData la recherche d'elemnt qui partage le meme id ( duplication ) et enrigistra dans un fichier les resutlat sans duplication
async function cleanAnimeData() {
  const fs = require("fs");
  const path = require("path");
  const animeData = require("../backup/animes.json");
  let animeDataClean = [];

  for (let i = 0; i < animeData.length; i++) {
    let anime = animeData[i];
    let isDuplicate = false;
    for (let j = 0; j < animeDataClean.length; j++) {
      if (animeDataClean[j].id === anime.id) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      animeDataClean.push(anime);
    }
  }

  const data = JSON.stringify(animeDataClean, null, 2);
  fs.writeFile(
    path.join(__dirname, "../backup/animes_clean.json"),
    data,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Fichier animes_clean.json créé avec succès");
      }
    }
  );
}

cleanAnimeData();
