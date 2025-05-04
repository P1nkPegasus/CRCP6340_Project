let flowerPowerSketch = (p) => {
  let flowers = [];
  let lotusX, lotusY;
  let lotusSize = 50;

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, 755);
    canvas.parent("flowerPower-sketch-container"); // Attach the canvas to the flowerPower-sketch-container div
    let numFlowers = p.int(p.random(3, 11)); // Random number of flowers between 3 and 10

    for (let i = 0; i < numFlowers; i++) {
      let flower = {
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(50, 150), // Random size between 50 and 150
        opacity: p.random(50, 150), // Random opacity between 100 and 255
      };
      flowers.push(flower);
    }
  };

  p.draw = () => {
    p.clear(); // Clear the canvas to make it transparent
    for (let flower of flowers) {
      let currentSize = flower.size + p.sin(p.frameCount * 0.02) * 10; // Pulsating effect
      drawLotus(flower.x, flower.y, currentSize, flower.opacity);
    }
  };

  function drawLotus(x, y, size, opacity) {
    p.push();
    p.translate(x, y);

    p.noStroke();
    p.fill(37, 119, 128, opacity); // Pink petals with specified opacity

    // Draw petals
    for (let i = 0; i < 8; i++) {
      p.rotate(p.TWO_PI / 8);
      p.ellipse(0, size / 2, size / 2, size);
    }

    // Center circle of the lotus
    p.fill(211, 205, 9, 200); // Yellow center with specified opacity (200)
    p.ellipse(0, 0, size / 2, size / 2);

    p.pop();
  }
};

new p5(flowerPowerSketch);
