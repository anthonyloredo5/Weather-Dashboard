$(document).ready(function () {
    console.log(moment().format('L'));
    //put the data on the page
    var currentDate = (moment().format('L'));


    $("#search-button").on("click", function () {
        var searchValue = $("#search-value").val();
        console.log(searchValue);

        //generates history list 
        var newLi = $("<li>");
        newLi.addClass("list-group-item");
        $(".history").append(newLi.append(searchValue));
        $("#search-value").val("");

        var apiKey = "58ceaad44652a8be4772292ae8aa41bc";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey;

        var cName = $("<div>");

        cName = searchValue;

        $("#today").prepend(" " + cName + " " + currentDate);


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
                $(".temp").append(fKtoF + " F");

                //retireves and converts humidity data
                $(".humidity").append(response.main.humidity + " %");
                $(".wSpeed").append(response.wind.speed + " MPH");
                //$(".uvIndex").append();

            }

        })

    });


});