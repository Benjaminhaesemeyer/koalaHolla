console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var Newkoala = {}
      koala.name = $('#nameIn').val();
      koala.age = $('#ageIn').val();
      koala.gender = $('#genderIn').val();
      koala.ready_to_transfer = $('#readyForTransferIn').val();
      koala.notes = $('#notesIn').val();
    // call saveKoala with the new obejct
    saveKoala( Newkoala );
  });
   //end addButton on click
   $('#viewKoalas').on('click', '.deleteBtn', function(){
   // We attached the bookid as data on our button
   var koalaid = $(this).data('koalaid');
   console.log($(this));
   console.log('Delete koala with id of', koalaid);
   deleteKoala(koalaid);
 });
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( response ){
      console.log( 'got some koalas: ', response );
      appendToDom(response.koala);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas
function refreshKoalas() {
  $.ajax({
    type: 'GET',
    url: '/koalas',
    success: function(response) {
      console.log(response);
      appendToDom(response.koala);
    }
  });

}
function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      refreshKoalas();
    } // end success
  }); //end ajax
}


// Append array of koalas to the DOM
function appendToDom(koalas) {
  console.log('Koala Append Working');
  // Remove koalas that currently exist in the table
  $('#viewKoalas').empty();
  for(var i = 0; i < koalas.length; i += 1) {
    var koala = koalas[i];
    // For each book, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('koala', koala);
    $tr.append('<td>' + koala.name + '</td>');
    $tr.append('<td>' + koala.gender + '</td>');
    $tr.append('<td>' + koala.age + '</td>');
    $tr.append('<td>' + koala.ready_to_transfer + '</td>');
    $tr.append('<td>' + koala.notes + '</td>');

    $tr.append('<td><button class="deleteBtn" data-koalaid="' + koala.id + '">Delete</button></td>');
    $('#viewKoalas').append($tr);
  }
}
function deleteKoala(koalaid) {
  console.log(koalaid);
  // When using URL params, your url would be...
  // '/books/' + bookId

  // YOUR AJAX CODE HERE
  $.ajax({
    type: 'DELETE',
    url: '/koalas/' + koalaid,
    success: function(response) {
      console.log(response);
      console.log('I deleted the koala?!?');
      refreshKoalas();
      
    }
  });
}
