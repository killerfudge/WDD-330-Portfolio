//Initialize variables for functions
let url = 'https://pokeapi.co/api/v2/pokemon/';
let form = document.getElementById("form");
let displayElement = document.getElementById("display");

//event listener to tell when the user has requested a pokemon to display
form.addEventListener('submit', process, false);

//retrieved the requested pokemon and call the display function
async function process() {
    event.preventDefault();
    let searchElement = document.getElementById("request");
    let searchText = searchElement.value;
    if(searchText) {
        url = url + searchText;
    }
    await display(console.log(getJSON(url)));
}

//display the pokemon's information in the display div
function display(pokemon) {
    displayElement.innerHTML = "<p>hi</p>";
}

//retrieve the JSON file from the database
function getJSON(url) {
    return fetch(url)
    .then ( function (response){
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json();
        }

    })
    .catch(function (error){
        console.log(error);
    });
}