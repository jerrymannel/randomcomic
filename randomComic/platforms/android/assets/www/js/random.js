
/*
Author : Jerry M.
Date : 25th June 2014
Description : logic to call the following url and get the data - 
    http://random.cruisemaniac.com/getnext/
*/

var comicUrl = "http://random.cruisemaniac.com/getnext/";
var counter = 0;

function hideComic() {
    $("#comicHeading").hide();
    $("#comics").hide();
    $("#comicFooter").hide();
    $("#footer").hide();
}

function showComic() {
    $("#comicHeading").show();
    $("#comics").show();
    $("#comicFooter").show();
    $("#footer").show();
}

function loadComic() {
    'use strict';
    counter = 0;
    $.get(comicUrl, function (r) {
        $(".comicLoading").hide();
        showComic();
        $("#comicHeading").html('');
        $("#comics").html('');
        $("#comicFooter").html('');
        $("#comicHeading").append('<h4 id="comicSource" class="show"><strong>' + r.name + '</strong></h4>');
        $("#comics").append('<div id="comic" class="show"><a href="#" onclick="openLink(\'' + r.permalink + '\');"><img src="' + r.imgurl + '" class="img-responsive" alt="' + r.name + '" title="' + r.name + '" id="comicImage"></a></div>');
        $("#comicFooter").append('<span id="comicTitle" class="text-center show">' + r.title + '</span>');
        loadComics();
    });
}

var i = 0;
function loadComics() {
    'use strict';
    if (i < 5) {
        $.ajax(comicUrl)
        .success(function(r) {
            addComicAndHide(r);
            i++;
            loadComics();
        });
    }
}

function fetchNewComic() {$.get(comicUrl, function(r) { addComicAndHide(r);});}

function addComicAndHide(r){
    $("#comicHeading").append('<h4 id="comicSource" class="hide"><strong>' + r.name + '</strong></h4>');
    $("#comics").append('<div id="comic" class="hide"><a href="#" onclick="openLink(\'' + r.permalink + '\');"><img src="' + r.imgurl + '" class="img-responsive" alt="' + r.name + '" title="' + r.name + '" id="comicImage"></a></div>');
    $("#comicFooter").append('<span id="comicTitle" class="text-center hide">' + r.title + '</span>');
}

function displayNextComic(){
    'use strict';
    var comicHead = $("#comicHeading > h4.show");
    comicHead.addClass("hide");
    comicHead.next().addClass("show");
    comicHead.next().removeClass("hide");
    comicHead.removeClass("show");
    
    var comic = $("#comics > div.show");
    comic.addClass("hide");
    comic.next().addClass("show");
    comic.next().removeClass("hide");
    comic.removeClass("show");
    
    var comicFoot = $("#comicFooter > span.show");
    comicFoot.addClass("hide");
    comicFoot.next().addClass("show");
    comicFoot.next().removeClass("hide");
    comicFoot.removeClass("show");
    
    counter++;
}

function displayPrevComic(){
    'use strict';
    var comicHead = $("#comicHeading > h4.show");
    var comic = $("#comics > div.show");
    var comicFoot = $("#comicFooter > span.show");
    
    if (counter == 0){
        $('#myNoComicAlert').modal('show');
    } else {
        comicHead.addClass("hide");
        comicHead.prev().addClass("show");
        comicHead.prev().removeClass("hide");
        comicHead.removeClass("show");

        comic.addClass("hide");
        comic.prev().addClass("show");
        comic.prev().removeClass("hide");
        comic.removeClass("show");

        comicFoot.addClass("hide");
        comicFoot.prev().addClass("show");
        comicFoot.prev().removeClass("hide");
        comicFoot.removeClass("show");
        counter--;
    }
}

var element = document.getElementById('comics');
Hammer(element).on("dragright", function (event) {
    displayNextComic();
    fetchNewComic();
    window.scrollTo(0, 0);
});

Hammer(element).on("dragleft", function (event) {
    displayPrevComic();
    window.scrollTo(0, 0);
});

function openLink(s){
    window.open(s, '_system');
}

