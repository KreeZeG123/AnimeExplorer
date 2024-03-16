const { MongoClient } = require("mongodb");

const keyMongoDB = require("fs").readFileSync("./secret/mongoDB.key", "utf8");

const uri =
  "mongodb+srv://" +
  keyMongoDB +
  "@cluster0.ht6tsjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Fonction pour ajouter un utilisateur
async function addUser(username, email, encryptedPassword) {
  try {
    await client.connect();
    const database = client.db("AnimeExplorer");
    const users = database.collection("utilisateurs");

    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      return "usedEmail";
    } else {
      await users.insertOne({
        username: username,
        email: email,
        password: encryptedPassword,
      });
      return "ok";
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    return "error";
  } finally {
    await client.close();
  }
}

// Fonction pour récupérer un utilisateur par son email
async function getUserByEmail(email) {
  try {
    await client.connect();
    const database = client.db("AnimeExplorer");
    const users = database.collection("utilisateurs");

    const user = await users.findOne({ email: email });
    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
  } finally {
    await client.close();
  }
}

async function test() {
  const result = await addUser("test1", "test@test.fr", "l3info");
  console.log(result);
}

test();
