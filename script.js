$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

$(document).ready(function() {
    $('#query').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#search-btn').click();//Trigger search button click event
        }
    });
    $('#search-btn').click(function(){
        console.log(callWiki)
        $('#res').html(" ");
        callWiki();
    });
    $('#random-btn').click(function(){
        console.log(randomWiki)
        $('#res').html(" ");
        randomWiki();
    });
    function callWiki() {
        var query = $('#query').val();
        var url = "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&generator=search&exchars=120&exintro=1&explaintext=1&pithumbsize=500&gsrsearch=" + query + "&gsrlimit=12";
        $.ajax({
            url: url,
            type: 'POST',
            dataType: "jsonp",
            success: function(res) {
                var data = res.query.pages;
                render(data);
            },
            error: function(err){
                console.log(err);
                alert("Could not retrieve search results, try refreshing the page.");
            }
        });
    };
    function randomWiki() {
        var url = "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&list=&generator=random&exchars=120&exintro=1&explaintext=1&pithumbsize=500&grnnamespace=0&grnlimit=12";
        $.ajax({
            url: url,
            type: 'POST',
            dataType: "jsonp",
            success: function(res) {
                var data = res.query.pages;
                render(data);
            },
            error: function(err){
                console.log(err);
                alert("Could not retrieve search results, try refreshing the page.");
            }
        });
    };
    function imageCheck(data) {
        for (var i = 0; i < 1000000; i++){
            try {
                return data.thumbnail.source;
            } catch {
                return 'images/default_thumb.jpg';
            }
        }
    }

    function render(data){
        var queryURL = "http://en.wikipedia.org/?curid=";
        for (var i in data){
            $('#res').append("<div id='resultdiv' class='card card-body mb-4 box-shadow'><div id='card-img-div'><a target='_blank' href='"+queryURL+data[i].pageid+"'><img class='card-img-top' src='"+imageCheck(data[i])+"'></a></div><p class='card-title'>"+data[i].title+"</p><p class='card-text'>"+data[i].extract+"</p><a target='_blank' href='"+queryURL+data[i].pageid+"'><button id='card-view' type='button' class='btn btn-sm btn-warning'>View</button></a></div>");
        }
    }
    function randomGen(data){
        var randomURL = "http://en.wikipedia.org/?curid=";
        for (var i in data){
            $('#res').append("<div id='resultdiv' class='card card-body mb-4 box-shadow'><img class='card-img-top' src='"+imageCheck(data[i])+"'><p class='card-title'>"+data[i].title+"</p><p class='card-text'>"+data[i].extract+"</p><a target='_blank' href='"+randomURL+data[i].pageid+"'><button id='card-view' type='button' class='btn btn-sm btn-warning'>View</button></a></div>");
        }
    }
});