const animeData = require('./output.json');


function displayAnime(){
    let listeAnime=[];
    let lenData=animeData.data.Page.media.length;
    for(let i=0;i<lenData;i++){
        listeAnime.unshift(animeData.data.Page.media[i].coverImage.medium);
    }
    return listeAnime;
}



function filtreGenre (listefiltre)
    {
    let listeFiltree=[]
    let lenData=animeData.data.Page.media.length;
    for(let i=0;i<lenData;i++){
        let lenGenre=animeData.data.Page.media[i].genres.length;
        for(let j=0;j<lenGenre;j++){
            if((animeData.data.Page.media[i].genres[j])==genre){
                listeFiltree.unshift(animeData.data.Page.media[i])
            }
        }    
    }
    return listeFiltree;
}
