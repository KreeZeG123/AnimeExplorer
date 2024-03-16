// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
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

// Define our query variables and values that will be used in the query request
var variables = {};

// Define the config we'll need for our Api request
var url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

// Make the HTTP Api request
fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

const path = require("path");
const fs = require("fs");

function handleData(data) {
  // Utilisez JSON.stringify avec indentation pour formater le résultat
  const formattedResult = JSON.stringify(data, null, 2);

  // Créez un chemin pour le fichier de sortie
  const outputPath = path.join(__dirname, "..", "out", "output.json");

  // Enregistrez le résultat dans un fichier .json
  fs.writeFileSync(outputPath, formattedResult, "utf-8");

  console.log("Données enregistrées dans", outputPath);
}

function handleError(error) {
  console.error("Error, check console");
  console.error(error);
}
