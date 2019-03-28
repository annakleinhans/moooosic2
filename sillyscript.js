$(document).ready(function(){
    var chosenArtist = getQueryParameter("artist");
    console.log(chosenArtist);
    $.ajax({
        url: "http://itunes.apple.com/search?artist= " + chosenArtist,
        type: 'GET',
        cressDomain: true,
        dataType: "jsonp",
        success: displayResults,
    });
});

//release date, track time (m:ss), genre, explicit/notexplicit,
// link to the apple music page of the album
function displayResults(json){

    var song = getQueryParameter("song");

    var songObject = json[song];


    $("#songInfo").empty();

    var x = (song.trackTimeMillis)/1000;
    var min = Math.floor(x/60);
    var sec = Math.floor(x)%60;

    var tbl = '<br><table class="table table-striped">';

        tbl+= "<tr><td>"; /*this is the beginning of a cell and row */
        tbl += "<img src='" + songObject.artworkUrl100 + "'>";
        tbl += "</td><tr/><tr><td>";  /*this is the beginning of a cell and row */
        tbl += song.artistName;
        tbl += "</td></tr><tr><td>"; /*this is the beginning of a cell and row */
        tbl += "<a href='" + song.collectionViewUrl + "'>";
        tbl += song.trackName;
        tbl += song.collectionExplicitness;
        tbl += "</td></tr><tr>,td>";
        tbl += song.primaryGenreName;
        tbl += song.releaseDate;
        tbl += min + ":" + sec;
        tbl += "</td></tr><tr<td>";
        tbl += song.collectionName;
        tbl += "</td></tr><tr><td>";
        tbl += "<audio controls='true' src='" + song.previewUrl + "' id='audio' type='audio/m4a'></audio>";
        tbl += "</td></tr>";

    tbl += "</table>";

    console.log();
    $("#songInfo").append(tbl);
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


