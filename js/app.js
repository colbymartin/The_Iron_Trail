let functions = require ('./functions');

/**
 * 1. on load, show only wagon choices
 * 2. once a wagon is clicked, run create wagon, remove the wagon choice view, reveal 4 add traveler options
 * 3. allow user to add names and select roles. When they have done so and clicked "To the Trail", 
 *  run functions to create travs and display, along with status bar. 
 * 4. In game view, user can click eat and hunt to run those functions for individual travs, and upadate the DOM on click
 * 5. 'sleep' button advances the day
 */
function loadTravelerInputs () {
    let travInputTemplate = document.querySelector('#makeTrav-template').innerHTML;
    let parent = document.querySelector('.addTravs');
    let container = document.createElement('div');

    container.innerHTML = Mustache.render(travInputTemplate);
    parent.appendChild(container);
};

function GameWagon (wagoninput) {
    let statusBarTemplate = document.querySelector('#statusbar-template').innerHTML;
    let parent = document.querySelector('.GameView');
    let statBar = document.createElement('ul');
    statBar.innerHTML = Mustache.render(statusBarTemplate, {
        day: wagoninput.day,
        health: function () {
            let healthy = 0;
            for (let i = 0; i < wagoninput.passengers.length; i++) {
                if (wagoninput.passengers[i].sick === false){
                    healthy++;
                }
            }
            return healthy;
        },
        number: wagoninput.passengers.length,
        food: wagoninput.food,
        ammo: wagoninput.ammo,
        miles: wagoninput.milestraveled,
    });
    parent.appendChild(statBar);
    let travTemplate = document.querySelector('#traveler-template').innerHTML;
    for (let i = 0; i < wagoninput.passengers.length; i++) {
        let travList = document.createElement('div');
        travList.innerHTML = Mustache.render(travTemplate, {
            name: wagoninput.passengers[i].name,
            role: wagoninput.passengers[i].role,
        });
        parent.appendChild(travList);
    }
    
}
window.addEventListener('load', function () {
    let wagon = null;
    let travs = [];
    let wagonLight = document.querySelector('.wagonLight');
    wagonLight.addEventListener('click', function () {
        wagon = new functions.WagonLight(5);
        console.log(wagon);
        let wagonSelect = document.querySelector('.wagonSelect');
        wagonSelect.classList.add('hide');
        let roleSelect = document.querySelector('.addTravs');
        roleSelect.classList.remove('hide');
        for (let i = 0; i < 5; i++) {
                loadTravelerInputs();
            };
    });
    let wagonHeavy = document.querySelector('.wagonHeavy');
    wagonHeavy.addEventListener('click', function () {
        wagon = new functions.WagonHeavy(5);
        console.log(wagon);
        let wagonSelect = document.querySelector('.wagonSelect');
        wagonSelect.classList.add('hide');
        let roleSelect = document.querySelector('.addTravs');
        roleSelect.classList.remove('hide');
        for (let i = 0; i < 5; i++) {
                loadTravelerInputs();
            };
    });
    let beginBtn = document.querySelector('.beginBtn');
    beginBtn.addEventListener('click', function () {
        let roleSelector = document.querySelectorAll('select');
        let inputSelector = document.querySelectorAll('input');
        for (let i = 0; i < roleSelector.length; i++) {
            if (roleSelector[i].value === 'Hunter') {
                travs.push(new functions.Hunter(inputSelector[i].value));
            };
            if (roleSelector[i].value === 'Gunsmith') {
                travs.push(new functions.Gunsmith(inputSelector[i].value));
            };
            if (roleSelector[i].value === 'Monk') {
                travs.push(new functions.Monk(inputSelector[i].value));
            };
            if (roleSelector[i].value === 'Doctor') {
                travs.push(new functions.Doctor(inputSelector[i].value));
            };
        };
        for (let i = 0; i < travs.length; i++) {
            wagon.join(travs[i]);
        };
        let roleSelect = document.querySelector('.addTravs');
        roleSelect.classList.add('hide');
        GameWagon(wagon);
    });
});