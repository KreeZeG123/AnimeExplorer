// Iimportation des modules nécessaires
const { MongoClient } = require("mongodb");
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

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

async function deleteCollectionAnimeFromDB() {
  try {
    await connectDatabase();
    await Animes.deleteMany({});
    console.log("Collection animes deleted");
  } catch (error) {
    console.error("Error deleting collection animes:", error);
    throw error;
  }
}

// Fonction qui demande confirmation avant de supprimer la collection animes
function deleteCollectionAnimeFromDBWithConfirmation() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(
    "Are you sure you want to delete the collection animes? (yes/no) ",
    (response) => {
      if (response === "yes") {
        deleteCollectionAnimeFromDB();
      } else {
        console.log("Collection animes not deleted");
      }
      readline.close();
    }
  );
}

deleteCollectionAnimeFromDBWithConfirmation();
