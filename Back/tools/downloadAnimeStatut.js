const path = require("path");
const fs = require("fs");

const query = `
query ($status: MediaStatus) {
  Page(page: 1, perPage: 10) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: POPULARITY_DESC, type: ANIME, status: $status) {
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
}
`;

// Récupère dans un fichier (../back/animeStatus.json) les animes de avec le status donnée
async function downloadAnimeStatus(status) {
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { status },
      }),
    });
    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    throw new Error("Impossible de récupérer les données");
  }
}

// Récupère 10 animes de tout les status [ FINISHED, RELEASING, NOT_YET_RELEASED, CANCELLED ]
async function downloadAllAnimeStatus() {
  const status = ["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED"];
  let data = [];
  for (let i = 0; i < status.length; i++) {
    const animeStatus = await downloadAnimeStatus(status[i]);
    console.log("=====================================");
    console.log(`Status : ${status[i]}`);
    console.log("=====================================");
    for (let j = 0; j < animeStatus.length; j++) {
      console.log(animeStatus[j].title.romaji);
      data.push(animeStatus[j]);
    }
  }
  return data;
}

// Enregistre les données dans un fichier
function saveData(data) {
  const dataString = JSON.stringify(data, null, 2);
  fs.writeFile(
    path.join(__dirname, "../backup/animeStatus.json"),
    dataString,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Fichier animeStatus.json créé avec succès");
      }
    }
  );
}

// Appel de la fonction pour récupérer toutes les données
downloadAllAnimeStatus()
  .then((data) => {
    console.log(data.length);
    console.log("Données récupérées avec succès :");
    saveData(data);
  })
  .catch((error) => {
    console.error("Une erreur s'est produite :", error);
  });
