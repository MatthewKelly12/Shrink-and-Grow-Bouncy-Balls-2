// Initial canvas setup
let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let c = canvas.getContext("2d");

// Creates mouse object with x and y properties
let mouse = {
    x: undefined,
    y: undefined
}

// Mousemove event listener that sets mouse x and y properties
// to the x and y position of the cursor on the screen
window.addEventListener("mousemove",
function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

// Resize event listener that adjusts animation to  screen if it resizes
window.addEventListener("resize",
    function () {
	      canvas.width = window.innerWidth;
	      canvas.height = window.innerHeight;

	      init();
		}
)

// Creates a maximum radius for circles
let maxRadius = 40;

// Array of colors
let colorArray = ["#E37B40", "#46B29D", "#DE5B49", "#324D5C", "#F0CA4D"];

// Circle object
function Circle (x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
	this.minRadius = radius;
	// Generates a random color from colorArray
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	// Draw function draws circle
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

	// Calls draw() function and implements conditionals
    this.update = function () {
		this.draw();

		// Causes "bounce" effect when circles reach
		// left, right, top, or bottom of screen
        if (this.x > innerWidth - this.radius || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y > innerHeight - this.radius || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

		// Creates velocity (movement) of circles
        this.x += this.dx;
        this.y += this.dy;

		// Mouse Interactivity
		// Circles grow if x and y coordinates of circle are within
		// 50 pixels of mouse x and y coordinates
		// Else they shrink back to original radius
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {

            this.radius += 1;
          }
         else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

    }
}

// Array to hold circles
let circleArray = [];


function init() {
    circleArray = [];
    for (let i = 0; i < 700; i++) {
		// Creates random radius between 1 and 4
		let radius = Math.random() * 3 + 1;

		// Creates random x and y values within screen
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (innerHeight - radius * 2) + radius;

		// Creates random velocities, positive or negative
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;

		// Creates new circle and pushes into circleArray
		circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

// Animation function
function animate() {
	requestAnimationFrame(animate);
	// Clears screen to prevent trailing effects
    c.clearRect(0, 0, innerWidth, innerHeight);

	// Iterates through array of circles and draws circles
	//  with implementations of update() function
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();

    }

}

animate();
init();


