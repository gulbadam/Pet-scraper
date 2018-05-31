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
})