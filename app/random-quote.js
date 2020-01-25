var unirest = require("unirest");

async function generateRandomQuote () {
	var req = unirest("GET", "https://andruxnet-random-famous-quotes.p.rapidapi.com/");

	req.query({
		"cat": "famous",
		"count": "1"
	});

	req.headers({
		"x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com",
		"x-rapidapi-key": "48fe4c5e1dmsh150ce35fbaf3d0bp181ea5jsnee5898cccf56"
	});


	req.end(function (res) {
		//if (res.error) throw new Error(res.error);

		//console.log(res.body);
		return res.body.data[0].quote;
	});
}

async function generateRandomQuoteAlt () {
	var req = unirest("GET", "api.myjson.com//bins/1gymjm");
	req.end(function (res) {
		if (res.error) throw new Error(res.error);
		return res.body.items[0].link;
	})
}

async function generateImageFromQuote (quote) {
	var req = unirest("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyA84hULMat0t3w4UWaFxEcRI35QesNh9bg&cx=009639176708901267757:zhnzc2bguan&q=" + quote + "&searchType=image");
	req.end(function (res) {
		if (res.error) throw new Error(res.error);
		return res.body.items[0].link;
	})
}

async function generateQuoteImage () {
	let quote = await generateRandomQuoteAlt();
	let image = await generateImageFromQuote(quote);
	let quoteImage = {
		quote,
		image
	}
	//Stored on DB
	let quoteDB = new quoteModel(quoteImage).save();
	return quoteDB;
}

module.exports = { generateQuoteImage }