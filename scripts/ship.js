//check out docs for P5

function Ship() {
	this.radius = 15;
	this.heading = random(360);
	this.position = createVector(windowWidth/2, windowHeight/2);
	this.velocity = createVector(0,0);
	this.isMoving = false;
	this.rotation = 0;

	this.update = function(){
		if (this.isMoving) {
			this.move();
		}

	this.position.add(this.velocity);
	this.velocity.mult(.75);
	}

	this.move = function(){
		let force = p5.Vector.fromAngle(this.heading);
		this.velocity.add(force);
	}

	this.moving = function(trueFalse){
		this.isMoving = trueFalse;
	}

	this.setRotation = function(a){
		this.rotation = a;
	}

	this.turn = function(){
		this.heading += this.rotation;
	}

	this.changeSides = function(){
		if(this.position.x > windowWidth + this.radius) {
			this.position.x = -this.radius
		} else if (this.position.x < -this.radius) {
			this.position.x = windowWidth + this.radius
		} else if (this.position.y > windowHeight + this.radius) {
			this.position.y = -this.radius
		} else if (this.position.y < -this.radius) {
			this.position.y = windowHeight + this.radius
		}
	}


	this.render = function() {
		push();
		translate(this.position.x, this.position.y);
		stroke(145, 255, 80);
		fill(0);
		rotate(this.heading + PI/2)
		//takes 6 arguments - 3 ordered pairs
		triangle(-this.radius, this.radius, this.radius, this.radius, 0, (-this.radius*1.5))
		pop();
	}
}

function Laser(shipHead, angle){
	this.position = createVector(shipHead.x, shipHead.y)
	this.velocity = p5.Vector.fromAngle(angle);
	this.velocity.mult(10);

	this.update = function(){
		this.position.add(this.velocity);
	}

	this.render = function() {
		push();
		strokeWeight(6);
		stroke(255, 0, 0);
		point(this.position.x, this.position.y);
		pop();
	}

this.hits = function(meteor){
	var d = dist(this.position.x, this.position.y, (meteor.position.x + (meteor.radius/2)), (meteor.position.y + (meteor.radius/2)));
		if (d < meteor.radius * .9){
			return true;
		} else {
			return false
		}
	}
}
