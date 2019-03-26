$(document).ready(function(){
    var chosenArtist = $("#artist").val();
    console.log(chosenArtist);
    $.ajax({
        url: "http://itunes.apple.com/search?artist= " + $("#artist").val(),
        type: 'GET',
        cressDomain: true,
        dataType: "jsonp",
        success: function (song){
            console.log(song);
            displayResults(song);
        },
        error: function (){
            alert('Failed');
        }
    });
});

//release date, track time (m:ss), genre, explicit/notexplicit,
// link to the apple music page of the album
function displayResults(json){

    var song = getQueryParameter("song");

    var songObject = json.results[song];


    $("#songInfo").empty();

    var tbl = '<br><table class="table table-striped">';

    var x = (song.trackTimeMillis)/1000;
    var min = Math.floor(x/60);
    var sec = Math.floor(x)%60;

    tbl+= "<tr><td>";
    tbl += "<img src='" + song.artworkUrl100 + "'>";
    tbl += "</td><td>";
    tbl += song.artistName;
    tbl += "</td><td>";
    tbl += "<a href='" + song.collectionViewUrl + "'>";
    tbl += song.trackName;
    tbl += song.collectionExplicitness;
    tbl += "</td><td>";
    tbl += song.primaryGenreName;
    tbl += song.releaseDate;
    tbl += min + ":" + sec;
    tbl += "</td><td>";
    tbl += song.collectionName;
    tbl += "</td><td>";
    tbl += "<audio controls='true' src='" + song.previewUrl + "' id='audio' type='audio/m4a'></audio>";
    tbl += "</td></tr>";

    tbl += "</table>";
    console.log();
    $("#songInfo").append(tbl);
}


function getResults() {
    var chosenArtist = $("#artist").val();
    console.log(chosenArtist);
}
//copy me into your script to get a query parameter
function getQueryParameter(name)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == name){return pair[1];}
    }
    return false;
}


