//   Nödvändigt för spelet ska funka   //
let score = 0; 
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const bannanaImage = new Image();
bannanaImage.src = 'bannana.png';
const blockSize = 10;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;


// ---------------------------------------------------------------
                    //  STEG 1. CREATION   // 
// Skapa orm 
let worm = [{x: width / 2, y: height / 2}];
let direction = 'right';

// Skapa mat
let food = {
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height)
};

// ---------------------------------------------------------------
                    //  STEG 2. CONTROLS   // 

document.addEventListener('keydown', event => {
    // Controls för orm del 1 
    if (event.key === 'ArrowUp') direction = 'up';
    else if (event.key === 'ArrowLeft') direction = 'left';
    else if (event.key === 'ArrowDown') direction = 'down';
    else if (event.key === 'ArrowRight') direction = 'right';
  }); 


setInterval(() => {
  // Controls för orm del 2
  const head = {x: worm[0].x, y: worm[0].y};
  if (direction === 'right') head.x++;
  else if (direction === 'left') head.x--;
  else if (direction === 'up') head.y--;
  else if (direction === 'down') head.y++;
  worm.unshift(head);

  // Om ät = skapa ny matbit
  if (worm[0].x === food.x && worm[0].y === food.y) {
    food = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };  

    // Om mat = få poäng
    score++;
  } else {
    worm.pop();
  }

// ---------------------------------------------------------------
                    //  STEG 3. GAMEOVER   // 



  // Kolla om Död
  if (
    worm[0].x < 0 || worm[0].x >= width ||
    worm[0].y < 0 || worm[0].y >= height ||
    worm.slice(1).some(block => block.x === worm[0].x && block.y === worm[0].y)
  ) {
    // Reset'a Spelet
    worm = [{x: width / 2, y: height / 2}];
    direction = 'right';
    food = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    score = 0;  
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // ---------------------------------------------------------------
                    //  STEG 4. REPEATS   // 



  // Rita Mat
  ctx.drawImage(
    bannanaImage,
    food.x * blockSize,
    food.y * blockSize,
    blockSize * 1.5,  
    blockSize * 1.5
  );

  // Rita Orm
  ctx.fillStyle = 'saddlebrown';
  for (const block of worm) {
    ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
  }


  // Uppdatera Score
  ctx.fillStyle = 'black';
  ctx.font = '16px Monospace ';
  ctx.fillText(`SCORE: ${score}`, 10, 20);  
}, 100);