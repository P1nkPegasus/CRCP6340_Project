let dotsSketch = (p) => {
  const colors = [
    [251, 106, 177, 200], // RGBA Pink color for odd indices
    [254, 162, 0, 200], // RGBA Orange color for even indices
    // [37, 119, 128, 200], // RGBA Teal color for even indices
  ];
  let dots = [];
  let t = 0; // Parameter for the parametric equation

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight/1.3); // Set the height to match the container
    canvas.parent("dotsSketchContainer"); // Attach the canvas to the dotsSketchContainer div
    p.noStroke(); // Remove stroke from the dots

    // Generate a random number of dots between 50 and 150
    let numDots = p.int(p.random(10, 100));

    // Generate positions and initial sizes for each dot
    for (let i = 0; i < numDots; i++) {
      let angleOffset = p.random(p.TWO_PI); // Random initial angle offset
      let dot = {
        angleOffset: angleOffset,
        size: p.random(5, 70), // Random size between 5 and 70
        speed: p.random(0.01, 2), // Random speed for each dot        
        x: p.width / 2 + butterflyX(angleOffset), // Initial x position
        y: p.height / 2 - butterflyY(angleOffset), // Initial y position (inverted)
      };
      dots.push(dot);
      console.log(dot.speed);
    }
  };

  p.draw = () => {
    // p.background(220); // Clear the background

    // Update and draw each dot
    for (let i = 0; i < dots.length; i++) {
      let dot = dots[i];
      let angle = t * dot.speed + dot.angleOffset;
      dot.x = p.width / 2 + butterflyX(angle);
      dot.y = p.height / 2 - butterflyY(angle); // Inverted y position

      p.fill(colors[i % colors.length]);
      p.ellipse(dot.x, dot.y, dot.size);
    }

    t += 0.01; // Increment the parameter
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, 700);
  };

  // Butterfly curve parametric equations
  function butterflyX(t) {
    return 100 * Math.sin(t) * (Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5));
  }

  function butterflyY(t) {
    return 100 * Math.cos(t) * (Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5));
  }
};

// Initialize the sketch
new p5(dotsSketch);