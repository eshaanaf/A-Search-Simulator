function randomCluster(prop){
	for(let i = 0; i < mappa.length; i++){
		for(let j = 0; j < mappa[i].length; j++){
			if(random() <= prop) mappa[i][j] = "o";
		}
	}
}

function clearMap(){
	for(let i = 0; i < mappa.length; i++){
		for(let j = 0; j < mappa[i].length; j++){
			mappa[i][j] = "";
		}
	}
}