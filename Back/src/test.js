const Fuse = require("fuse.js");

const animeData = [
  {
    id: 16498,
    title: {
      english: "Attack on Titan",
      romaji: "Shingeki no Kyojin",
    },
    episodes: 12,
    studio: ["Wit Studio", "MAPPA"],
    genres: ["Action", "Drama", "Fantasy"],
    tags: ["Gore", "Tragedy", "Dark Fantasy"],
    startDate: "2013-04-07",
    season: "Spring",
    format: "TV",
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    poupularity: 1,
    score: 8.52,
    description:
      "L'histoire tourne autour de Eren Jäger, sa sœur adoptive Mikasa Ackerman et leur ami Armin Arlert, qui se sont engagés à venger la mort de leur mère en tuant tous les Titans.",
  },
  {
    id: 101922,
    title: {
      english: "Demon Slayer: Kimetsu no Yaiba",
      romaji: "Kimetsu no Yaiba",
    },
    episodes: 26,
    studio: ["ufotable"],
    genres: ["Action", "Demons", "Historical"],
    tags: ["Supernatural", "Shounen", "Manga"],
    startDate: "2019-04-06",
    season: "Spring",
    format: "TV",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    poupularity: 2,
    score: 8.72,
    description:
      "L'histoire suit Tanjiro Kamado, un jeune garçon qui veut devenir un chasseur de démons pour venger sa famille massacrée et guérir sa sœur Nezuko, devenue un démon.",
  },
  {
    id: 1535,
    title: {
      english: "Death Note",
      romaji: "DEATH NOTE",
    },
    episodes: 37,
    studio: ["Madhouse"],
    genres: ["Mystery", "Psychological", "Supernatural"],
    tags: ["Shounen", "Manga", "Detective"],
    startDate: "2006-10-04",
    season: "Fall",
    format: "TV",
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    poupularity: 3,
    score: 8.63,
    description:
      "L'histoire suit Light Yagami, un étudiant surdoué qui trouve un carnet permettant de tuer une personne en écrivant son nom.",
  },
];

const options = {
  keys: ["title.english", "title.romaji"],
  threshold: 0.4,
};

const fuse = new Fuse(animeData, options);

const userInput = "death";
const results = fuse.search(userInput);

results.forEach((result) => {
  console.log("Anime trouvé :\n", result.item);
});
