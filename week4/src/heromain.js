const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);

//access password field
hero.realName = form.realName.value;

function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = form.heroName.value; // create a name property based on the input field's value
    hero.age = form.age.value; // create an age property from a number type field
    hero.city = form.city.value; // create a city property from a selection
    hero.powers = []; // create an array of the hero's powers from the checkboxes
    hero.category = form.category.value; // create a category property from the radio buttons
    hero.origin = form.origin.value; // create origin property from a text area
    for (let i=0; i < form.powers.length; i++) {
        if (form.powers[i].checked) {
            hero.powers.push(form.powers[i].value);
        }
    }
    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}

form.addEventListener('submit',validate,false);
function validate(event) {
    const firstLetter = form.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');
    }
}

const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

form.heroName.addEventListener('keyup', validateInline, false);
function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')){
    error.style.display = 'block';
    } else {
    error.style.display = 'none';
    }
}