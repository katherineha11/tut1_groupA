let wheels = [];

function setup() {
  createCanvas(800, 800);
  background('#2E5F72'); // Background color similar to the original deep blue
  
  // Manually specified positions based on visual layout in the image
  let positions = [
    { x: 90, y: 100 }, { x: 330, y: 30 }, { x: 570, y: -40 },
    { x: 50, y: 340 }, { x: 280, y: 270 }, { x: 510, y: 200 }, { x: 740, y: 130 }, 
    { x: 10, y: 580 }, { x: 240, y: 510 }, { x: 470, y: 440 }, { x: 700, y: 360 }, 
    { x: -20, y: 830 }, { x: 210, y: 750 }, { x: 440, y: 680 }, { x: 670, y: 600 }, 
    { x: 620, y: 850 }, { x: 860, y: 770 }
  ];

  // All wheels share the same radius; do not modify their individual sizes
  let radius = 50;

  // Create wheel objects based on the positions
  for (let pos of positions) {
    wheels.push(new Wheel(pos.x, pos.y, radius));
  }

  // Only draw once
  // noLoop();
  // Kathie: I removed noLoop() so that draw() can run continuously for animation
}

function draw() {
  // Clear the canvas each frame to redraw background and rotating wheels
  background('#2E5F72'); 

  // Call update and display for each wheel
  // update() is newly added to apply rotation over time
  for (let wheel of wheels) {
    wheel.update();    // Updates rotation angle
    wheel.display();   // Draws the wheel at current rotation
  }
}

// Random color generator
function randomColor() {
  return color(random(255), random(255), random(255));
}