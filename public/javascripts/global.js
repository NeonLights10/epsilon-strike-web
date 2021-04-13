// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/strikes/strikelist', function( data ) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      if (this.server_id === 432379300684103700) {
        tableContent += '<tr>';
        d = new Date(this.time);
        tableContent += '<td>' + d.toUTCString() + '</td>';
        tableContent += '<td>' + this.server_id + '</td>';
        tableContent += '<td>' + this.user_name + '</td>';
        tableContent += '<td>' + this.user_id + '</td>';
        tableContent += '<td><a href="' + this.message_link + '"">Go to Message</a></td>';
        tableContent += '<td>' + this.reason + '</td>';
        tableContent += '<td><a href="#" class="linkdeletestrike" rel="' + this._id + '">delete</a></td>';
        tableContent += '</tr>';
      };
    });

    // Inject the whole content string into our existing HTML table
    $('#strikeList table tbody').html(tableContent);
  });
};

// Delete User link click
$('#strikeList table tbody').on('click', 'td a.linkdeletestrike', deleteStrike);

// Delete User
function deleteStrike(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this strike?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/strikes/deletestrike/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

};