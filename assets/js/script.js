 $(document).ready(function() {

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
          const classesString = $(ui.draggable).attr('class');
          const idDragg = "#"+ $(ui.draggable).attr('id')  
          console.log($(idDragg))    
          $(idDragg).hide()       
  
          if (classesString.includes("draggable2")) {         
            const audio = new Audio('./audio/missed.wav');
            audio.play();                  
  
          } else {         
            const audio = new Audio('./audio/happy.mp4');
            audio.play();
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
});
  