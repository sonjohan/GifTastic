$(document).ready(function () {

    var giphy = {
        animals: ["dog", "cat", "lizard", "elephant"],

        runGifs: function () {
            // Generate all buttons in array
            for (var i = 0; i < this.animals.length; i++) {
                var a = $("<button>");
                a.addClass("animal");
                a.attr("data-name", this.animals[i]);
                a.text(this.animals[i]);
                $("#buttons").append(a);
            };

            // Calls Giphy API on click
            $(".animal").on("click", function (event) {
                giphy.callApi($(this).attr("data-name"));
            });

            $('#add-input').on('click', function () { $("#add-input").val(''); });
            this.addButton();
        },

        addButton: function () {

            $("#add-value").on("click", function (event) {
                event.preventDefault();
                if ($("#add-input").val().trim() === '') {
                    $("#add-input").val('Please enter a name');
                } else {
                    var animalAdded = $("#add-input").val().trim();
                    giphy.animals.push(animalAdded);
                    $("#buttons").empty();
                    giphy.runGifs();
                };
                $("#add-input").val('');
            });
        },

        callApi: function (val) {
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                val + "&api_key=dc6zaTOxFJmzC&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data;
                for (var i = 0; i < 10; i++) {
                    var animalDisplay = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var animalImage = $("<img>");
                    animalImage.attr('data-state', 'still');
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)
                    animalImage.attr("src", results[i].images.fixed_height_still.url);

                    animalDisplay.prepend(p);
                    animalDisplay.prepend(animalImage);
                    $("#display-gifs").prepend(animalDisplay);
                };

                giphy.changeState();
            });
        },

        changeState: function () {
            $("img").on("click", function () {
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

    giphy.runGifs();
});