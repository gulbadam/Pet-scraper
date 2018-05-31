$(document).ready(()=>{
    $(".save-post").on("click", function(){
       let id =$(this).attr("data-id");
        console.log(id);
        $.ajax({
            url: "/api/posts/save/"+id,
            method: "PUT"
        })
        .done(()=>{
            location.reload();
        })

    })
    $(".delete").on("click", function(){
        let id = $(this).attr("data-id");
        console.log (id);

        $.ajax({
            url: "/api/posts/delete/"+id,
            method: "DELETE"
        })
        .done(()=>{
            location.reload()
        })
    })
    $("#scrape-kitten").on("click", function(){
        //console.log("ckicked");
        

         //$("#scr-cont").empty();
         $.get("/api/kittens", function(data){
             console.log("working")
            if(data){
                console.log("data"+data)
                $ ('#scr-cont').empty ();

                $('#scr-mode').addClass('is-active');

                let scraped = $('<div>').addClass().text(`Scraped posts: ${data.scraped},`);
                let saved = $('<div>').addClass().text(`Saved new posts: ${data.stored}.`);
                $("#scr-cont").append(scraped).append(saved)
                //$("#scr-mode").modal("toggle");
            }
            
        })
             .catch(function (err) {
                 console.log(err.responseJSON);
             });
    })
    $("#scrape-puppy").on("click", function () {
        //console.log("ckicked");


        //$("#scr-cont").empty();
        $.get("/api/puppies", function (data) {
            console.log("working")
            if (data) {
                console.log("data" + data)
                $('#scr-cont').empty();

                $('#scr-mode').addClass('is-active');

                let scraped = $('<div>').addClass().text(`Scraped posts: ${data.scraped},`);
                let saved = $('<div>').addClass().text(`Saved new posts: ${data.stored}.`);
                $("#scr-cont").append(scraped).append(saved)
                //$("#scr-mode").modal("toggle");
            }

        })
            .catch(function (err) {
                console.log(err.responseJSON);
            });
    })
    $(".modal-close").on("click", function () {
        $('#scr-mode').removeClass('is-active');
        location.reload();
        
    })
})