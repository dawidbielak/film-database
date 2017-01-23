var $Form = $('form'), $Container = $('#main');
$Container.hide();

var how;
var remainer;

// Draws stars
document.getElementById("button").addEventListener("click", function() {
    var stars = '';

    // Counts stars
    for (var i = 0; i < how; i++) {
        stars += '<img style="width: 20px; border: 0;" src="images/green-star.png">';
    }

    if (remainer >= 5)
        stars += '<img style="width: 20px; border: 0;" src="images/green-star-half.png">';

    document.getElementById("rated").innerHTML = stars;
});

$Form.on('submit', function(p_oEvent){
    var sUrl, sMovie, oData;
    p_oEvent.preventDefault();
    sMovie = $Form.find('input').val();
    sUrl = 'https://www.omdbapi.com/?t=' + sMovie + '&type=movie';
    $.ajax(sUrl, {
        complete: function(p_oXHR, p_sStatus){
            oData = $.parseJSON(p_oXHR.responseText);
            console.log(oData);

            $Container.find('.title').text(oData.Title);
            $Container.find('.year').text("(" + oData.Year + ")");
            $Container.find('.runtime').text(oData.Runtime);
            $Container.find('.rated').text(oData.imdbRating);
            $Container.find('.votes').text(oData.imdbVotes);
            $Container.find('.director').text(oData.Director);
            $Container.find('.genre').text(oData.Genre);
            $Container.find('.released').text(oData.Released);
            $Container.find('.poster').html('<img src="' + oData.Poster + '" class="img-responsive" alt="poster" />');
            
            $Container.find('.plot').text(oData.Plot);
            $Container.show();

            how = Math.floor(oData.imdbRating);
            remainer = (((oData.imdbRating % 1) * 100) / 10);
            remainer = remainer.toFixed(1);

        }
    });    
});