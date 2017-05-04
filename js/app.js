let functions = require ('./functions');

/**
 * 1. on load, show only wagon choices
 * 2. once a wagon is clicked, run create wagon, remove the wagon choice view, reveal 4 add traveler options
 * 3. allow user to add names and select roles. When they have done so and clicked "To the Trail", 
 *  run functions to create travs and display, along with status bar. 
 * 4. In game view, user can click eat and hunt to run those functions for individual travs, and upadate the DOM on click
 * 5. 'sleep' button advances the day
 */


window.addEventListener('load', function () {

    let wagonLight = document.querySelector('.wagonLight');
    wagonLight.addEventListener('click', function () {
        functions.wagonLight.prototype
    });
});