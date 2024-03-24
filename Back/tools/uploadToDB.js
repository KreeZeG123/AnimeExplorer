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

async function uploadToDB() {
  try {
    await connectDatabase();
    const animeData = require("../backup/animes.json");

    // Parcours les 100 premiers animes
    for (let i = 0; i < animeData.length; i++) {
      const anime = animeData[i];
      // Regarde si l'anime existe déjà dans la base de données
      const animeExists = await Animes.findOne({ id: anime.id });
      if (!animeExists) {
        // Si l'anime n'existe pas, on l'ajoute
        await Animes.insertOne(anime);
        console.log("Anime ajouté à la base de données:", anime.title.english);
      } else {
        console.log(
          "L'anime existe déjà dans la base de données:",
          anime.title.english
        );
      }
    }
  } catch (error) {
    console.error("Error uploading to the database:", error);
    throw error;
  }
}

uploadToDB();
