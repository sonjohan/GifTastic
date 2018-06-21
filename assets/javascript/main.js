$(document).ready(function () {

  var giphy = {
    gifArray: ['The Simpsons', 'Family Guy', 'American Dad', 'Futurama', 'X-men', 'Archer', 'Dragon Ball', 'King of the hill', "Bob's Burguers", 'Mighty Mouse'],
    results: [],

    setStage: function () {
      // Generate all buttons in array
      for (var i = 0; i < this.gifArray.length; i++) {
        var a = $('<button>');
        a.addClass('gif btn-danger mr-1 mb-1');
        a.attr('data-name', this.gifArray[i]);
        a.text(this.gifArray[i]);
        $('#buttons').append(a);
      };

      // Calls Giphy API on click
      $('.gif').on('click', function (event) {
        giphy.callApi($(this).attr('data-name'));
      });
    },

    addButton: function () {
      $('#add-input').on('click', function () { $('#add-input').val(''); });
      $("#add-value").on('click', function (event) {
        event.preventDefault();
        if ($('#add-input').val().trim() === '' || $('#add-input').val().trim() === 'Please enter a name') {
          $('#add-input').val('Please enter a name');
        } else {
          giphy.gifArray.push($('#add-input').val().trim());
          $('#buttons').empty();
          giphy.setStage();
          $('#add-input').val('');
        };
      });
    },

    callApi: function (val) {
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
        val + '&api_key=H6pbp8WxbwLK6k47dKko1gccLYPJsNJV&limit=10';
      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function (response) {
        var arr = giphy.results;
        giphy.results = arr.concat(response.data);
        console.log(giphy.results);
        for (var i = 0; i < giphy.results.length; i++) {
          var a = $('<div class="card item float-left mr-2 mb-3">');
          var rating = giphy.results[i].rating;
          var b = $('<p>').text('Rating: ' + rating);

          var c = $('<img>');
          c.attr('data-state', 'still');
          c.attr('data-animate', giphy.results[i].images.fixed_height.url);
          c.attr('data-still', giphy.results[i].images.fixed_height_still.url)
          c.attr('src', giphy.results[i].images.fixed_height_still.url);

          a.prepend(b);
          a.prepend(c);
          $('#display-gifs').prepend(a);
        };

        giphy.addButton();
        giphy.changeState();
      });
    },

    changeState: function () {
      $('img').on('click', function () {
        var state = $(this).attr('data-state');
        if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animated');
        } else {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
        };
      });
    }
  };

  giphy.setStage();
});