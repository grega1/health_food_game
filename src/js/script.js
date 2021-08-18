//Imports
import Game from "../js/game"
import $ from "jquery"
import "../../assets/styles/style.css";
require('webpack-jquery-ui');



// Instances
const newGame = new Game();

function gameStart() {
  newGame.getName();
  newGame.setScore();
  $.ajax({
    url: "http://localhost:3005/ranking",
    type: 'GET',
  }).done((data) => {
    const dataRanking = JSON.stringify(data);
    const usersRanking = JSON.parse(dataRanking)
    usersRanking.forEach((user) => {
      $("#ranking").text(`${user.name} ${user.score}`)
    })
  });
}

$(document).ready(function () {
  const audio = new Audio('./audio/game-start.mp4');
  audio.play();
  audio.volume = 0.2;
  audio.loop = true;
  $("#cta-button").click(() => {
    $("#home-game").hide();
    $(".game-painel").show();

  })
  $("#help-icon").click(() => {
    $("#container-instructions").show().addClass('absolute-with-z-index');
    $(".game-painel").addClass('relative-with-blur');
  })
  $("#back-to-game").click(() => {
    $("#container-instructions").hide().removeClass('absolute-with-z-index');
    $(".game-painel").show().removeClass('relative-with-blur');
  })
  gameStart();

  $(() => {
    $(".draggable2").draggable({ revert: "valid" });
    $(".draggable").draggable({ revert: "invalid" });

    $("#droppable").droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function (event, ui) {
        let dropValue = newGame.getPointsByLevel(newGame.getCurrentLevel());
        const classesString = $(ui.draggable).attr('class');
        const idDragg = "#" + $(ui.draggable).attr('id')
        $(idDragg).removeClass("draggable").hide();
        //draggable = healthy_food
        //draggable2 = bad_food
        if ($("#container-foods > div").hasClass("draggable")) {
          if (classesString.includes("draggable2")) {
            const audio = new Audio('./audio/missed.mp4');
            audio.play();
            audio.volume = 1;
            $('#img-hungerChild').css('display', 'none');
            $('#img-sad-child').css('display', 'flex');
            $('#img-happy-child').css('display', 'none');
            setTimeout(() => {
              $('#img-hungerChild').css('display', 'flex');
              $('#img-sad-child').css('display', 'none');
              $('#img-happy-child').css('display', 'none');
            }, 2000)
          } else {
            const audio = new Audio('./audio/happy1.mp4');
            audio.play();
            $("#img-hungerChild").css('display', 'none');
            $('#img-happy-child').css('display', 'flex');
            $('#img-sad-child').css('display', 'none');
            newGame.increaseScore(dropValue);
            $(".show-score").text(`${newGame.getScore()}`);
            setTimeout(() => {
              $('#img-hungerChild').css('display', 'flex');
              $('#img-happy-child').css('display', 'none');
              $('#img-sad-child').css('display', 'none');
            }, 2000)
          }
        } else {
          setTimeout(() => {
            $('#img-hungerChild').css('display', 'none');
            $('#img-happy-child').css('display', 'flex');
          }, 3000)
          $("#game-win").show().addClass('absolute-with-z-index');
          $(".game-painel").addClass('relative-with-blur');



        }
      }
    });
  });
  //back to home//
  $("#back-to-home").click(() => {
    let userScore = newGame.getScore();
    let userName = newGame.getName();
    const userRankData = newGame.rankingData();
    
    $.ajax({
      url: "http://localhost:3005/ranking",
      type: 'POST',
      dataType: 'json',
      contentType: "application/json",
      data: JSON.stringify(userRankData),

    }).done(() => {
      $("#show-score").text(`enviado`);
    })
    window.location.reload()
  });
});
