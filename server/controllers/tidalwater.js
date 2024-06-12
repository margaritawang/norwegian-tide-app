const parseTextResults = require("../utils/parseTextResults");
const root_url = "https://api.met.no/weatherapi/tidalwater/1.1/";

async function fetchApiData(harbor) {
  console.log("Request sent to the API");

  const headers = new Headers({
    "User-Agent":
      "github.com/margaritawang/norwegian-tide-app margaritaawang@gmail.com",
  });

  try {
    const externalResponse = await fetch(`${root_url}?harbor=${harbor}`, {
      method: "GET",
      headers,
    });

    const responseText = await externalResponse.text();

    const data = parseTextResults(responseText);

    if (data) return data;
    else {
      throw "Unable to parse api response";
    }
  } catch (e) {
    throw e;
  }
}

const TidalwaterController = {
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
