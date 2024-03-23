// =======================================================
//             Configuration du server Back-End
// =======================================================

// Import des modules nécessaires
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// Configuration de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

// Configuration de la base de données
const keyMongoDB = require("fs").readFileSync("./secret/mongoDB.key", "utf8");
const uri =
  "mongodb+srv://" +
  keyMongoDB +
  "@cluster0.ht6tsjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Configuration du system de recherche ( Fuzzy Search )
const Fuse = require("fuse.js");

// =======================================================
//               Gestion de la base de données
// =======================================================
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

// =======================================================
//            Requêtes Gestions des utilisateurs
// =======================================================

// Route pour gerer la demande de verification de l'email
app.post("/emailDisponible", async (req, res) => {
  const emailUser = req.body.email;

  try {
    // Rerche de l'email dans la base de données
    const email = await Utilisateurs.findOne({ email: emailUser });

    // Si l'email est trouvé, renvoyer une réponse negative au client
    if (email) {
      console.log("L'email " + emailUser + " est déjà utilisé");
      res.status(200).json({
        message: "success",
        disponible: false,
      });
      return;
    }

    console.log("L'email " + emailUser + " est disponible");
    res.status(200).json({
      message: "success",
      disponible: true,
    });
  } catch (error) {
    console.error("Erreur pendant emailDisponible(" + emailUser + ") :", error);
    res.status(500).json({ message: "error" });
  }
});

// Route pour gérer la demande d'inscription
app.post("/signup", async (req, res) => {
  const usernameUser = req.body.username;
  const emailUser = req.body.email;
  const passwordUser = req.body.password;
  const scoresUser = [];

  try {
    // Ajouter l'utilisateur à la base de données
    const result = await Utilisateurs.insertOne({
      username: usernameUser,
      email: emailUser,
      password: passwordUser,
      scores: scoresUser,
    });
    // Récupère l'id attribué par la base de données a l'utilisateur
    console.log(
      "Inscription réussie pour (" +
        result.insertedId +
        " : " +
        usernameUser +
        " :" +
        emailUser +
        ":" +
        passwordUser +
        ")"
    );
    res.status(200).json({
      message: "success",
      id: result.insertedId,
      username: usernameUser,
      email: emailUser,
    });
  } catch (error) {
    console.error(
      "Erreur pendant inscription(" +
        usernameUser +
        "," +
        emailUser +
        "," +
        passwordUser +
        ") :",
      error
    );
    res.status(500).json({ message: "error" });
  }
});

// Route pour gérer la demande de connexion
app.post("/login", async (req, res) => {
  const emailUser = req.body.email;
  const passwordUser = req.body.password;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await Utilisateurs.findOne({ email: emailUser });

    // Si l'utilisateur n'est pas trouvé, renvoyer une réponse d'erreur au client
    if (!user) {
      console.log("email invalide");
      res.status(200).json({
        message: "wrongEmail",
      });
      return;
    }

    // Obtention du username, email, et id de l'utilisateur
    const username = user.username;
    const email = user.email;
    const id = user._id;

    // Vérification du mot de passe
    if (user.password !== passwordUser) {
      console.log("mot de passe invalide");
      res.status(200).json({
        message: "wrongPassword",
      });
      return;
    }

    console.log("success:" + id + ":" + username + ":" + email);
    res.status(200).json({
      message: "success",
      id: id,
      username: username,
      email: email,
    });
  } catch (error) {
    console.error(
      "Erreur pendant login(" + emailUser + "," + passwordUser + "): ",
      error
    );
    res.status(500).json({ message: "error" });
  }
});

// =======================================================
//            Requêtes Gestions des animes
// =======================================================

// Temp
const animeData = require("../tempStorage/animes.json");

// Configuration des options pour Fuse.js
const options = {
  keys: ["title.english", "title.romaji"], // Propriétés à rechercher
  threshold: 0.3, // Seuil de correspondance (ajustez selon vos besoins)
};

// Créez une instance de Fuse avec vos données et options
const fuse = new Fuse(animeData, options);

// Méthode chercherByName
function chercherByName(name) {
  const results = fuse.search(name);
  return results.map((result) => result.item);
}

function formatAnimeInfo(anime) {
  return {
    id: anime.id,
    title: [anime.title.english, anime.title.romaji],
    episodes: anime.episodes,
    studio: anime.studio,
    genres: anime.genres,
    tags: anime.tags,
    startDate: anime.startDate.year,
    season: anime.season,
    format: anime.format,
    image: anime.image,
    poupularity: anime.poupularity,
    score: anime.score,
    description: anime.description,
  };
}

function formatAnimesList(animes) {
  return animes.map((anime) => formatAnimeInfo(anime));
}

// Route pour gérer les demande de rechercher d'animes par nom avec Fuze.js
app.post("/searchAnimeByName", async (req, res) => {
  let rechercheName = req.body.name;
  console.log(
    "==============================================================="
  );
  console.log("Recherche d'anime par nom : " + rechercheName);
  try {
    console.log("1");
    let fuseSearchResults = chercherByName(rechercheName);
    console.log("2");
    let result = formatAnimesList(fuseSearchResults);
    console.log("result : ", result);
    // Renvoie le tableau result en retours de la requête
    res.status(200).json({
      message: "success",
      animes: result,
    });
    console.log("3");
  } catch (error) {
    console.log(
      "Erreur pendant rechercheAnimeByName(" + rechercheName + ") :",
      error
    );
    res.status(500).json({ message: "error" });
  }
});

// =======================================================
//                  Démarrage du serveur
// =======================================================
const port = 3080;
app.listen(port, () => {
  console.log(`Le serveur est en marche sur le port ${port}`);
});
