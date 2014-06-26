
/*
Author : Jerry M.
Date : 25th June 2014
Description : logic to call the following url and get the data - 
    http://random.cruisemaniac.com/getnext/
*/

var comicUrl = "http://random.cruisemaniac.com/getnext/";
function loadComic() {
    'use strict';
    $.get(comicUrl, function (response) {
        $(".comicLoading").hide();
        showComic();
        console.log(response.imgurl);
        $("#comicImage").attr({
            src: response.imgurl,
            title: response.title,
            alt: "Geeks"
        });
        $("#comicSource").html(response.name);
        $("#comicTitle").html(response.title);
        $("#comicLink").attr({
            href: response.permalink
        });
    });
}

function hideComic(){
    $("#comicImage").hide();
    $("#comicSource").hide();
    $("#comicTitle").hide();
}

function showComic(){
    $("#comicImage").show();
    $("#comicSource").show();
    $("#comicTitle").show();
}

var initValue = 0;
function comicProgress(){
    initValue++;
    $("#comicLoader").html('<div class="progress-bar" role="progressbar" style="width: ' + initValue + '0%;">' + initValue + '/10</div>');
}

function comicProgressReset(){
    initValue = 0;
    $("#comicLoader").html('<div class="progress-bar" role="progressbar" style="width: 0%;">0/10</div>');
}