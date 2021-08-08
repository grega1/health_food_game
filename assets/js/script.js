//Imports
class Game {
  constructor(_name = 'Player1', _score = 0, _currentLevel = 1, _playMusic = true, _soundEffects = true,) {
      this.name = _name;
      this.score = _score;
      this.currentLevel = _currentLevel;
      this.playMusic = _playMusic;
      this.soundEffects = _soundEffects;
      
  }

  setName(_name) {
      this.name = _name;
  }

  getName() {
      return this.name;
  }

  setScore(_score = 0) {
      this.score = _score;
  }
  setCurrentLevel(_currentLevel = 1) {
      this.currentLevel = _currentLevel;
  }
  getCurrentLevel() {
      return this.currentLevel;
  }
  getScore() {
      return this.score;
  }
  getIntervalByLevel() {
    switch (this.currentLevel) {
      case 1:
          return 3000;
  }};
  getPointsByLevel() {
    switch (this.currentLevel) {
      case 1:
          return 10;
  };
}


  //actionPoint = Pontuação recebida por destruir o alvo
  increaseScore(_actionPoint = 10) {
      return this.score = this.score + parseInt(_actionPoint);
  }

  drawSlots(_firstSlot, _lastSlot) {
      return Math.round(Math.random() * (_lastSlot - _firstSlot)) + _firstSlot;

  }
  setPlayMusic(_playMusic) {
      this.playMusic = _playMusic;
  }
  setSoundEffects(_soundEffects) {
      this.soundEffects = _soundEffects;
  }
  getPlayMusic() {
      return this.playMusic;
  }
  getSoundEffects() {
          return this.soundEffects;
      }
      //criar função fora para mutar e executar
     

  rankingData() {

      return { name: this.name, score: this.score };

  }
};
// Instances
const newGame = new Game();

//Audios
/*const btnSelectSound = "../audio/btn-select.mp3";
const healthFoodSound = "../audio/mask-up.mp3";
const levelUpSound = "../audio/level-up.mp3";
const gameStartSound = "../audio/game-start.ogg";
const gameWinSound = "../audio/game-win.mp3";
const vaxxBreakingSound = "../audio/vaxx-breaking.mp3";
const backgroundSound = "../audio/background-sound.mp3";
const mainMusic = new Audio(backgroundSound);
mainMusic.volume = 0.1;
mainMusic.play();
mainMusic.loop = true;
*/
function playAudio(sound) {
    const audioToPlay = new Audio(sound);
    audioToPlay.volume = 0.1;
    audioToPlay.play();
}

function gameStart() {
  let userName = newGame.getName();
  newGame.setScore();
  //let modalInstructions = document.getElementById("modal-instructions");
  //modalInstructions.parentNode.removeChild(modalInstructions);
  //startLevel();
}

function finishLevel() {
}
function hitVirus(id, level = newGame.getCurrentLevel()) {
  newGame.getScore();
 
  

    setTimeout(() => {
      playAudio(increaseSound);
      captureScore.innerHTML = `Pontos: ${newGame.getScore()}`;
  }, 300);
}


$(document).ready(function() {
  gameStart();
  newGame.getScore();
    $( function() {
      $( ".column" ).sortable({
        connectWith: ".column",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all"
      });
   
      $( ".portlet" )
        .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
        .find( ".portlet-header" )
          .addClass( "ui-widget-header ui-corner-all" )
          .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
   
      $( ".portlet-toggle" ).on( "click", function() {
        var icon = $( this );
        icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
        icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
      });
    });
  
    $( function() {
      $( ".draggable2" ).draggable({ revert: "valid" });    
      $( ".draggable" ).draggable({ revert: "invalid" });
     
      $( "#droppable" ).droppable({
        classes: {
          "ui-droppable-active": "ui-state-active",
          "ui-droppable-hover": "ui-state-hover"        
        },
        drop: function( event, ui ) {
          let dropValue = newGame.getPointsByLevel(newGame.getCurrentLevel());
          const classesString = $(ui.draggable).attr('class');
          const idDragg = "#"+ $(ui.draggable).attr('id')  
          console.log($(idDragg))    
          $(idDragg).hide()       
          

          
          if (classesString.includes("draggable2")) {         
            const audio = new Audio('./audio/missed.mp4');
            audio.play(); 
            $('#img-child').css('display', 'none');
            $('#img-sad-child').css('display', 'flex');    
            $('#img-happy-child').css('display', 'none');             
              setTimeout(() => {
                $('#img-child').css('display', 'flex');
                $('#img-sad-child').css('display', 'none'); 
              },3000)
          } else {         
            const audio = new Audio('./audio/happy.mp4');
            audio.play();
            $("#img-child").css('display', 'none');
            $('#img-happy-child').css('display', 'flex');
            $('#img-sad-child').css('display', 'none'); 
            newGame.increaseScore(dropValue);
            console.log(dropValue)
            $("#show-score").text(`${newGame.getScore()}`);
            console.log(newGame.getScore());
            let userScore = newGame.getScore();
            let userName = newGame.getName();
            const userRankData = {
              name:userName,
              score:userScore,
            }
            $.ajax({
              url : "http://localhost:3005/ranking",
              type : 'POST',
              dataType : 'json',
              contentType : "application/json",
              data: JSON.stringify(userRankData), 
              //crossDomain: true,
              //xhrFields: {
               // withCredentials: true
           // },               
              }).done(() => {
           $("#show-score").text(`enviado`);
         })
            setTimeout(() => {
              $('#img-child').css('display', 'flex');
              $('#img-happy-child').css('display', 'none'); 
            },3000)  
          }
          
          $( this )       
            /*.addClass( "ui-state-highlight" )*/
            .find( "p" )
              .html( "Dropped!" );
        }      
      });
    });
    
  
    $('#start-game').on('click', function() {
        console.log('entrei aqui')
        const audio = new Audio('./audio/game-start.mp4');
        audio.play(); 
    });  
    $
});
  