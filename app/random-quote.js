var unirest = require("unirest");

let quoteModel = require('./quoteModel');

function generateRandomQuote () {
	return new Promise((resolve) => { 
		unirest.get('https://type.fit/api/quotes')
		.end(function (res) {
			if (res.error) throw new Error(res.error);
			let pos = Math.floor(Math.random() * (1642 - 0) + 0);
			let bodyJSON = JSON.parse(res.body);
			resolve(bodyJSON[pos].text);
		});
	})
	.catch((err) => {
		console.error(err);
	});
}

function generateImageFromQuote (quote) {
	return new Promise((resolve) => { 
		unirest.get('https://www.googleapis.com/customsearch/v1')
		.query({
			"key": "AIzaSyA84hULMat0t3w4UWaFxEcRI35QesNh9bg",
			"cx": "009639176708901267757:zhnzc2bguan",
			"q": quote,
			"searchType": "image"
		})
		.end(function (res) {
			if (res.error) throw new Error(res.error);
			resolve(res.body.items[0].link);
		});
	})
	.catch((err) => {
		console.error(err);
	});
}

async function generateQuoteImage () {
	try {
		let quote = await generateRandomQuote();
		let image = await generateImageFromQuote(quote);
		let quoteImage = {
			quote,
			image
		}
		var quoteReturn;

		let quoteDup = quoteExists(quoteImage);

		if (quoteDup) {
			quoteReturn = quoteDup;
		}
		else {
			//Stored on DB
			var quoteDB = new quoteModel(quoteImage).save();
			quoteReturn = quoteDB;
		}
		return quoteReturn;
	}
	catch (e) {
		console.error(e);
	}
}

function quoteExists (quoteImage) {
	quoteModel.findOne({quote: quoteImage.quote}, function (err, quote) {
		if (err) {
			console.log(err);
		}
		else {
			return quote;
		}
	});
}

module.exports = { generateQuoteImage }