// Create an array of topics similar to the MovieButtonLayout
	var topics = ['Beer', 'Sports', 'Music', 'Cars'];
	// ========================================================
//
	// Generic function for displaying the giphys for the topics this was demod in the WorkingMovieApp file
	function renderButtons() { 

		// Deletes the topics prior to adding topics (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++){
//            console.log(renderButtons);
			// Then dynamicaly generates buttons for each topic in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('movie'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

//topics buttons do not exist when page is loaded. this creates button for topics when lets explore button is clicked.

    $('#buttonsView').on('click', '.movie', function() {
    var title = $(this).attr('data-name');


    //The queryURL and ajax to get the data from giphy. 
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + title + "&limit=10&api_key=dc6zaTOxFJmzC";

    $.ajax({ url: queryURL, method: "GET" })
        .done(function(response) {
   
            var movieDiv = $("<div>");
//            console.log("this is array length: " + response.data.length);

            //For loop to get 10 gif's from the giphy website
            for (i = 0; i < response.data.length; i++) {
     
                var giphyImage = $("<img>");
                giphyImage.addClass("movinggiphyImage");
                giphyImage.attr({
                    "src": response.data[i].images.fixed_height_small_still.url,
                    "data-still": response.data[i].images.fixed_height_small_still.url,
                    "data-animate": response.data[i].images.fixed_height_small.url,
                    "data-state": "still",
                    "class": "gif",
                });

                movieDiv.append("<p>Rating " + response.data[i].rating + "<p>");
                movieDiv.append(giphyImage[0]);
                $('body').append(movieDiv);

                
            }
                //This section contains the code for still and animate images
                $(".gif").on("click", function() {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        // If the clicked image's state is still, update it's src attribute to what it's data-animate value is.
                        // Then set the image's data-state to animate
                        $(this).attr("src", $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });

        });



// ========================================================

// This function handles events where one button is clicked.  We are adding buttons
$('#addMovie').on('click', function() {

    // This line of code will grab the input from the textbox
    var movie = $('#movie-input').val().trim();

    // The topics from the textbox is then added to our array
    topics.push(movie);

    // Our array then runs which handles the processing of our topics array
    renderButtons();

    // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
    return false;
});

// ========================================================
//
//    // Generic function for displaying the movieInfo
//	$(document).on('click', 'truths', displayMovieInfo);
//
//
//	// ========================================================



// This calls the renderButtons() function
renderButtons();
//
//
////HERE WE CREATE THE HTML THAT WILL BE INJECTED INTO OUR DIV AND DISPLAYED ON THE PAGE.
var html = "";