# Wheels of Fortune – p5.js Rendering

This is the A part of our group work: data generation and rendering structure for Pacita Abad's *Wheels of Fortune*.

## Files

- `index.html`: main HTML entry
- `sketch.js`: p5.js setup & draw loop
- `wheel.js`: Wheel class and pattern drawing
- `style.css`: basic styles

## My Contribution

I created the data and rendering system. Each Wheel has position, rotation, radius, color palette, and pattern style (`dots`, `concentric`, `lines`). This modular design allows easy extension for animation and interaction by other teammates.

## How to Run

1. Clone the repo
2. Open `index.html` in browser


# Rotation Animation – Added by Katherine

I implemented the rotation functionality (part B) for each wheel object. 

## My contribution:
- Adding `angle` and `rotationSpeed` to each `Wheel` instance in `wheel.js`
- Creating an `update()` method to increment the angle on each frame
- Modifying the `draw()` loop in `sketch.js` to call `update()` and enable continuous animation

## How to adjust the rotation speed of each wheel:
```js
// Fixed speed for all wheels (same rotation speed)
this.rotationSpeed = 0.5;

// Random speed for variation between wheels
this.rotationSpeed = random(0.2, 1);

# Part D.Collision Response (Neighbor Displacement)

**Files**  
- `sketch.js` – implements the main loop and collision logic  

**My Contribution**  
- Designed a **three‐phase `draw()` loop**:  
  1. **Update** each wheel’s rotation, hover state & smooth scaling  
  2. **Resolve collisions** using each wheel’s _outermost_ ring radius to push neighbors in a ripple effect  
  3. **Display** all wheels at their final positions and sizes  
- Wrote `resolveCollisions()` to:  
  - Compute the _outer ring radius_ for the hovered wheel (`outerA`) and each neighbor (`outerB`)  
  - Compare their center‐to‐center distance with `outerA + outerB`  
  - Push neighbors apart by half the overlap along the normalized direction vector (× 1.1 for a livelier effect)  

---

### Core Code Snippet

```js
function draw() {
  background('#2E5F72');

  // 1) Update rotation, hover & radius for all wheels
  for (let w of wheels) {
    w.update();
  }

  // 2) Ripple‐style push using outer ring boundaries
  resolveCollisions();

  // 3) Render all wheels
  for (let w of wheels) {
    w.display();
  }
}

function resolveCollisions() {
  const dotRings    = 6;
  const ringSpacing = 13;
  const extraOffset = 10;

  for (let i = 0; i < wheels.length; i++) {
    const a = wheels[i];
    if (!a.isHovered) continue;  // only the hovered wheel pushes neighbors

    // outer radius for hovered wheel
    const pinkA  = a.radius * 0.45;
    const outerA = pinkA + 18 + (dotRings - 1) * ringSpacing + extraOffset;

    for (let j = 0; j < wheels.length; j++) {
      if (i === j) continue;
      const b = wheels[j];

      // outer radius for neighbor wheel
      const pinkB  = b.radius * 0.45;
      const outerB = pinkB + 18 + (dotRings - 1) * ringSpacing + extraOffset;

      const dx        = b.x - a.x;
      const dy        = b.y - a.y;
      const dist      = sqrt(dx * dx + dy * dy);
      const threshold = outerA + outerB;

      // push apart if overlapping
      if (dist < threshold && dist > 0) {
        const overlap = (threshold - dist) / 2;
        const ux      = dx / dist;
        const uy      = dy / dist;

        // move neighbor outward
        b.x += ux * overlap * 1.1;
        b.y += uy * overlap * 1.1;
      }
    }
  }
}
