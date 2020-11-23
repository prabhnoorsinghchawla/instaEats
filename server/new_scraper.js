const fetch = require("node-fetch");

async function scrape(query){
    console.log("reached scraper "+query);
    endCursor = '';
    let url =  `https://www.instagram.com/explore/tags/${query}/?__a=1&max_id=${endCursor}`;
    let response = await fetch(url);
    let data = {"images":[]}

    let commits = await response.json(); 
    var uniq;
    for(uniq of commits['graphql']['hashtag']['edge_hashtag_to_top_posts']['edges']){
        let src = uniq['node']['thumbnail_src'];
        let shortcode = uniq['node']['shortcode'];
        let loc_url = `https://www.instagram.com/p/${shortcode}/?__a=1`;
        let response_loc = await fetch(loc_url);
        let loc_name = '';
        try{
            let loc_data = await response_loc.json();
            try{
                loc_name = loc_data['graphql']['shortcode_media']['location']['name'];
            }
            catch(err){
                loc_name = 'Not Provided';
            }
            data["images"].push({"link": src, "location":loc_name});
        }
        catch(err){
            data["images"].push({"link": src, "location":"Not Provided"});
        }
        
    }      
    return data;
}
exports.scrape = scrape;