let stretchy
let face
let pipes
let badVibeImg
let loseImg
let gameOver

// let w = window.innerWidth
// let h = window.innerHeight

function setup() {
  // createCanvas(w, h)
  createCanvas(800, 800)

  gameOver = false

  badVibeImg = loadImage('images/badvibe.png')

  loseImg = loadImage('images/lose.png')

  face = loadImage('images/face.png')
  face.scale = 1

  stretchy = createSprite(400, 200, 10, 10)

  pipes = new Group()

  stretchy.draw = function () {
    fill(237, 205, 0)

    push()
    rotate(radians(this.getDirection()))
    ellipse(0, 0, 60 + this.getSpeed(), 60 - this.getSpeed())
    pop()

    image(face, this.deltaX * 2, this.deltaY * 2)
  }

  stretchy.maxSpeed = 10
}

function draw() {
  if (gameOver == false) {
    //spawn pipes
    if (frameCount % 20 == 0) {
      //let pipeH = random(50, 300);
      let pipe = createSprite(random(0, width), 0)
      pipe.addImage('main', badVibeImg)
      pipe.addSpeed(9, 90)
      pipes.add(pipe)
    }

    background(255, 255, 255)
    stretchy.velocity.x = (mouseX - stretchy.position.x) / 10
    stretchy.velocity.y = (mouseY - stretchy.position.y) / 10

    if (pipes.overlap(stretchy) == true) {
      gameOver = true
      console.log('lose')

      for (let i = 0; i < pipes.length; i++) {
        pipes[i].setSpeed(0, 0)
      }
    }
  }

  if (gameOver == true) {
    lose = createSprite(100, 50)
    lose.addImage('main', loseImg)

    if (mouseWentDown(LEFT)) {
      console.log('down')
      window.location.reload()
    }
  }

  drawSprites(pipes)
  drawSprites()
}
