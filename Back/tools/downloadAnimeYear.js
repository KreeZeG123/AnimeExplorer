const path = require("path");
const fs = require("fs");

const query = `query ($year: FuzzyDateInt) {
  Page(page: 1, perPage: 10) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: POPULARITY_DESC, type: ANIME, startDate: $year) {
      id
      title {
        english
        romaji
      }
      episodes
      studios {
        nodes {
          name
        }
      }
      genres
      tags {
        name
      }
      startDate {
        year
      }
      season
      format
      coverImage {
        extraLarge
        large
        medium
        color
      }
      popularity
      meanScore
      description
      status
      bannerImage
    }
  }
}`;

// Récupère dans un fichier (../back/animeYear.json) les animes de l'année donnée au format ( année * 10000)
async function downloadAnimeYear(year) {
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { year },
      }),
    });
    const { data } = await response.json();
    return data.Page.media;
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    return [];
  }
}

// Récupère les animes de l'année des années 2024 à 1971
async function downloadAllAnimeYear() {
  let allData = [];
  for (let year = 2024; year >= 1971; year--) {
    let data = await downloadAnimeYear(year * 10000);
    allData.push(data);
    console.log("Données récupérées pour l'année", year * 10000);
    // Attendre entre 2 et 3 seconde avant de continuer
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 1000)
    );
  }
  return allData;
}

// Enregistre les données dans un fichier
async function saveData(data) {
  // Parcours les données pour les enregistrer dans un fichier
  let allData = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      allData.push(data[i][j]);
    }
  }
  fs.writeFileSync(
    path.resolve(__dirname, "../backup/animeYear.json"),
    JSON.stringify(allData, null, 2)
  );
}

// Appel de la fonction pour récupérer toutes les données
downloadAllAnimeYear()
  .then((data) => {
    console.log("Données récupérées avec succès :");
    saveData(data);
  })
  .catch((error) => {
    console.error("Une erreur s'est produite :", error);
  });
