$(document).ready(function () {

  var giphy = {
    gifArray: ['The Simpsons', 'Family Guy', 'American Dad', 'Futurama', 'X-men', 'Archer', 'Dragon Ball', 'King of the hill', "Bob's Burguers", 'Mighty Mouse'],
    results: [],

    setStage: function () {
      // Generate all buttons in array
      for (var i = 0; i < this.gifArray.length; i++) {
        var a = $('<button>');
        a.addClass('gif btn btn-primary mr-1 mb-1');
        a.attr('data-name', this.gifArray[i]);
        a.text(this.gifArray[i]);
        $('#buttons').append(a);
      };

      // Calls Giphy API on click
      $('.gif').on('click', function (event) {
        giphy.callApi($(this).attr('data-name'));
      });

      // Add Button
      this.addButton();

      //Clear Results
      this.clearResults();
    },

    addButton: function () {
      $("#add-value").on('click', function (event) {
        event.preventDefault();

        if ($('#add-input').val().trim().length != 0) {
          giphy.gifArray.push($('#add-input').val().trim());
          $('#buttons').empty();
          $('#add-input').val('');
          $('#help-text').html('Enter the name of your own button.').toggleClass('text-muted text-danger');
          giphy.setStage();
        } else {
          $('#help-text').html('Please enter a valid name.').toggleClass('text-danger text-muted');
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
        let arr = giphy.results;
        giphy.results = arr.concat(response.data);
        console.log(response.data);
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
    },

    clearResults: function(){
      $('#clear-results').on('click', function(){
        $('#display-gifs').empty();
        giphy.results.length = 0;
      })
    }
  };

  giphy.setStage();
});