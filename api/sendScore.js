
import startPocketbase, { pocketbase } from "@/src/pages/api/pocketbase.js";

export default async function handler(req, res) {
	// CORS allow all to make this a public API
	res.setHeader("Access-Control-Allow-Origin", "*");

	// get score
	const score = req.body;

	// wake up pocketbase
	startPocketbase(null, null, false);

	try {
		// add score
		await pocketbase.collection("2048ButBetter").create(score);

		return res.status(200).send("Score added.");

	} catch {
		return res.status(500).send("Internal server error, leaderboard database is not working.");
	}
}