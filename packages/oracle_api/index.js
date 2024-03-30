const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const MATCH_DATA = require('./match_performance.json')
app.use(express.json());
app.use(cors());





app.get("/scores/:match_id/:players", (request, response) => {
    let scores = new Map();
    MATCH_DATA[parseInt(request.params.match_id) - 1]["batsmen"].forEach((player) => {
        var score = player["runs"] * 2 + player["4s"] * 4 + player["6s"] * 6 + ((player["out/not_out"] == "out") ? -1 : 1) * 15;
        scores.set(player["player_id"], score)
    })
    MATCH_DATA[parseInt(request.params.match_id) - 1]["bowlers"].forEach((player) => {

        var score = player["maiden"] * 8 + player["wickets"] * 6 + parseInt(player["economy"]) * (-2) + player["0s"] * 2 + player["4s"] * (-2) + player["6s"] * (-4) + player["wides"] * (-1) + player["noBalls"] * (-1);
        scores.set(player["player_id"], score)
    })
    let player_scores = [];
    let total_score = 0;
    var player_ids = request.params.players.split("P");
    // console.log(request.body.players)
    player_ids.forEach((player_id) => {
        total_score += scores.get(parseInt(player_id));
        player_scores.push(scores.get(parseInt(player_id)));
    })
    // console.log(player_scores);
    response.send({
        total_score: total_score,
        player_scores: player_scores
    });
});
// app.get("/total/:match_id/:players", (request, response) => {
//     let scores = new Map();
//     MATCH_DATA[parseInt(request.params.match_id) - 1]["batsmen"].forEach((player) => {
//         var score = player["runs"] * 2 + player["4s"] * 4 + player["6s"] * 6 + ((player["out/not_out"] == "out") ? -1 : 1) * 15;
//         scores.set(player["player_id"], score)
//     })
//     MATCH_DATA[parseInt(request.params.match_id) - 1]["bowlers"].forEach((player) => {

//         var score = player["maiden"] * 8 + player["wickets"] * 6 + parseInt(player["economy"]) * (-2) + player["0s"] * 2 + player["4s"] * (-2) + player["6s"] * (-4) + player["wides"] * (-1) + player["noBalls"] * (-1);
//         scores.set(player["player_id"], score)
//     })
//     let player_scores = [];
//     let total_score = 0;
//     var player_ids = request.params.players.split("P");
//     // console.log(request.body.players)
//     player_ids.forEach((player_id) => {
//         total_score += scores.get(parseInt(player_id));
//         player_scores.push(scores.get(parseInt(player_id)));
//     })
//     // console.log(player_scores);
//     response.send({
//         total_score: total_score,
//         player_scores: player_scores
//     });
// });

app.listen(PORT, () => {

    console.log("Oracle API Server Listening on PORT:", PORT);
});
