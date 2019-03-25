function myCallBack(myData){
    console.log(myData);
    //send out to page eventually!
}

function getQueryParameter(name) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == name){return pair[1];}
    }
    return false;
}

//release date, track time (m:ss), genre, explicit/notexplicit, link to the apple music page of the album
$(document).ready(function(){
    $.ajax({
        url: "http://itunes.apple.com/search?term=" + $("#artist").val() + "&limit=" + $("#numbSongs").val(),
        type: 'GET',
        cressDomain: true,
        dataType: "jsonp",
        success: function (result){
            //what does the next line even mean?
            console.log(result);
            displayResults(result);
        },
        error: function (){
            alert('Failed');
        }
    });
});

//release date, track time (m:ss), genre, explicit/notexplicit,
// link to the apple music page of the album
function displayResults(json){

    $("#songInfo").empty();
    var html = '<br><table class="table table-striped">';
    json.numbSongs = $("#numbSongs").val();
    for(var i = 0; i < json.numbSongs; i++){
        var x = (json.results[i].trackTimeMillis)/1000;
        var min = Math.floor(x/60);
        var sec = Math.floor(x)%60;

        html+= "<tr><td>";
        html += [i+1] ;
        html += "</td><td>";
        html += "<img src='" + json.results[i].artworkUrl100 + "'>";
        html += "</td><td>";
        html += json.results[i].artistName;
        html += "</td><td>";
        html += "<a href='" + json.results[i].collectionViewUrl + "'>";
        html += json.results[i].trackName;
        html += "<br></br>";
        html += json.results[i].collectionExplicitness;
        html += "</td><td>";
        html += json.results[i].primaryGenreName;
        html += json.results[i].releaseDate;
        html += min + ":" + sec;
        html += "</td><td>";
        html += json.results[i].collectionName;
        html += "</td><td>";
        html += "<audio controls='true' src='" + json.results[i].previewUrl + "' id='audio' type='audio/m4a'></audio>";
        html += "</td></tr>";
    }
    html += "</table>";
    console.log();
    $("#songInfo").append(html);
}
function getResults() {
    var chosenArtist = $("#artist").val();
    var limit = $("#numbSongs").val();
    console.log(chosenArtist);
}

