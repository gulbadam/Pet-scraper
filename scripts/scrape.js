const cheerio = require('cheerio');
const axios = require('axios');
let type = "kitten"
const scrape = (type) => {
    url = "https://sacramento.craigslist.org/search/pet?query=" + type
    console.log(url)
    return axios.get(url).then((res) => {
        let $ = cheerio.load(res.data);
        var posts = [];
        $("li.result-row").each((i, element) => {
            let title = $(element).find(".hdrlnk").text().trim();
            let link = $(element).find("a").attr("href");
            let date = $(element).find(".result-date").text().trim();
            let city = $(element).find(".result-hood").text();
            if (city !== null && city !== undefined && city !== "") {
                let dataAdd = {
                    title: title,
                    link: link,
                    date: date,
                    city: city
                };
                posts.push(dataAdd);
            }

        })
        console.log(posts)
        return posts
    })
}
scrape(type)

// let scraper = {

//    getKittens: (cb)=> {

//         request("https://sacramento.craigslist.org/search/pet", (err, response, html) => {
//         if (err) throw err;
//         let $ = cheerio.load(html);
//         let allRecord = $("li.result-row")
//         //console.log($.html(allRecord));

//            let kittens = [];
//             $("li.result-row").each((i, element) => {
//                let title = $(element).find(".hdrlnk").text().trim();
//              let link =$(element).find("a").attr("href");
//                 let date = $(element).find(".result-date").text().trim();
//                 let city =$(element).find(".result-hood").text();
//                 if(city  !==null && city!==undefined && city !==""){
//                 kittens.push = ({
//                         title: title,
//                         link: link,
//                          date: date,
//                          city: city
//                  })
//             }
//              })
//              console.log (kittens);

//             cb(kittens);


// //             //return kittens
// //         })
// //     }

// // }



//console.log(scrapers.getKittens());

module.exports = scrape;
