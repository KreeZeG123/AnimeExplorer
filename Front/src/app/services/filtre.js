const animeData = require('./output.json');






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
