const animeData = require('./output.json');


function displayAnime(){
    let listeAnime=[];
    let lenData=animeData.data.Page.media.length;
    for(let i=0;i<lenData;i++){
        listeAnime.unshift(animeData.data.Page.media[i].coverImage.medium);
    }
    return listeAnime;
}



module.exports = {
    displayAnime: displayAnime
};