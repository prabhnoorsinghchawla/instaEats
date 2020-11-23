const { link } = require("fs");

function newEl(type,attrs={}){
    const el = document.createElement(type);
    for(let attr in attrs){
        const value = attrs[attr];
        if(attr=='innerText')
            el.innerText = value;
        else
            el.setAttribute(attr,value);
    }
    return el;
}
function search(ele,enableLoc) {
    if(event.key === 'Enter') {
        scrapeFood(enableLoc);        
    }
}
async function  scrapeFood(enableLoc){
    let query = document.querySelector(".input").value;
    query = query.replace(/\s+/g, '');
    query = query.toLowerCase();
    if(enableLoc) 
        query += "food"
    //parse to server
    console.log("check before");
    const res = await fetch('http://localhost:3000/foods', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({query})
                });
                const creators = await res.json();
                // console.log(creators);
                
                
                const ctr = document.querySelector('.grid');

                while(ctr.firstChild){
                    ctr.removeChild(ctr.lastChild);
                }

                creators["images"].forEach(creator => {
                    const card = newEl('div', {class: 'cards'});
                    const img = newEl('img', {src: creator['link']});
                    const location_layer = newEl('div', {class: 'location_layer'});
                    const location_text = newEl('p',{class: 'location_description',innerText : creator['location']});
                    location_layer.appendChild(location_text);


                    card.appendChild(img);
                    card.appendChild(location_layer);
                    ctr.appendChild(card);
                })
}

async function fetchImages(){
    const res = await fetch("http://localhost:3000/foods");
    const creators = await res.json();

    const ctr = document.querySelector('.grid');

    creators['images'].forEach(creator => {
       // const card = newEl('div', {class: 'card'});
        const img = newEl('img', {src: creator['link']});
       // card.appendChild(img);
        ctr.appendChild(img);
    })
}

fetchImages();