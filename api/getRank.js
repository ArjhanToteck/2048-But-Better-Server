
import startPocketbase, { pocketbase } from "@/src/pages/api/pocketbase.js";

export default async function handler(req, res) {
	// wake up pocketbase
	startPocketbase(null, null, false);

	try {
		// get score
		let score = req.body.score;

		// get scores
		let scores = await pocketbase.collection("2048ButBetter").getList(1, 50, {
			sort: "-score",
		});
		scores = scores.items;

		// check if last score is less than current score
		if (scores[scores.length - 1].score > score) {
			// score not added to leaderboard
			return res.status(200).send(-1);
		}

		// if we're here, it means we're on the leaderboard

		// calculate rank
		let min = 0;
		let max = scores.length;

		while (min < max) {
			const mid = Math.floor((min + max) / 2);

			if (scores[mid].score > score) {
				min = mid + 1;
			} else {
				max = mid;
			}
		}

		// add one since rank is'nt 0-based
		const rank = min + 1;

		// send rank
		return res.status(200).send(rank);

	} catch {
		return res.status(500).send("Internal server error, leaderboard database is not working.");
	}
}