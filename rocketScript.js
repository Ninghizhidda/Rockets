const endpoint = "https://api.spacexdata.com/v3/rockets"
const rocketsDiv = document.querySelector('#rocketsCanvas');

let c = document.getElementById("rocketsCanvas");
let ctx = c.getContext("2d");
let img = document.getElementById("rocketImg");
let imgTop = document.getElementById("rocketTopImg");
const cw = c.width;
const ch = c.height;
let runningTime = true;
//let drawingID = 1;
const rocketAnim = {
  img: document.getElementById("rocketImg"),
  x: 132,
  y: ch,
  w: 66,
  h: 100,
  dx: 0,
  dy: 1,
  speed: 1,
};

document.addEventListener('DOMContentLoaded', () => {});

//Rocket class
function Rocket(id,fuel1,fuel2) {
  const fuelPerSecond = 1;
  this.id = id;
  this.fuel1 = Math.round(fuel1);
  this.fuel2 = Math.round(fuel2);
  this.fuelLeft = this.fuel1;
  this.stageNumber = 1;
  let stage = 1;

  this.manageStage = function () {
    //console.log("manage stage");
    if (this.stageNumber == 1 && this.fuelLeft <= 0) {
      this.fuelLeft = this.fuel2;
      this.stageNumber = 2;
      stage = 2;
    }
    else if (this.stageNumber == 2 && this.fuelLeft <= 0) {
      this.stageNumber = 3;
      stage = 3;
      succes();
    }
    else {
      this.stageNumber = 3;
      stage = 3;
      succes();
    }
    return this.stageNumber, stage;
  };

  this.draw = function () {
    //console.log(Rocket.stageNumber );
    //console.log(ParentConstructor.prototype.stageNumber);
    //console.log(stage);
    if (runningTime) {
      ctx.clearRect(id * rocketAnim.x, rocketAnim.w, cw, ch);
      if (stage == 2) {
        imgTop = document.getElementById("rocketTopImg");
      }
      if (stage != 3) {
        // change position
        rocketAnim.y -= rocketAnim.dy;
        // Detect top
        if (rocketAnim.y - rocketAnim.h < 0) {
          rocketAnim.dy = 0;
        }
        //console.log("d" + id);
        if (stage == 2) {
          ctx.drawImage(imgTop, id * rocketAnim.x, rocketAnim.y - rocketAnim.h, rocketAnim.w, rocketAnim.h - 33);
        }
        else {
          ctx.drawImage(img, id * rocketAnim.x, rocketAnim.y - rocketAnim.h, rocketAnim.w, rocketAnim.h);
        }
      }
    }
  };

  this.move = function () {
      setInterval( draw, 1000 );
  }
}

let rocketsContainer = { }; // main object

function burnFuel() {
  for (const property in rocketsContainer) {

    if (rocketsContainer[property].fuelLeft > 0) {
      rocketsContainer[property].fuelLeft -= 1;
    }
    else {
      rocketsContainer[property].manageStage();
    }
    //show fuel
    const rocketsDiv = document.querySelector('#showFuel');
    let newRocket = document.createElement("span");
    newRocket.setAttribute("id", `span${property}`);
    document.getElementById("showFuel").appendChild(newRocket);

    //console.log(rocketsContainer[property].fuelLeft);
    document.getElementById(`span${property}`).innerHTML = ` R${rocketsContainer[property].id}: ${rocketsContainer[property].fuelLeft} ` ;
    //rocketsContainer[property].move();
  }
}

function succes() {
  let showSuccesMessage = 0;
  let size = 0;
  for (const property in rocketsContainer) {
    size ++;
    if (rocketsContainer[property].stageNumber == 3) {
      showSuccesMessage ++;
    }
  }
  if (showSuccesMessage == size) {
    //console.log("success");
    document.getElementById("success").classList.remove("toggleDisplay");
  }
}



//fetch api data
fetch('https://api.spacexdata.com/v3/rockets')
.then(res => res.json())//response type
.then(data => {
  console.log(data);
  data.forEach((rocket) => {
    const name = 'rocketID' + rocket.id;
    const rID =  rocket.id;
    console.log(rocket.id);
    rocketsContainer[name]  = new Rocket(rocket.id,rocket.first_stage.fuel_amount_tons,rocket.second_stage.fuel_amount_tons);
    console.log(rocketsContainer[name]);
    //rocketsContainer[name].move();
    setInterval( rocketsContainer[name].draw, 2000 );
    //draw(rID);
  });
});

let burn = setInterval(burnFuel, 1000);

document.getElementById("btn").addEventListener("click", function(){
  if (runningTime) {
    clearInterval(burn);
    runningTime = false;
    document.getElementById("btn").innerHTML = "Start time";
  }
  else {
    burn = setInterval(burnFuel, 1000);
    runningTime = true;
    document.getElementById("btn").innerHTML = "Stop time";
  }
});
