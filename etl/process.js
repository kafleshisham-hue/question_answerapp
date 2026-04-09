const fs = require("fs");
const path = require("path");

// Read bronze (raw) data
const bronzePath = path.join(__dirname, "../data/bronze/countries.json");
const rawData = JSON.parse(fs.readFileSync(bronzePath, "utf-8"));

// Silver — clean and enrich the data
const silverData = rawData.map((country) => ({
  name: country.name,
  capital: country.capital,
  population: country.population.toLocaleString(),
  region: country.region,
  languages: country.languages.join(", "),
  facts: country.facts,
  summary: `${country.name} is located in ${country.region}. Its capital is ${country.capital} with a population of ${country.population.toLocaleString()}. Languages spoken: ${country.languages.join(", ")}.`,
}));

// Write silver data
const silverPath = path.join(__dirname, "../data/silver/countries.json");
fs.mkdirSync(path.dirname(silverPath), { recursive: true });
fs.writeFileSync(silverPath, JSON.stringify(silverData, null, 2));
console.log("✅ Silver data written");

// Gold — final format for the app
const goldData = silverData.map((country) => ({
  name: country.name,
  context: `${country.summary} ${country.facts}`,
}));

// Write gold data
const goldPath = path.join(__dirname, "../data/gold/countries.json");
fs.mkdirSync(path.dirname(goldPath), { recursive: true });
fs.writeFileSync(goldPath, JSON.stringify(goldData, null, 2));
console.log("✅ Gold data written");