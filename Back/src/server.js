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

// Route pour gérer la demande de connexion
app.post("/login", async (req, res) => {
  const emailUser = req.body.email;
  const passwordUser = req.body.password;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await Utilisateurs.findOne({ email: emailUser });

    // Si l'utilisateur n'est pas trouvé, renvoyer une réponse d'erreur au client
    if (!user) {
      console.log("wrongEmail");
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
      console.log("wrongPassword");
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
    console.error("Error during login:", error);
    res.status(500).json({ message: "error" });
  }
});

// Autres routes et configurations...

// Démarrage du serveur
const port = 3080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
