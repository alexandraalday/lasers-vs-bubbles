
function Meteor(position, radius) {
	if(radius) {
		this.radius = radius/2
	} else {
		this.radius = random(30, 120);
	}
	if (position){
		this.position = position.copy();
	} else {
			this.position = createVector(random(0, 500), random(0, 300));
	}

	this.velocity = p5.Vector.random2D();

	this.update = function() {
		this.position.add(this.velocity)
		this.velocity.mult(1.000009)
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


	this.break = function(){
		var newM = [];
		newM[0] = new Meteor(this.position, this.radius);
		newM[1] = new Meteor(this.position, this.radius);
		return newM;
	}


	this.render = function() {
		push();
		// translate(this.position.x, this.position.y);
		stroke(random(255), random(255), 255);
		fill(0);
		rotate(this.heading + PI/2)
		//takes 6 arguments - 3 ordered pairs
		ellipse(this.position.x, this.position.y, this.radius)
		pop();
	}
}
