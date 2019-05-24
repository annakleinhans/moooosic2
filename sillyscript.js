$(document).ready(function(){
    var chosenArtist = getQueryParameter("artist");
    console.log(chosenArtist);
    $.ajax({
        url: "https://itunes.apple.com/search?term= " + chosenArtist,
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
    song = parseInt(song);
    var songObject = json.results[song];


    $("#songInfo").empty();

    var x = (songObject.trackTimeMillis)/1000;
    var min = Math.floor(x/60);
    var sec = Math.floor(x)%60;

    var tbl = '<br><table id="tbl" class="table table-striped">';

        tbl+= "<tr><td>"; /*this is the beginning of a cell and row */
        tbl += "<img id='art' src='" + songObject.artworkUrl100 + "'>";
        tbl += "</td><tr/><tr><td>";  /*this is the beginning of a cell and row */
        tbl += songObject.artistName;
        tbl += "</td></tr><tr><td>"; /*this is the beginning of a cell and row */
        tbl += "<a href='" + songObject.collectionViewUrl + " ' target='_blank' >";
        tbl += songObject.trackName;
        tbl += "</td></tr><tr><td>";
        tbl += songObject.collectionExplicitness;
        tbl += "</td></tr><tr><td>";
        tbl += songObject.primaryGenreName;
        tbl += "</td></tr><tr><td>";
        tbl += songObject.releaseDate;
        tbl += "</td></tr><tr><td>";
        tbl += min + ":" + sec;
        tbl += "</td></tr><tr<td>";
        tbl += songObject.collectionName;
        tbl += "</td></tr><tr><td>";
        tbl += "<audio controls='true' src='" + songObject.previewUrl + "' id='audio' type='audio/m4a'></audio>";
        tbl += "</td></tr>";

    tbl += "</table>";

    console.log(songObject);
    $("#songInfo").append(tbl);
}


//copy me into your script to get a query parameter
function getQueryParameter(name)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == name){
            return pair[1];}
    }
    return false;
}


