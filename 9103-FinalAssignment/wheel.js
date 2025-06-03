class Wheel {
    constructor(x, y, baseRadius) {
      this.x = x;
      this.y = y;
      this.r = baseRadius;

    // Added: rotation properties for animation
           // - To make all wheels spin at the same speed, assign a fixed number to this.rotateSpeed like 0.5
            // - To give each wheel a unique speed, use random(min, max)
    // For this project, I made each wheel has its own initial angle and rotation speed
    this.angle = random(360);
    this.rotationSpeed = random(0.2, 1); 
          

      // Center concentric circles with random colors
        this.colors = Array.from({ length: 7 }, () => randomColor());

      // All other elements also use random colors
        this.pinkRingColor = randomColor();
        this.yellowSpikesColor = randomColor();
        this.outerCircleColor = randomColor();
        this.dotColor = randomColor();
        this.dotBgColor = randomColor();
        this.finalCircleColor = randomColor();
        this.curvedLineColor = randomColor();
    }
  

     // Added: update method to increase angle each frame
  update() {
    this.angle += this.rotationSpeed;
  }
  

    display() {
      push();
      translate(this.x, this.y);

      // Added: apply current rotation to the entire wheel
      rotate(this.angle);
      angleMode(DEGREES);
      
  
      // Draw central concentric circles
      noStroke();
      let radii = [this.r * 0.37, this.r * 0.32, this.r * 0.27, this.r * 0.22, this.r * 0.17, this.r * 0.12, this.r * 0.07];
      for (let i = 0; i < this.colors.length; i++) {
        fill(this.colors[i]);
        ellipse(0, 0, radii[i] * 2);
      }
  
      // Ring background
      let pinkRadius = this.r * 0.45;
      fill(this.pinkRingColor);
      ellipse(0, 0, pinkRadius * 2);
  
      // Spikes
      stroke(this.yellowSpikesColor);
      strokeWeight(2);
      let spikes = 50;
      for (let i = 0; i < spikes; i++) {
        let angle = (360 / spikes) * i;
        let x1 = cos(angle) * (pinkRadius - 6);
        let y1 = sin(angle) * (pinkRadius - 6);
        let x2 = cos(angle) * (pinkRadius + 6);
        let y2 = sin(angle) * (pinkRadius + 6);
        line(x1, y1, x2, y2);
      }
  
      // Outer circle around spikes
      noFill();
      stroke(this.outerCircleColor);
      strokeWeight(3);
      ellipse(0, 0, (pinkRadius + 8) * 2);
  
      // Outer rings with dots
      let dotRings = 6;
      let initialRadius = pinkRadius + 18;
      let ringSpacing = 13;
  
      for (let ring = 0; ring < dotRings; ring++) {
        let currentRadius = initialRadius + ring * ringSpacing;
        let dotsNum = 80 - ring * 8;
        let dotSize = 7 - ring * 0.7;
  
        // White background ring
        strokeWeight(ringSpacing - 2);
        stroke(this.dotBgColor);
        noFill();
        ellipse(0, 0, currentRadius * 2);
  
        // Red dots on the ring
        strokeWeight(0);
        fill(this.dotColor);
        for (let j = 0; j < dotsNum; j++) {
          let angle = (360 / dotsNum) * j;
          ellipse(
            cos(angle) * currentRadius,
            sin(angle) * currentRadius,
            dotSize
          );
        }
      }
  
      // Final thick outer ring
      noFill();
      stroke(this.finalCircleColor);
      strokeWeight(6);
      ellipse(0, 0, (initialRadius + (dotRings - 1) * ringSpacing + 10) * 2);
  
      // Curved red line in the center
      stroke(this.curvedLineColor);
      strokeWeight(5);
      noFill();
      beginShape();
      vertex(0, 0);
      bezierVertex(30, -20, 60, -30, 90, -60);
      endShape();
  
      pop();
      }
}

  // Random color generator function
function randomColor() {
    return color(random(255), random(255), random(255));
  }