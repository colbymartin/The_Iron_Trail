function prob(chance) {
  return chance < (Math.random() * 100);
}

function Wagon() {
   
};

function WagonLight(capacity) {
    this.day = 1;
    this.milestraveled = 0;
    this.distancemult = 3;
    this.capacity = capacity;
    this.food = 100;
    this.ammo = 40;
    this.passengers = [];
    this.load = 250;
};

function WagonHeavy(capacity) {
    this.day = 1;
    this.milestraveled = 0;
    this.distancemult = 1;
    this.capacity = capacity;
    this.food = 100;
    this.ammo = 40;
    this.passengers = [];
    this.load = 600;
};

Wagon.prototype.join = function(trav) {
    if (this.capacity > this.passengers.length) {
        this.passengers.push(trav);
        trav.home = this;
    } else {
        return "Wagon is Full";
    }
    return this;
};

Wagon.prototype.quarantine = function () {
    let anysick = false;
    for (let i = 0; i < this.passengers.length; i++) {
        if (this.passengers[i].sick === true) {
            anysick = true;
        }
    }
    return anysick;
};

Wagon.prototype.ready = function () {
    let alive = 0;
    for (let i = 0; i < this.passengers.length; i++) {
        if (this.passengers[i].alive === true) {
            alive++;
        }
    }
    return alive;
}

Wagon.prototype.healrate = function () {
    let healnumber = 0;
    for (let i = 0; i < this.passengers.length; i++){
        if (this.passengers[i].healpercent > healnumber){
            healnumber = this.passengers[i].healpercent;
        }
    }
    return healnumber;
}

Wagon.prototype.nextDay = function () {
    this.day++;
    this.milestraveled = this.milestraveled + (30 * this.distancemult);
    for (let i = 0; i < this.passengers.length; i++) {
        this.passengers[i].hunger = this.passengers[i].hunger + 10;
        this.passengers[i].eat();
        if (this.passengers[i].smith === true) {
            this.ammo = this.ammo + 1;
        }
        if (this.passengers[i].hunger >= 100) {
            this.passengers[i].alive = false;
        }
        if (this.passengers[i].sick === true) {
            if (prob(this.healrate())) {
                this.passengers[i].sick = false;
            }
        }
    }
    // Below: "If anyone is sick, then every passenger that is not sick has a 15%
    // of becoming sick
    if (this.quarantine()) {
        for (let i = 0; i < this.passengers.length; i++){
            if (this.passengers[i].sick === false && prob(15)) {
                this.passengers[i].sick = true;
            }
        }
    } else {
        for (let i = 0; i < this.passengers.length; i++) {
            if (prob(5)) {
                this.passengers[i].sick = true;
            }
        }
    }
    this.passengers[Math.floor(Math.random() * this.passengers.length)].hunt();
}

function Traveler() {
    
};

function Hunter(name) {
    this.name = name;
    this.home = null;
    this.hunger = 50;
    this.sick = false;
    this.alive = true;
    this.huntprob = 80;
    this.eatmult = 2;
    this.healpercent = 20;
    this.smith = false;

    return this;
};

function Doctor(name) {
    this.name = name;
    this.home = null;
    this.hunger = 50;
    this.sick = false;
    this.alive = true;
    this.huntprob = 60;
    this.eatmult = 3;
    this.healpercent = 50;
    this.smith = false;

    return this;
};

function Gunsmith(name) {
    this.name = name;
    this.home = null;
    this.hunger = 50;
    this.sick = false;
    this.alive = true;
    this.huntprob = 60;
    this.eatmult = 1;
    this.healpercent = 20;
    this.smith = true;

    return this;
};

function Monk(name) {
    this.name = name;
    this.home = null;
    this.hunger = 50;
    this.sick = false;
    this.alive = true;
    this.huntprob = 0;
    this.eatmult = .5;
    this.healpercent = 20;
    this.smith = false;

    return this;
};

Traveler.prototype.hunt = function () {
    if (this.home.ammo >= 5) {
            this.home.ammo = this.home.ammo - 5;
            if (prob(this.huntprob)){
            this.home.food = this.home.food + 200;
        }
        if (this.home.food > this.home.load) {
            this.home.food = this.home.load;
        }   
    } 
    return this;
}

Traveler.prototype.eat = function () {
    if (this.sick === false && this.home.food >= (10 * this.eatmult)) {
            this.home.food = this.home.food - (10 * this.eatmult);
            this.hunger = this.hunger - 25;
    };
    if (this.sick === true && this.home.food >= (20 * this.eatmult)) {
            this.home.food = this.home.food - (20 * this.eatmult);
            this.hunger = this.hunger - 25;
    };
    return this;
};

Traveler.prototype.sidekicks = function () {
    if (this.home.passengers.length === 0) {
        return 0;
    } else {
        return this.home.passengers.length - 1;
    }
};

WagonLight.prototype = new Wagon();
WagonHeavy.prototype = new Wagon();

Hunter.prototype = new Traveler();
Doctor.prototype = new Traveler();
Monk.prototype = new Traveler();
Gunsmith.prototype = new Traveler();

let jerry = new Hunter('Jerry');
let elaine = new Doctor('Elaine');
let kramer = new Monk('Kramer');
let george = new Gunsmith('George');


let wagon1 = new WagonLight(7);
let wagon2 = new WagonHeavy(5);

wagon1.join(jerry);
wagon1.join(elaine);
wagon1.join(kramer);
wagon1.join(george);

let mac = new Hunter('Mac');
let frank = new Gunsmith('Frank');
let dee = new Monk('Dee');
let dennis = new Hunter('Dennis');
let charlie = new Monk('Charlie');

wagon2.join(mac);
wagon2.join(frank);
wagon2.join(dee);
wagon2.join(dennis);
wagon2.join(charlie);



function Life1() {
    for (; wagon1.ready() !== 0;) {
        wagon1.nextDay();
    }
    return [wagon1.day, wagon1.milestraveled];
}

function Life2() {
    for (; wagon2.ready() !== 0;) {
        wagon2.nextDay();
    }
    return [wagon2.day, wagon2.milestraveled];
}

console.log(Life1());
console.log(Life2());

module.exports = {
    prob: prob,
    Wagon: Wagon,
    WagonLight: WagonLight,
    WagonHeavy: WagonHeavy,
    Traveler: Traveler,
    Hunter: Hunter,
    Gunsmith: Gunsmith,
    Monk: Monk, 
    Doctor: Doctor,
    Life1: Life1,
    Life2: Life2,
};