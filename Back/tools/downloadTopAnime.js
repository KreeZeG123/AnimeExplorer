// Iimportation des modules nécessaires
const { MongoClient } = require("mongodb");
const path = require("path");
const fs = require("fs");

// Configuration de la base de données
const keyMongoDB = require("fs").readFileSync("./secret/mongoDB.key", "utf8");
const uri =
  "mongodb+srv://" +
  keyMongoDB +
  "@cluster0.ht6tsjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let Utilisateurs; // Déclaration de la collection utilisateurs
let Animes; // Déclaration de la collection animes

// Connexion à la base de données
async function connectDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");

    // Assignation des collections
    const database = client.db("AnimeExplorer");
    Utilisateurs = database.collection("utilisateurs");
    Animes = database.collection("animes");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

// Définition de la requête GraphQL
var query = `
query($page: Int) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: POPULARITY_DESC, type: ANIME) {
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

// Fonction pour récupérer les données pour une page donnée
async function fetchData(page) {
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { page },
      }),
    });
    const { data } = await response.json();
    return data.Page.media;
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    return [];
  }
}

// Fonction pour récupérer les données pour les 20 premières pages
async function fetchAllData() {
  const allData = [];
  for (let page = 1; page <= 20; page++) {
    const data = await fetchData(page);
    allData.push(data);
    // Attente de 3 seconde entre chaque requête
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 1000) + 3000)
    );
    // Affichage de la page
    console.log("Page " + page + " récupérée");
  }
  console.log("=====================================================");
  return allData;
}

// Appel de la fonction pour récupérer toutes les données
fetchAllData()
  .then((data) => {
    console.log("Données récupérées avec succès :");
    let animes = [];
    for (let i = 0; i < data.length; i++) {
      console.log("=====================================================");
      console.log("Page " + (i + 1) + " :");
      console.log("=====================================================");
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j].title.english != null) {
          console.log(data[i][j].title.english);
        } else {
          console.log(data[i][j].title.romaji);
        }
        animes.push(data[i][j]);
      }
      // Ecris les données dans un fichier JSON
      fs.writeFileSync(
        path.resolve(__dirname, "../backup/animes.json"),
        JSON.stringify(animes, null, 2)
      );
    }
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      error
    );
  });
