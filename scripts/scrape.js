const cheerio = require('cheerio');
const axios = require('axios');

const scrape = (category) => {
    
    return new Promise((resolve, reject) => {

    url = "https://sacramento.craigslist.org/search/pet?query=" + category
    console.log(url)
    axios.get(url).then((res) => {
        let $ = cheerio.load(res.data);
        let pstArr = [];

        
        
        $("li.result-row").each((i, element) => {
            let pst = {};

            let city = $ (element).find ('.result-hood').text ();
            if(city) {
                

            

            pst.pid =$(element).attr("data-pid");
            pst.title = $(element).find(".hdrlnk").text().trim();
            pst.link = $(element).find("a").attr("href");
            pst.city = city;
            pst.category = category;
            pst.date = $(element).find(".result-date").text().trim();
            
            
            //if (city !== null && city !== undefined && city !== "") {
                // let dataAdd = {
                //     pid: pid,
                //     title: title,
                //     link: link,
                //     date: date,
                //     city: city,
                //     category: category
                // };
                // posts.push(dataAdd);
            //}
            //console.log(pst)
            //console.log("______________________________________")
            pstArr.push(pst)
            }
        
            
        })
        resolve(pstArr);
        console.log(pstArr)
        

    
    })
    .catch((error)=>{
        reject(error)
    })
    
})
}




module.exports = scrape;
