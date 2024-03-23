// Importation de la bibliothèque MongoDB
const { MongoClient } = require("mongodb");

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

// Appel de la fonction de connexion à la base de données au démarrage du serveur
connectDatabase().catch(console.error);

var query = `
query {
  Page(page: 1, perPage: 200) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: POPULARITY_DESC) {
      id
      title {
        english
        romaji
      }
      startDate {
        year
      }
      format
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
      coverImage {
        extraLarge
        large
        medium
        color
      }
      popularity
    }
  }
}
`;
