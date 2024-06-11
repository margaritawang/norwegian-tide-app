const textToJson = require("../utils/textToJson");
const root_url = "https://api.met.no/weatherapi/tidalwater/1.1/";

async function fetchApiData(harbor) {
  console.log("Request sent to the API");

  const headers = new Headers({
    "User-Agent": "tidal-app-project margaritaawang@gmail.com",
  });

  const externalResponse = await fetch(`${root_url}?harbor=${harbor}`, {
    method: "GET",
    headers,
  });

  const responseText = await externalResponse.text();

  const data = textToJson(responseText);
  return data;
}

const TidalwaterController = {
  getUser: async (req, res) => {
    console.log("fetching from users api");
    // simulate the time to retrieve the user list
    await new Promise((resolve) => setTimeout(resolve, 250));

    // the user list retrieved with a query or an API call
    let users = [
      { id: 1, email: "john.doe@example.com", name: "John Doe" },
      { id: 2, email: "jane.smith@example.com", name: "Jane Smith" },
      { id: 3, email: "alice.jones@example.com", name: "Alice Jones" },
      { id: 4, email: "bob.miller@example.com", name: "Bob Miller" },
      { id: 5, email: "sara.white@example.com", name: "Sara White" },
      { id: 6, email: "mike.jenkins@example.com", name: "Mike Jenkins" },
      { id: 7, email: "emily.clark@example.com", name: "Emily Clark" },
      { id: 8, email: "david.ross@example.com", name: "David Ross" },
      { id: 9, email: "lisa.hall@example.com", name: "Lisa Hall" },
      { id: 10, email: "alex.garcia@example.com", name: "Alex Garcia" },
    ];

    const user = users[req.params.harborName];

    res.json(user);
  },
  getTidalwaterData: async (req, res) => {
    const harbor = req.params.harborName;

    let results;

    try {
      results = await fetchApiData(harbor);
      res.json(results);
    } catch (e) {
      console.error(e);
      res.status(404).send("Data unavailable");
    }
  },
};

module.exports = { TidalwaterController };
