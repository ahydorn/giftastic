$(document).ready(function() {
    var cars = ["Ferrari", "Lamborghini", "Lancer Evolution", "Supra", "BMW M4", "Subaru STI", "RWB Porsche", "Koenigsegg"];

    // Add buttons for original cars array
    function renderButtons() {
        $("#car-buttons").empty();
        for (i = 0; i < cars.length; i++) {
            $("#car-buttons").append("<button class='btn btn-primary' data-car='" + cars[i] + "'>" + cars[i] + "</button>");

        }
    }

    renderButtons();

    // Adding a button for car entered
    $("#add-car").on("click", function() {
        event.preventDefault();
        var car = $("#car-input").val().trim();
        cars.push(car);
        renderButtons();
        return;
    });


    // When clicked
    $("button").on("click", function() {
        var car = $(this).attr("data-car");
        // Use the following URL and API key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            car + "&api_key=bhKS8KshkB5D9srMj0OYkkE5nlWghA4L&limit=10"
            // To make an ajax request with the GET method
        $.ajax({
            url: queryURL,
            method: "GET"
                // Run a callback function
        }).done(function(response) {
            var results = response.data;
            $("#cars").empty();
            // Loop through results
            for (var i = 0; i < results.length; i++) {
                var carDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var carImg = $("<img>");
                // Give gifs the following attributes
                carImg.attr("src", results[i].images.original_still.url);
                carImg.attr("data-still", results[i].images.original_still.url);
                carImg.attr("data-animate", results[i].images.original.url);
                carImg.attr("data-state", "still");
                carImg.attr("class", "gif");
                carDiv.append(p);
                carDiv.append(carImg);
                $("#cars").append(carDiv);
            }
        });
    });

    // Animate/stop animate function
    function changeState() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
        // If still, animate. If animated, make still
        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }
    $(document).on("click", ".gif", changeState);

});