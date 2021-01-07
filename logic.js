$(document).ready(function () {
    console.log(moment().format('L'));
    //put the data on the page
    var currentDate = (moment().format('L'));


    $("#search-button").on("click", function () {
       

        var searchValue = $("#search-value").val();
        console.log(searchValue);

        if(searchValue.length > 0){


            $(".cName").html("");
            $(".temp").html("");
            $(".humidity").html("");
            $(".wSpeed").html("");
            $(".uvIndex").html("");
            //generates history list 
            var newLi = $("<li>");
            newLi.addClass("list-group-item");
            $(".history").append(newLi.append(searchValue));
            $("#search-value").val("");

            var apiKey = "58ceaad44652a8be4772292ae8aa41bc";
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey;



            $.ajax({
                type: "GET",
                url: queryURL,
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    //access specific data from response
                    //builds today card
                    //retireves and converts temp data
                    var KtoF = response.main.temp * 9/5-459.67;
                    var fKtoF = KtoF.toFixed(1);
                    console.log(fKtoF);

                    //today card
                    $(".cName").append(response.name + " (" + currentDate + ")");
                    $(".temp").append("Temperature: " + fKtoF + " F");
                    $(".humidity").append("Humidity: " + response.main.humidity + " %");
                    $(".wSpeed").append("Wind Speed: " + response.wind.speed + " MPH");
                    uvIndex(response.coord.lat, response.coord.lon);
                    foreCast(response.coord.lat, response.coord.lon);
                }


            })
        }
         

        function uvIndex(lat, lon){
            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            $.ajax({
                type: "GET",
                url: uvUrl,
                success: function(response){
                    console.log(response);
                    $(".uvIndex").append("UV Index: " + response.value);


                }
            })
        }
        
        function foreCast(lat, lon){
            var fURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + apiKey;

            $(".col-sm-2").html("");

            $.ajax({
                type: "GET",
                url: fURL,
                success: function(response){
                    console.log(response , "forcast");
                    var mDiv = $("<div>");
                    var tDiv = $("<div>");
                    var wDiv = $("<div>");
                    var rDiv = $("<div>");
                    var fDiv = $("<div>");

                    mDiv.addClass("col-sm-2 card-body card");
                    tDiv.addClass("col-sm-2 card-body card");
                    wDiv.addClass("col-sm-2 card-body card");
                    rDiv.addClass("col-sm-2 card-body card");
                    fDiv.addClass("col-sm-2 card-body card");
                    mDiv.css("background-color", "#0099FF");
                    tDiv.css("background-color", "#0099FF");
                    wDiv.css("background-color", "#0099FF");
                    rDiv.css("background-color", "#0099FF");
                    fDiv.css("background-color", "#0099FF");
                    var oneD = moment().add(1, 'days');
                    console.log(oneD);
                    mDiv.html(oneD);

                    $(".forecast").append(mDiv);
                    $(".forecast").append(tDiv);
                    $(".forecast").append(wDiv);
                    $(".forecast").append(rDiv);
                    $(".forecast").append(fDiv);




                }
            })
        }

    });


});