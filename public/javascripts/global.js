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
  var pageParam = 1;

  if(window.location.search.length > 0) {
    const urlParams = new URLSearchParams(window.location.search);
    pageParam = urlParams.get('page');
  }
  else {
    window.history.pushState(null, "Strike Database", "/strikes?page=1");
  }

  // jQuery AJAX call for JSON
  $.getJSON( ('/strikes/strikelist?page='+pageParam), function( data ) {
    results = data.docs
    $.each(results, function(){
      d = new Date(this.time);
      this.time = d;
    });
    // try sorting
    const sorteddata = results.sort((a, b) => b.time - a.time)
    // For each item in our JSON, add a table row and cells to the content string
    $.each(sorteddata, function(){
      if (this.server_id === 432379300684103700) {
        console.log('adding entry')
        tableContent += '<div class="relative py-3 sm_mx-auto"><div class="relative px-4 py-3 bg-white shadow-lg sm_rounded-3xl sm_px-10"><div class="max-w-8xl mx-auto"><div class="divide-y divide-gray-200"><div class="py-5 text-base leading-6 space-y-4 text-gray-700 sm_text-lg sm_leading-7"><div class="p-3 bg-gradient-to-r from-red-400 to-pink-400">';
        d = new Date(this.time);
        tableContent += '<h2 class="text-xs">Server ID: ' + this.server_id + '</h2>';
        tableContent += '<h3 class="font-semibold">Time: ' + d.toUTCString() + '</h3>';
        tableContent += '</div></div><div class="py-3"><ul class="list-disc space-y-2"><li class="flex items-start flex-wrap">'
        tableContent += '<p class="font-bold text-lg ml-5 w-8out12">' + this.user_name + '</p>';
        tableContent += '<p class="text-base w-3out12">Moderator: ' + this.moderator + '</p>';
        tableContent += '<p class="text-xs ml-5 w-full">User ID: ' + this.user_id.toString() + '</p></li><li class="flex items-start flex-wrap">';
        tableContent += '<h4 class="ml-5 font-semibold w-full">Reason</h4><p class="ml-5 mr-10 text-base text-justify w-full">' + this.reason + '</p></li></ul></div><div><div class="flex-auto flex space-x-3 p-5">';
        tableContent += '<a class="py-3 w-1/2 flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold py-2" href="' + this.message_link + '">Go To Message</button></form>';
        tableContent += '<a id="deletebutton" class="w-1/2 flex items-center justify-center rounded-md bg-gradient-to-tr from-red-400 to-red-500 font-semibold py-2" href="#" rel="' + this._id + '">Delete</a>';
        tableContent += '</div></div></div></div></div></div>';
      };
    // Inject the whole content string into our existing HTML table
    $('#strikecontent').append(tableContent);
    tableContent = '';

    var n = 1;
    $('.pagination').html('<p>Total Pages: ' + data.totalPages.toString() + '</p>');
    while(n < data.totalPages+1) {
      content = '<a class="text-center justify-center p-3 w-10 h-10 bg-gradient-to-tr from-red-400 to-pink-400 rounded-md" href="/strikes?page='+n.toString()+'"><p class="-mt-2">'+n.toString()+'</p></a>'
      $('.pagination').append(content);
      n++;
    };

    });
  });
};

// Delete User link click
$('#strikecontent').on('click', '#deletebutton', deleteStrike);

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
