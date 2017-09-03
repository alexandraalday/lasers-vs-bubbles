console.log('loaded bro')
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

var ship;
var meteors = [];
var lasers = [];
var score = 0;
const numMeteors = 12;

//only call once on initial load of the page


setup = function() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for(var i = 0; i < numMeteors; i++){
		meteors[i] = new Meteor();
	}
}

draw = function(){
	background(0);
	ship.render();
	ship.update();
	ship.turn();
	ship.changeSides();
	for(var i = 0; i < meteors.length; i++){
		meteors[i].render();
		meteors[i].update();
		meteors[i].changeSides();
	}
	for (var i = lasers.length-1; i >= 0; i--){
		lasers[i].render();
		lasers[i].update();
		for(let j = meteors.length-1; j>= 0; j--){
			if (lasers[i].hits(meteors[j])){
				if(meteors[j].radius > 30){
					var newMeteor = meteors[j].break();
					meteors = meteors.concat(newMeteor);
					meteors.splice(j, 1);
					lasers.splice(i, 1);
					console.log(lasers)
					score++;
					$(".score").text(score * 100);
					break;
				} else {
					meteors.splice(j, 1);
					score++;
					$(".score").text(score * 100);
					checkWin();
				}
			}
		}
	}
}

function checkWin(){
	if(meteors.length === 0){
		alert("BOOM! Nailed it!")
		noLoop();
	}
}

keyPressed = function(){
	if (keyCode == UP_ARROW) {
		ship.moving(true);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-.1);
	} else if (keyCode == RIGHT_ARROW) {
		ship.setRotation(.1) }
	// else if (keyCode == 40) {
	// 	ship.moving(true);} 
	else if (keyCode == 32) {
		lasers.push(new Laser(ship.position, ship.heading))
	} 
}

keyReleased = function(){
	if (keyCode == UP_ARROW) {
		ship.moving(false);
	} else if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
		ship.setRotation(0);
	}
}