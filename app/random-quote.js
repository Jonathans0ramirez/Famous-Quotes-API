var unirest = require("unirest");

let quoteModel = require('./quoteModel');

function generateRandomQuote () {
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

function generateRandomQuoteAlt () {
	return new Promise((resolve) => { 
		unirest.get('https://api.myjson.com/bins/1gymjm')
		.end(function (res) {
			if (res.error) throw new Error(res.error);
			console.log(res.body[0].quote)
			resolve(res.body[Math.floor(Math.random() * (9 - 0) + 0)].quote);
		});
	})
	.catch((err) => {
		console.error(err);
	});
}

function generateImageFromQuote (quote) {
	return new Promise((resolve) => { 
		unirest.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyA84hULMat0t3w4UWaFxEcRI35QesNh9bg&cx=009639176708901267757:zhnzc2bguan&q=' + quote + '&searchType=image')
		.end(function (res) {
			if (res.error) throw new Error(res.error);
			console.log("--------"+res.body.items[0].link)
			resolve(res.body.items[0].link);
		});
	})
	.catch((err) => {
		console.error(err);
	});
}

async function generateQuoteImage () {
	try {
		let quote = await generateRandomQuoteAlt();
		let image = await generateImageFromQuote(quote);
		let quoteImage = {
			quote,
			image
		}

		quoteModel.findOne({quote: quoteImage.quote}, function (err, quote) {
			if (err) {
				console.log(err);
			}
			if (quote) {
				console.log("Quote has already been saved: "+ quote);
				return quote;
			}
			else {
				//Stored on DB
				var quoteDB = new quoteModel(quoteImage).save();
				return quoteDB;
			}
		})
	}
	catch (e) {
		console.error(e);
	}
}

module.exports = { generateQuoteImage }