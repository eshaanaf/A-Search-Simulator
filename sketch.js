var w = 20;
var end = [];
let start = [];
var mappa = [];
let path = [];
let pathCounter = 0;

function setup() {
	frameRate(24);
  createCanvas(400, 400);
	for(var i = 0; i < width/w; i++){
		mappa.push([]);
		for(var j = 0; j < height/w; j++){
			mappa[i].push("");
		}
	}
}

function draw() {
	background(160);
	noStroke();
	fill(255);
	for (var i = 0; i < mappa.length; i++) {
		for (var j = 0; j < mappa[i].length; j++) {
			if(mappa[i][j] == "o") fill(color(200,10,10));
			else if(mappa[i][j] == "e") fill(color(10, 200, 10));
			else if(mappa[i][j] == "s") fill(color(10, 10, 200));
			else if(mappa[i][j] == "v") fill(color(50, 50, 50));
			else if(mappa[i][j] == ""){
				if ((j % 2 == 0 && i % 2 == 0) || (j % 2 == 1 && i % 2 == 1)) fill(255);
				else fill(160);
			}
			rect(w*i, j*w, w, w);
		}
	}
	if(mouseIsPressed && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
		if(mappa[int(mouseX/width * width/w)][int(mouseY/height * height/w)] == "s") start = []
		else if(mappa[int(mouseX/width * width/w)][int(mouseY/height * height/w)] == "e") end = []
		mappa[int(mouseX/width * width/w)][int(mouseY/height * height/w)] = "o";
	}
	if(keyIsPressed && key == 'd' && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
		mappa[int(mouseX/width * width/w)][int(mouseY/height * height/w)] = "";
	}
	if(path.length != 0){
		mappa[path[pathCounter][0]][path[pathCounter][1]] = "v";
		pathCounter = constrain(pathCounter + 1, 0, path.length-1);
	}
}

function constrain(n,a,b){
	if(n < a) return a;
	else if(n > b) return b
	return n
}

function keyTyped(){
	if(key == 's' && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
		mappa[int(mouseX/width * width/w)][int(mouseY/height * height/w)] = "s";
		if(start.length != 0) mappa[start[0]][start[1]] = "";
		start = [int(mouseX/width * width/w),int(mouseY/height * height/w)];
	}
	else if(key == 'e' && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
		mappa[int(mouseX/width * width/w)][int(mouseY/height * height/w)] = "e";
		if(end.length != 0) mappa[end[0]][end[1]] = "";
		end = [int(mouseX/width * width/w),int(mouseY/height * height/w)];
	}
	else if(key == 'r'){
		clearMap();
		path = [];
		end = [];
		start = [];
		return;
	}
	else if(key == 'g'){
		clearMap();
		randomCluster(0.34);
		path = [];
		end = [];
		start = [];
		return;
	}
	if(start.length != 0 && end.length != 0){
		let result = AstartSearch(start, end);
		path = result.slice(1,result.length - 1);
		pathCounter = 0;
	}
}