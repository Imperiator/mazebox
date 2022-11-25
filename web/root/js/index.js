var best_player = document.querySelector(".best_player");
var best_score = document.querySelector(".best_score");

fetch("http://mazebox.tk/api/v1/scores").then(function(res){
    return res.json();
}).then(function(data){
    console.log(data);
    var best_score_value = data[0].score;
    var best_player_value = data[0].user;
    best_player.innerHTML = "Player: " +best_player_value;
    best_score.innerHTML = "Score: " + best_score_value;
});