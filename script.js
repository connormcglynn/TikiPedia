$(document).ready(function() {
    $('.searchbox').submit(function(){
        $('#res').html(" ");
        callWiki();
        return false;
    });
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
    function callWiki() {
        var query = $('#query').val();
        var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=extracts&exintro&explaintext&exlimit=max&exchars=120&gsrsearch=" + query + "&callback=?";
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
    }
    // function getImages(){
    //     var query = $('#query').val();
    //     var imgURL = "http://en.wikipedia.org/w/api.php?action=parse&page=" + query + "&prop=images&format=json&callback=?";
    //     $.ajax({
    //         url: url,
    //         type: 'POST',
    //         dataType: 'jsonp',
    //         success: function(res) {
    //             var image = res.query.pages;
    //             render(image);
    //         },
    //         error: function(err){
    //             console.log(err);
    //             alert('Could not return image, please try again');
    //         }
    //     })
    // }
    function render(data){
        var queryURL = "http://en.wikipedia.org/?curid=";
        for (var i in data){
            $('#res').append("<div id='resultdiv' class='card card-body mb-4 box-shadow'><p class='card-title'>"+data[i].title+"</p><p class='card-text'>"+data[i].extract+"</p><a target='_blank' href='"+queryURL+data[i].pageid+"'><button id='view' type='button' class='btn btn-sm btn-warning'>View</button></a></div>");
        }
    }
    // Tried to call images, work in progress...
    // function renderImage(image){
    //     var queryURl = "http://en.wikipedia.org/?curid=";
    //     for (var i in image){
    //         $('#res').append();
    //     }
    // }
});