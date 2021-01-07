$(document).ready(function () {
    console.log(moment().format('L'));
    //put the data on the page
    var currentDate = (moment().format('L'));


    $("#search-button").on("click", function () {


        var searchValue = $("#search-value").val();
        console.log(searchValue);

        if (searchValue.length > 0) {


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
                    var KtoF = response.main.temp * 9 / 5 - 459.67;
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


        function uvIndex(lat, lon) {
            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            $.ajax({
                type: "GET",
                url: uvUrl,
                success: function (response) {
                    console.log(response);
                    $(".uvIndex").append("UV Index: " + response.value);


                }
            })
        }

        function foreCast(lat, lon) {
            var fURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + apiKey;

            $(".col-sm-2").html("");
            $(".forecast").html("");

            $.ajax({
                type: "GET",
                url: fURL,
                success: function (response) {
                    console.log(response, "forcast");
                    for (var i = 1; i < 6; i++) {
                        //block
                        var mDiv = $("<div>");
                        //time div inside block
                        var tDiv = $("<div>");
                        //temp div inside block
                        var temp = $("<div>");
                        //hUmidity div inside block
                        var humidity = $("<div>");
                        //icon div
                        var icon = $("<img>");

                        //forms date
                        var oneD = moment().add(i, 'days').format('MM/DD/YYYY');
                        console.log(oneD);

                        //kelvin to f converter
                        t = response.daily[i].temp.day;
                        var KtoF = t * 9 / 5 - 459.67;
                        var fKtoF = KtoF.toFixed(1);
                        console.log(fKtoF);

                        //humidity getter
                        var h = response.daily[i].humidity;

                        //icon accessor
                        var iconApi = response.daily[i].weather[0].icon;
                        var iconURL = "http://openweathermap.org/img/w/" + iconApi + ".png";
                        console.log(response.daily[i].weather[0].icon);

                        //styling and additions
                        mDiv.addClass("col-sm-2 card-body card");
                        mDiv.css("background-color", "#0099FF");

                        tDiv.css("font-weight", "900");
                        tDiv.css("color", "white");
                        tDiv.html(oneD);

                        temp.css("color", "white");
                        temp.html("Temp: " + fKtoF);

                        humidity.css("color", "white");
                        humidity.html("Humidity: " + h + "%");

                        icon.attr('src', iconURL);
                        
                        
                        //to the page
                        mDiv.append(tDiv);
                        mDiv.append(icon);
                        mDiv.append(temp);
                        mDiv.append(humidity);
                        $(".forecast").append(mDiv);

                    }

                }
            })
        }

    });


});