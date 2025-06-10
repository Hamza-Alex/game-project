/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

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

var vijandSnelheidY;
var vijandSnelheidX;
var vijandX = 1000;
var vijandY = 100;

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

var levens = 3;
var hartImg;

var invulTime = 0;
 
var fireballImg;
var ridderImg;

var achtergrondMuziek;

var ScoreGeluid;
var HartjeMinder;
var GameOver;

// powerUps en Buffs
var powerUpX, powerUpY;
var powerUpActief = false;
var huidigeBuff = "";
var buffWachten = false;
var buffWachtStartTijd = 0;
var buffStartTijd = 0;
var laatstePowerUpScore = 0;
var powerUpCooldownStartScore = 0;  // score waarbij de cooldown begon
var powerUpCooldownActief = false;  // of de cooldown actief is
var volgendeBuff = "schild";

var achtergrondImg;

var score = 0;
var tijdScore = 0;

var powerUpSnelheidImg;
var powerUpRegenImg;
var powerUpSchildImg;

var rennenGeluid;
var schildGeluid;
var regeneratieGeluid;

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
 
  // vijand 1
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
  // speler pakt buff op
  if (powerUpActief && 
    abs(spelerX - powerUpX) < 50 &&
    abs(spelerY - powerUpY) < 50){
      
      powerUpActief = false;
      powerUpCooldownActief = true;
      powerUpCooldownStartTijd = millis();

      // cooldown begint vanaf het moment dat je de powerUp opraakt/oppakt
      powerUpCooldownActief = true;
      powerUpCooldownStartScore = score;

      var keuze = int(random(0, 3)); // kies 0, 1 of 2

      if (keuze === 0) {
          huidigeBuff = "schild"
          buffStartTijd = millis();
          schildGeluid.play();
      } 

      if (keuze === 1) {
        huidigeBuff = "snelheid"
        buffStartTijd = millis();
        spelerSnelheid = spelerSnelheid + 5;
        rennenGeluid.play();
      }

      if (keuze === 2 && levens < 3){
        huidigeBuff = "regeneratie"
        levens = levens +1;
        regeneratieGeluid.play();
      }

      buffWachten = true;
      buffWachtStartTijd = millis();
  }
  
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


      if (levens >= 1) {
  image(hartImg, width - 40, 20, 30, 30);
}
if (levens >= 2) {
  image(hartImg, width - 80, 20, 30, 30);
}
if (levens >= 3) {
  image(hartImg, width - 120, 20, 30, 30);
}

//powerUps actief

if (powerUpActief) {
  if (volgendeBuff === "schild") {
    image(powerUpSchildImg, powerUpX - 25, powerUpY - 25, 50, 50);
  } else if (volgendeBuff === "snelheid") {
    image(powerUpSnelheidImg, powerUpX - 25, powerUpY - 25, 50, 50);
  } else if (volgendeBuff === "regeneratie") {
    image(powerUpRegenImg, powerUpX - 25, powerUpY - 25, 50, 50);
  }
}
      
//Visueel schild effect
if (huidigeBuff === "schild" && millis() - buffStartTijd < 5000){
  noFill();
  stroke("cyan");
  strokeWeight(4);
  ellipse(spelerX, spelerY, 80, 80); // dit is de schild om de speler heen
  noStroke();
}

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

// Speler wordt half transparant als hij onkwetsbaar is
if (millis() - invulTime < 1000) {
  // knipper: alleen tonen als %400 > 200
  if ((millis() % 400) > 200) {
    tint(255, 120); // half transparant
    image(ridderImg, spelerX - 50, spelerY - 50, 100, 100);
    noTint(); // reset tint na tekenen
  }
} else {
  noTint();
  image(ridderImg, spelerX - 50, spelerY - 50, 100, 100);
}
};

  // punten en health
   function delayRestart() {
  invulTime = millis(); // Start timer na botsing
}
 var checkGameOver = function() {

  if (millis() - invulTime < 1000) {
    return false; // even onkwetsbaar
  }

  let botsing = false;

  if (
    abs(spelerX - vijandX) < 50 &&
    abs(spelerY - vijandY) < 50
  ) {
    botsing = true;
  }

  if (Vijand && abs(spelerX - Vijand2X) < 50 && abs(spelerY - Vijand2Y) < 50) {
    botsing = true;
  }
// Vijand 3
  if (Vijand3 && abs(spelerX - Vijand3X) < 50 && abs(spelerY - Vijand3Y) < 50) {
    botsing = true;
  }
  
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

  if (botsing) {
    if (huidigeBuff === "schild" && millis() - buffStartTijd < 5000) {
      // Beschermd door schild, geen leven verliezen
      console.log("Botsing, maar beschermd door schild! Levens blijven:" + levens );
    } else {
      levens--;
      HartjeMinder.play();
      delayRestart(); // korte pauze na botsing
    }
  }
  
  
  return levens <= 0; // Game over als levens 0 zijn
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
  GameOver = loadSound('GameOver.mp3');
  fireballImg = loadImage('fireball.png');
  ridderImg = loadImage('ridder.png');
  ScoreGeluid = loadSound('ScoreGeluid.mp3');
  HartjeMinder = loadSound('HartjeMinder.mp3');
  achtergrondMuziek = loadSound('achtergrondMuziek.mp3');
  achtergrondImg = loadImage('achtergrondImg.jpg');
  hartImg = loadImage('hart.png');
  powerUpSnelheidImg = loadImage('schoenen.png');
  powerUpRegenImg = loadImage('appel.png');
  powerUpSchildImg = loadImage('schild.png');
  rennenGeluid = loadSound('rennen.mp3');
  schildGeluid = loadSound('schild.mp3');
  regeneratieGeluid = loadSound('regeneratie.mp3');
}


function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
background('blue');
powerUpX = random(100, width -100);
powerUpY = random(100, height -100);
powerUpActief = true;
vijandSnelheidX = random(-20, 20);
vijandSnelheidY = random(-20, 20);
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
      if (huidigeBuff === "snelheid" && millis() - buffStartTijd > 3000){
        spelerSnelheid = 10; // terug naar oude/normale snelheid
        huidigeBuff = "";
      }

    // Score updaten elke seconde
    if (millis() - tijdScore > 1000) {
      score +=50;
      tijdScore = millis();
    }



     // Verlaag snelheid elke 100 punten, maar maar 0,5x per checkpoint
if (score >= vorigeScoreCheckpoint + 100) {
  spelerSnelheid = max(1, spelerSnelheid - 2); // snelheid mag niet lager dan 1
  vorigeScoreCheckpoint += 100;
   ScoreGeluid.play();
}
  if (score >= 100 ){
      Vijand = true;
    }
    if (score >= 250 ){
      Vijand3 = true;
    }

    if (score >= 400 ){
      Vijand4 = true;
    }

    beweegAlles();
    verwerkBotsing();
    tekenAlles();

// Power-up opnieuw activeren na 5 seconden cooldown
if (powerUpCooldownActief && millis() - powerUpCooldownStartTijd > 5000) {
  powerUpX = random(100, width - 100);
  powerUpY = random(100, height - 100);
  powerUpActief = true;
  powerUpCooldownActief = false;
  // Kies random buff
  var keuze = int(random(0, 3));
  if (keuze === 0) volgendeBuff = "schild";
  if (keuze === 1) volgendeBuff = "snelheid";
  if (keuze === 2) volgendeBuff = "regeneratie";
}

    // Check of het game over is
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
      GameOver.play();
      console.log("Spel is afgelopen!");
    }
  }
  // 2. Als het spel voorbij is
  else if (spelStatus === GAMEOVER) {
    textSize(20);
    fill("white");
    text("GAME OVER, DRUK SPATIE VOOR START", 100, 100);

    if (keyIsDown(32)) { // 32 is spatie
      spelStatus = UITLEG;
    
      // Reset beginwaarden
      score = 0;
      levens = 3;
      tijdScore = millis();
      spelerX = 200;
      spelerY = 600;
      health = 100;
      vijandX = 1000;
      vijandY = 100;
      Vijand2X = 300;
      Vijand2Y = 300;
      Vijand = false;
      vijandSnelheidX = random(-20, 20);
      vijandSnelheidY = random(-20, 20);
      vijand2SnelheidX = random(-20, 20)
      vijand2SnelheidY = random(-20, 20);
      vijand3SnelheidX = random(-20, 20)
      vijand3SnelheidY = random(-20, 20);
      Vijand3 = false;
      vijand4SnelheidX = random(-20, 20);
      vijand4SnelheidY = random(-20, 20);
      Vijand4 = false;
      spelerSnelheid = 20;
      // Buff uiterlijk resetten:
      var keuze = int(random(0, 3));
      if (keuze === 0) volgendeBuff = "schild";
      if (keuze === 1) volgendeBuff = "snelheid";
      if (keuze === 2) volgendeBuff = "regeneratie";
    }
}
  // 3. Uitleg scherm
  else if (spelStatus === UITLEG) {
    fill("green");
    rect(0, 0, width, height);
    fill("white");
    textSize(20);
    text("UITLEG: Gebruik arrow keys om te bewegen, Druk op Enter voor start", 100, 100);

    if (keyIsDown(13)) { // 13 is enter
      spelerX = 400;
      spelStatus = SPELEN;
    }
  }

  // Schild power-up verloopt na 5 seconden
  if (huidigeBuff === "schild" && millis() - buffStartTijd > 5000) {
    huidigeBuff = "";
  }
}
