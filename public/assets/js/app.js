document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {



        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {

                // Get the target from the "data-target" attribute

                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});
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
    $(".del-post").on("click", function(){
        let id = $(this).attr("data-id");
        console.log(id);

        $.ajax({
            url: "/api/posts/delete/"+id,
            method: "DELETE"
        })
        .done(()=>{
            location.reload()
        })
    })
    $(".del-note").on("click", function () {
        let p_id = $(this).attr("data-post-id");
        let n_id = $(this).data("id");
        console.log("p"+p_id);
        console.log("n"+n_id);

        $.ajax({
            url: '/api/note/delete/' + n_id,
            method: "DELETE"
        })
            .done(() => {
                location.reload()
            })
    })
    $("#scrape-kitten").on("click", function(){
         $.get("/api/kittens", function(data){
             console.log("working")
            if(data){
                console.log("data"+data)
                $('#modal-card-body').empty();

                $('#scr-mode').addClass('is-active');

                let scraped = $('<div>').addClass().text(`Scraped posts: ${data.scraped},`);
                let saved = $('<div>').addClass().text(`Saved new posts: ${data.stored}.`);
                $(".modal-card-body").append(scraped).append(saved)
                //$("#scr-mode").modal("toggle");
            }
            
        })
        .catch(function (err) {
        console.log(err.responseJSON);
             });
    })
    $("#scrape-puppy").on("click", function () {
       
        $.get("/api/puppies", function (data) {
            console.log("working")
            if (data) {
                console.log("data" + data)
                $('#modal-card-body').empty();

                $('#scr-mode').addClass('is-active');

                let scraped = $('<div>').addClass().text(`Scraped posts: ${data.scraped},`);
                let saved = $('<div>').addClass().text(`Saved new posts: ${data.stored}.`);
                $(".modal-card-body").append(scraped).append(saved)
                //$("#scr-mode").modal("toggle");
            }

        })
            .catch(function (err) {
                console.log(err.responseJSON);
            });
    })
    $(".mod-close").on("click", function () {
        $('#scr-mode').removeClass('is-active');
        location.reload();
        
    });
 
    
    

    
    
})