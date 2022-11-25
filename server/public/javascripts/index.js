var best_player = document.querySelector(".best_player");
var best_score = document.querySelector(".best_score");
var second_player = document.querySelector(".second_player");
var second_score = document.querySelector(".second_score");
var third_player = document.querySelector(".third_player");
var third_score = document.querySelector(".third_score");
var menu = document.querySelector(".menu");
var loader = document.querySelector(".loader");
var html = document.querySelector("html");
var table1 = document.querySelector(".score-table-1");
var table2 = document.querySelector(".score-table-2");
var table3 = document.querySelector(".score-table-3");
var menuItems = document.querySelectorAll(".menu_items");
var selecteSection = sectionidfromurl;
var sectionidfromurl = window.location.hash.substring(1);
showSection(sectionidfromurl);

//trigger menu items and get the section id from url
for (var i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", function (e) {
    //get id
    var id = e.target.id;
    showSection(id);
  });
}

function showSection(section) {
  let sec = document.querySelectorAll("section");
  for (var i = 0; i < sec.length; i++) {
    sec[i].style.display = "none";
  }
  try {
    loadTransition();
    document.querySelector("." + section).style.display = "block";
  } catch (e) {
    loadTransition();
    document.querySelector(".home").style.display = "block";
  }
}

refreshUsers = function () {
  fetch("/api/v1/scores/all")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data) return console.log("no data");
      var best_score_value = data[0].score;
      var best_player_value = data[0].user;
      best_player.innerHTML = "Player: " + best_player_value || "No player";
      best_score.innerHTML = "Score: " + best_score_value || "No score";
      second_player.innerHTML = "Player: " + data[1].user || "No player";
      second_score.innerHTML = "Score: " + data[1].score || "No score";
      third_player.innerHTML = "Player: " + data[2].user || "No player";
      third_score.innerHTML = "Score: " + data[2].score || "No score";
      var sttable = [];
      var sectable = [];
      var thridtable = [];
      data.splice(0, 3);

      for (var i = 0; i < data.length; i++) {
        if (data[i].map === 1) {
          sttable.push(data[i]);
        } else if (data[i].map === 2) {
          sectable.push(data[i]);
        } else {
          thridtable.push(data[i]);
        }
      }
      sttable.sort(function (a, b) {
        return b.score - a.score;
      });
      sectable.sort(function (a, b) {
        return b.score - a.score;
      });
      thridtable.sort(function (a, b) {
        return b.score - a.score;
      });

      console.log(sttable);
        console.log(sectable);
        console.log(thridtable);

      for (var i = 0; i < sttable.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        td1.innerHTML = i+1;
        td2.innerHTML = sttable[i].user;
        td3.innerHTML = sttable[i].score;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table1.appendChild(tr);
      }

      for (var i = 0; i < sectable.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        td1.innerHTML = i + 1;
        td2.innerHTML = sectable[i].user;
        td3.innerHTML = sectable[i].score;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table2.appendChild(tr);
      }

      for (var i = 0; i < thridtable.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        td1.innerHTML = i + 1;
        td2.innerHTML = thridtable[i].user;
        td3.innerHTML = thridtable[i].score;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table3.appendChild(tr);
      }


    });
};

function wait(time) {
  setTimeout(function () {}, time);
}

function toggleMenu() {
  let menuToggle = document.querySelector(".toggle");
  let menu = document.querySelector(".menu");
  menuToggle.classList.toggle("active");
  menu.classList.toggle("active");
}

function waitLoad() {
  setTimeout(function () {
    loader.style.display = "none";
    // wait(100)
    // html.style.overflow = "auto";
  }, 250);
}

function load() {
  loader.classList.add("fade-out");
  window.scrollTo(0,0); 
  waitLoad();
}


function loadTransition() {
  // html.style.overflow = "hidden";
  loader.classList.remove("fade-out");
  loader.style.display = "block";
  setTimeout(function () {
    load();
  }, 500);
}

window.onload = function () {
  refreshUsers();
  setTimeout(function () {
    load();
  }, 500);
};
