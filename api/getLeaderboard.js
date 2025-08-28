
import startPocketbase, { pocketbase } from "@/src/pages/api/pocketbase.js";

export default async function handler(req, res) {
	// CORS allow all to make this a public API
	res.setHeader("Access-Control-Allow-Origin", "*");

	// wake up pocketbase
	startPocketbase(null, null, false);

	try {
		// get scores
		const scores = await pocketbase.collection("2048ButBetter").getList(1, 50, {
			sort: "-score",
		});

		return res.status(200).json(scores);
	} catch {
		return res.status(500).send("Internal server error, leaderboard database is not working.");
	}
}