const Scrapy = require('./Scrapy.js')
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const scraper = require('./scraper');

app.use(bodyParser.json());
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


app.get('/foods', async (req, res) => {
    let scrapy = new Scrapy("food")
    let data = await scrapy.start().catch(error => console.error(error))
    res.send(data);
});

app.post('/foods', async (req, res) => {
    console.log(req.body);
    let scrapy = new Scrapy(req.body.query)
    let data = await scrapy.start().catch(error => console.error(error))
    res.send(data);
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
