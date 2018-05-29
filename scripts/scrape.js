const cheerio = require('cheerio');
const axios = require('axios');

const scrape = (category) => {
    
    

    url = "https://sacramento.craigslist.org/search/pet?query=" + category
    console.log(url)
    return axios.get(url).then((res) => {
        let $ = cheerio.load(res.data);
        var posts = [];
        $("li.result-row").each((i, element) => {
            let pid =$(element).attr("data-pid");
            let title = $(element).find(".hdrlnk").text().trim();
            let link = $(element).find("a").attr("href");
            let date = $(element).find(".result-date").text().trim();
            let city = $(element).find(".result-hood").text();
            if (city !== null && city !== undefined && city !== "") {
                let dataAdd = {
                    pid: pid,
                    title: title,
                    link: link,
                    date: date,
                    city: city,
                    category: category
                };
                posts.push(dataAdd);
            }

        })
        //console.log(posts)
        return posts;
    })
}




module.exports = scrape;
