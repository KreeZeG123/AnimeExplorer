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
    console.log("Connexion à la base de données réussie");

    // Assignation des collections
    const database = client.db("AnimeExplorer");
    Utilisateurs = database.collection("utilisateurs");
    Animes = database.collection("animes");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

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

  try {
    // Ajouter l'utilisateur à la base de données
    const result = await Utilisateurs.insertOne({
      username: usernameUser,
      email: emailUser,
      password: passwordUser,
      score: 0,
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
      userID: result.insertedId,
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
      console.log("email invalide pour " + emailUser);
      res.status(200).json({
        message: "wrongEmail",
      });
      return;
    }

    // Obtention du username, email, et id de l'utilisateur
    const username = user.username;
    const email = user.email;
    const id = user._id.toString();

    // Vérification du mot de passe
    if (user.password !== passwordUser) {
      console.log("mot de passe invalide pour " + emailUser);
      res.status(200).json({
        message: "wrongPassword",
      });
      return;
    }

    console.log("Connection de : " + id + ":" + username + ":" + email);
    res.status(200).json({
      message: "success",
      userID: id,
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
//            Requêtes Recherche Animes
// =======================================================

// Variables pour la recherche floue
let animeData;
let fuse;

// Fonction pour charger les données de la collection Animes et configurer Fuse.js
async function loadFuzzySearch() {
  // Configuration des options pour Fuse.js
  const options = {
    keys: ["title.english", "title.romaji"], // Propriétés à rechercher
    threshold: 0.3, // Seuil de correspondance (ajustez selon vos besoins)
    includeScore: true, // Inclure le score dans les résultats
  };
  // Récupération des données de la collection Animes
  animeData = await Animes.find({}).toArray();
  // Création de l'instance Fuse pour la recherche floue
  fuse = new Fuse(animeData, options);
  console.log("Recherche floue prête");
}

// Fonction pour formater les informations d'un anime
function formatAnimeInfo(anime) {
  return {
    id: anime.id,
    title: {
      english: anime.title.english,
      romaji: anime.title.romaji,
    },
    episodes: anime.episodes,
    studios: anime.studios.nodes.map((node) => node.name),
    genres: anime.genres,
    tags: anime.tags.map((tag) => tag.name),
    startDate: anime.startDate.year,
    season: anime.season,
    format: anime.format,
    coverImage: {
      extraLarge: anime.coverImage.extraLarge,
      large: anime.coverImage.large,
      medium: anime.coverImage.medium,
      color: anime.coverImage.color,
    },
    popularity: anime.poupularity,
    meanScore: anime.meanScore,
    description: anime.description,
  };
}

// Fonction pour formater une liste d'animes
function formatAnimesList(animes) {
  return animes.map((anime) => formatAnimeInfo(anime));
}

// Fonction pour faire une recherche floue d'un anime
function chercherByName(name) {
  const results = fuse.search(name);
  return results.slice(0, 15).map((result) => result.item);
}

// Route pour gérer les demande de rechercher d'animes par nom avec Fuze.js
app.post("/searchAnimeByName", async (req, res) => {
  let rechercheName = req.body.name;
  try {
    let fuseSearchResults = chercherByName(rechercheName);
    let result = formatAnimesList(fuseSearchResults);
    // Renvoie le tableau result en retours de la requête
    res.status(200).json({
      message: "success",
      animes: result,
    });
  } catch (error) {
    console.log(
      "Erreur pendant rechercheAnimeByName(" + rechercheName + ") :",
      error
    );
    res.status(500).json({ message: "error" });
  }
});

// =======================================================
//            Requêtes Classement Joueurs
// =======================================================

// Route pour gérer la demande de récupération du classement
app.post("/ranking", async (req, res) => {
  const userID = req.body.userID;

  try {
    // Verifie si la collection utilisateur est bien chargée
    if (Utilisateurs == null) {
      console.error(
        "Erreur de connexion à la base de données : Utilisateurs ( /ranking )"
      );
      res.status(200).json({
        message: "error",
        error: "User is null",
      });
      return;
    }

    // Récupération des noms et points de tous les utilisateurs triés par score
    const classement = await Utilisateurs.find()
      .sort({ score: -1 })
      .project({ _id: 1, username: 1, score: 1 })
      .toArray();

    let userScore = "";
    let userRank = "";

    if (
      userID != null &&
      userID != "" &&
      userID != undefined &&
      userID != "undefined" &&
      userID != "none"
    ) {
      const loggedUser = classement.find(
        (user) => user._id.toString() == userID
      );
      if (loggedUser != undefined && loggedUser != null) {
        userScore = loggedUser.score;
      }

      const loggedUserRank = classement.findIndex(
        (user) => user._id.toString() == userID
      );
      if (
        loggedUserRank != -1 &&
        loggedUserRank != undefined &&
        loggedUserRank != null
      ) {
        userRank = loggedUserRank + 1 + "/" + classement.length;
      }
    }

    res.status(200).json({
      message: "success",
      classement: classement.slice(0, 5),
      personalRanking: {
        point: userScore,
        ranking: userRank,
      },
    });
  } catch (error) {
    console.error("Erreur pendant getClassement() :", error);
    res.status(500).json({ message: "error" });
  }
});

// =======================================================
//                  Démarrage du serveur
// =======================================================
async function run() {
  await connectDatabase().catch(console.error);
  await loadFuzzySearch().catch(console.error);

  const port = 3080;
  app.listen(port, () => {
    console.log(`Le serveur est en marche sur le port ${port}`);
  });
}

run();
