  /* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

dsadsaddadadsa
/*
 * instellingen om foutcontrole van je code beter te maken 
 */


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
function nieuweRichting() {
  return random([-1, 1]) * random(2, 6);
}
var aantal = 0;

const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 8;
var spelStatus = UITLEG;

const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 100;  // health van speler

 var spelerSnelheid = 20;
var vorigeScoreCheckpoint = 0;

var uitlegAlGetoond = false;

var vijandSnelheidY;
var vijandSnelheidY;
var vijandX = 600;
var vijandY = 500;

var Vijand = false;
var Vijand2X = 0;
var Vijand2Y = 0;
var vijand2SnelheidX;
var vijand2SnelheidY;

var Vijand3 = false;
var Vijand3X = 0;
var Vijand3Y = 0;
var vijand3SnelheidX;
var vijand3SnelheidY;


var Vijand4 = false;
var Vijand4X = 0;
var Vijand4Y = 0;
var vijand4SnelheidX;
var vijand4SnelheidY;

 
var fireballImg;
var ridderImg;

var achtergrondMuziek;

var achtergrondImg;

var score = 0;
var tijdScore = 0;



/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if (keyIsDown(KEY_LEFT) && spelerX > 25) {
    spelerX -= spelerSnelheid;
  }
  if (keyIsDown(KEY_RIGHT) && spelerX < width - 25) {
    spelerX += spelerSnelheid;
  }
  if (keyIsDown(KEY_UP) && spelerY > 25) {
    spelerY -= spelerSnelheid;
  }
  if (keyIsDown(KEY_DOWN) && spelerY < height - 25) {
    spelerY += spelerSnelheid;
  }
 
  // vijand
vijandX = vijandX + vijandSnelheidX;
vijandY = vijandY + vijandSnelheidY;
if (vijandX < 0) {
    vijandX = 0;
    vijandSnelheidX = -vijandSnelheidX;
  } else if (vijandX > width) {
    vijandX = width;
    vijandSnelheidX = -vijandSnelheidX;
  }

  if (vijandY < 0) {
    vijandY = 0;
    vijandSnelheidY = -vijandSnelheidY;
  } else if (vijandY > height) {
    vijandY = height;
    vijandSnelheidY = -vijandSnelheidY;
  }

  //vijand 2
  if (Vijand) {
  Vijand2X = Vijand2X + vijand2SnelheidX;
  Vijand2Y = Vijand2Y + vijand2SnelheidY;
  if (Vijand2X < 0) {
      Vijand2X = 0;
      vijand2SnelheidX = -vijand2SnelheidX;
  } else if (Vijand2X > width) {
      Vijand2X = width;
      vijand2SnelheidX = -vijand2SnelheidX;
  }

  if (Vijand2Y < 0) {
      Vijand2Y = 0;
      vijand2SnelheidY = -vijand2SnelheidY;
  } else if (Vijand2Y > height) {
      Vijand2Y = height;
      vijand2SnelheidY = -vijand2SnelheidY;
  }
}
//Vijand3
if (Vijand3) {
  Vijand3X = Vijand3X + vijand3SnelheidX;
  Vijand3Y = Vijand3Y + vijand3SnelheidY;
  if (Vijand3X < 0) {
      Vijand3X = 0;
      vijand3SnelheidX = -vijand3SnelheidX;
  } else if (Vijand3X > width) {
      Vijand3X = width;
      vijand3SnelheidX = -vijand3SnelheidX;
  }

  if (Vijand3Y < 0) {
      Vijand3Y = 0;
      vijand3SnelheidY = -vijand3SnelheidY;
  } else if (Vijand3Y > height) {
      Vijand3Y = height;
      vijand3SnelheidY = -vijand3SnelheidY;
  }
}
//Vijand4
if (Vijand4) {
  Vijand4X = Vijand4X + vijand4SnelheidX;
  Vijand4Y = Vijand4Y + vijand4SnelheidY;
  if (Vijand4X < 0) {
      Vijand4X = 0;
      vijand4SnelheidX = -vijand4SnelheidX;
  } else if (Vijand4X > width) {
      Vijand4X = width;
      vijand4SnelheidX = -vijand4SnelheidX;
  }

  if (Vijand4Y < 0) {
      Vijand4Y = 0;
      vijand4SnelheidY = -vijand4SnelheidY;
  } else if (Vijand4Y > height) {
      Vijand4Y = height;
      vijand4SnelheidY = -vijand4SnelheidY;
  }
}
}

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  
  // botsing kogel tegen vijand

  // update punten en health

};


/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  
      image(achtergrondImg, 0, 0, 1280, 720);
      
      // score
      
    fill("white");
  textSize(20);
  text("Score: " + score, 20, 30);
      

  // vijand
  fill("red");
  rect(vijandX - 25, vijandY - 25, 50, 50);
  fill("black");
  ellipse(vijandX, vijandY, 10, 10);
  image(fireballImg, vijandX - 75, vijandY - 75, 150, 150);
  
   //vijand2
   if (Vijand) {
  fill("red");
  rect(Vijand2X - 25, Vijand2Y - 25, 50, 50);
  fill("black");
  ellipse(Vijand2X, Vijand2Y, 10, 10);
  image(fireballImg, Vijand2X - 75, Vijand2Y - 75, 150, 150);
}
//vijand3
   if (Vijand3) {
  fill("red");
  rect(Vijand3X - 25, Vijand3Y - 25, 50, 50);
  fill("black");
  ellipse(Vijand3X, Vijand3Y, 10, 10);
  image(fireballImg, Vijand3X - 75, Vijand3Y - 75, 150, 150);
}
//vijand4
   if (Vijand4) {
  fill("red");
  rect(Vijand4X - 25, Vijand4Y - 25, 50, 50);
  fill("black");
  ellipse(Vijand4X, Vijand4Y, 10, 10);
  image(fireballImg, Vijand4X - 75, Vijand4Y - 75, 150, 150);
}
  // kogel

  // speler

  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);
  image(ridderImg, spelerX - 50, spelerY - 50, 100, 100);

  // punten en health
};

 var checkGameOver = function() {
  // Vijand 1
  if (
    spelerX - vijandX < 50 &&
    spelerX - vijandX > -50 &&
    spelerY - vijandY < 50 &&
    spelerY - vijandY > -50
  ) {
    aantal++;
    console.log("botsing " + aantal);
    return true;
  }

  // Vijand 2 – alleen checken als hij actief is
  if (Vijand) {
    if (
      spelerX - Vijand2X < 50 &&
      spelerX - Vijand2X > -50 &&
      spelerY - Vijand2Y < 50 &&
      spelerY - Vijand2Y > -50
    ) {
      aantal++;
      console.log("botsing " + aantal);
      return true;
    }
  }

  // Vijand 3 – ook alleen checken als hij actief is
  if (Vijand3) {
    if (
      spelerX - Vijand3X < 50 &&
      spelerX - Vijand3X > -50 &&
      spelerY - Vijand3Y < 50 &&
      spelerY - Vijand3Y > -50
    ) {
      aantal++;
      console.log("botsing " + aantal);
      return true;
    }
  }
   // Vijand 4 – ook alleen checken als hij actief is
  if (Vijand4) {
    if (
      spelerX - Vijand4X < 50 &&
      spelerX - Vijand4X > -50 &&
      spelerY - Vijand4Y < 50 &&
      spelerY - Vijand4Y > -50
    ) {
      aantal++;
      console.log("botsing " + aantal);
      return true;
    }
  }

  return false;
};



/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function preload() {
  fireballImg = loadImage('fireball.png');
  ridderImg = loadImage('ridder.png');
   achtergrondMuziek = loadSound('achtergrondMuziek.mp3');
   achtergrondImg = loadImage('achtergrondImg.jpg');
}


function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
 vijandSnelheidX = random(-20, 20) ;
vijandSnelheidY = random (-20, 20);
vijand2SnelheidX = random(-20, 20);
vijand2SnelheidY = random(-20, 20);
vijand3SnelheidX = random(-20, 20);
vijand3SnelheidY = random(-20, 20);
vijand4SnelheidX = random(-20, 20);
vijand4SnelheidY = random(-20, 20);

achtergrondMuziek.loop();
}
function keyPressed() {
  if (!achtergrondMuziek.isPlaying()) {
    achtergrondMuziek.loop();
  }
}
function resetSpel() {
  score = 0;
  tijdScore = millis();
  spelerX = 600;
  spelerY = 600;
  health = 100;
  spelerSnelheid = 20;
  vorigeScoreCheckpoint = 0;
  vijandX = 600;
  vijandY = 500;
  Vijand2X = 300;
  Vijand2Y = 300;
  Vijand = false;
  vijandSnelheidX = random(-20, 20);
  vijandSnelheidY = random(-20, 20);
  vijand2SnelheidX = random(-20, 20);
  vijand2SnelheidY = random(-20, 20);
  vijand3SnelheidX = random(-20, 20);
  vijand3SnelheidY = random(-20, 20);
  Vijand3 = false;
  vijand4SnelheidX = random(-20, 20);
  vijand4SnelheidY = random(-20, 20);
  Vijand4 = false;
}
/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */

function draw() {
  // Teken eerst altijd de achtergrond, zodat het scherm wordt gewist
  background(achtergrondImg);

  // 1. Als je aan het spelen bent
  if (spelStatus === SPELEN) {
    // Score updaten elke seconde
    if (millis() - tijdScore > 1000) {
      score += 10;
      tijdScore = millis();
    }
     // Verlaag snelheid elke 100 punten, maar maar 1x per checkpoint
if (score >= vorigeScoreCheckpoint + 100) {
  spelerSnelheid = max(1, spelerSnelheid - 2); // snelheid mag niet lager dan 1
  vorigeScoreCheckpoint += 100;
  
}
  if (score >= 50 ){
      Vijand = true;
    }
    if (score >= 150 ){
      Vijand3 = true;
    }
    if (score >= 275 ){
      Vijand4 = true;
    }
    beweegAlles();
    verwerkBotsing();
    tekenAlles();

    // Check of het game over is
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
      console.log("Spel is afgelopen!");
    }
  }
  // 2. Als het spel voorbij is
  else if (spelStatus === GAMEOVER) {
  textSize(20);
  fill("white");
  text("GAME OVER, DRUK ENTER OM OPNIEUW TE SPELEN", 100, 100);

  if (keyIsDown(13)) { // ENTER
    resetSpel();        // alles opnieuw instellen
    spelStatus = SPELEN;
  }
}
  // 3. Uitleg scherm
 else if (spelStatus === UITLEG && !uitlegAlGetoond) {
  fill("green");
  rect(0, 0, width, height);
  fill("white");
  textSize(20);
  text("UITLEG: Gebruik de arrow keys om te bewegen. Elke 100 score wordt je langzamer.", 100, 100);
  text("Hoe langer je speelt, hoe meer fireballs erbij komen. Probeer te overleven zo lang je kan", 100, 150);
  text("Druk op ENTER om de spel te starten", 100, 200);

   if (keyIsDown(13)) { // ENTER ingedrukt
    uitlegAlGetoond = true;
    resetSpel();        // alles resetten
    spelStatus = SPELEN;
  }

    
  }
} 