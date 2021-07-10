
function heuristicEuclidianDistance(pos, end){
	return int(sqrt((pos[0]-end[0])*(pos[0]-end[0]) + (pos[1]-end[1])*(pos[1]-end[1])));
}

function AstartSearch(start, end){
	let dp = [];
	for(let i = 0; i < mappa.length; i++){
		dp.push([]);
		for(let j = 0; j < mappa[i].length; j++){
			dp[i].push(false);
		}
	}
	let log = [];
	let heap = new PriorityQueue();
	heap.enqueue(start, heuristicEuclidianDistance(start, end));
	while(!heap.isEmpty()){
		let pos = heap.dequeue();
		if(pos.element[0] < 0 || pos.element[0] > mappa.length-1 || pos.element[1] < 0 || pos.element[1] > mappa[0].length-1 || mappa[pos.element[0]][pos.element[1]] == "o" || dp[pos.element[0]][pos.element[1]]){
			continue;
		}
		log.push(pos.element);
		dp[pos.element[0]][pos.element[1]] = true; //should return list with points instead
		if(pos.element[0] == end[0] && pos.element[1] == end[1]){
			return log;
		}
		heap.enqueue([pos.element[0] + 1, pos.element[1]], heuristicEuclidianDistance([pos.element[0] + 1, pos.element[1]], end));
		heap.enqueue([pos.element[0] - 1, pos.element[1]], heuristicEuclidianDistance([pos.element[0] - 1, pos.element[1]], end));
		heap.enqueue([pos.element[0], pos.element[1] + 1], heuristicEuclidianDistance([pos.element[0], pos.element[1] + 1], end));
		heap.enqueue([pos.element[0], pos.element[1] - 1], heuristicEuclidianDistance([pos.element[0], pos.element[1] - 1], end));
	}
	return log;
}