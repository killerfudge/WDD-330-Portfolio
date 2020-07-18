//Initialize variables for functions
let form = document.getElementById("form");
let displayElement = document.getElementById("display");

//event listener to tell when the user has requested a pokemon to display
form.addEventListener('submit', process, false);

//retrieved the requested pokemon and call the display function
async function process() {
    event.preventDefault();
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let searchElement = document.getElementById("request");
    let searchText = searchElement.value;
    if(searchText) {
        url = url + searchText;
    }
    let pokemon = await getJSON(url);
    displayElement.innerHTML = '<p>Unable to find pokemon. Please check spelling, and make sure name is not capitalized.';
    if (pokemon === undefined) {
        displayElement.innerHTML = '<p>Unable to find pokemon. Please check spelling, and make sure name is not capitalized.';
    } else {
        let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`;
        let species = await getJSON(speciesUrl);
        console.log(pokemon);
        console.log(species);
        display(pokemon);
    }
}

//display the pokemon's information in the display div
function display(pokemon) {
    displayElement.innerHTML =
        `
            <p>Pokemon: <span id='name'>${pokemon.name}</span></p>
            <span>Types:
        `;
    for(let i = 0; i < pokemon.types.length; i++) {
        displayElement.innerHTML +=
        `<span class="type" id=${pokemon.types[i].type.name}>
            ${pokemon.types[i].type.name}
        </span>`;
    }
    displayElement.innerHTML +=
        `
            </span>
            <p>Height: ${pokemon.height} decimetres</p>
            <p>Weight: ${pokemon.weight} hectograms</p>
            <img src=${pokemon.sprites.front_default}>
            <form>
                <button id='evolve' type='button'>Evolve</button>
                <button id='devolve' type='button'>Devolve</button>
            </form>
        `;
    document.getElementById('evolve').addEventListener('click', evolve, false);
    document.getElementById('devolve').addEventListener('click', devolve, false);
}

//change to the evolution of the current pokemon, and then display it.
async function evolve() {
    let name = document.getElementById('name').innerHTML;
    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;
    let species = await getJSON(speciesUrl);
    let evolution = await getJSON(species.evolution_chain.url);
    console.log(evolution);
    let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let evolved = true;
    let needResponse = false;
    if(evolution.chain.species.name === name && evolution.chain.evolves_to.length === 1) {
        pokemonUrl += `${evolution.chain.evolves_to[0].species.name}`;
    } else if(evolution.chain.evolves_to[0].species.name === name && evolution.chain.evolves_to[0].evolves_to.length !== 0) {
        pokemonUrl += `${evolution.chain.evolves_to[0].evolves_to[0].species.name}`;
    } else if(evolution.chain.species.name === name && evolution.chain.evolves_to.length !== 0) {
        displayElement.innerHTML += '<p>Evolution options: <span>';
        for(let i = 0; i < evolution.chain.evolves_to.length; i++) {
            displayElement.innerHTML += `<button id='${evolution.chain.evolves_to[i].species.name}'>${evolution.chain.evolves_to[i].species.name}</button>`;
        }
        displayElement.innerHTML += '</span></p>'
        for(let i = 0; i < evolution.chain.evolves_to.length; i++) {
            document.getElementById(evolution.chain.evolves_to[i].species.name).addEventListener('click', evolveSelection, false);
        }
        needResponse = true;
    } else {
        pokemonUrl += name;
        evolved = false;
    }
    if(!needResponse) {
        let pokemon = await getJSON(pokemonUrl);
        display(pokemon);
        if(!evolved) {
            displayElement.innerHTML += '<p>Cannot evolve further</p>';
        }
        document.getElementById('evolve').addEventListener('click', evolve, false);
        document.getElementById('devolve').addEventListener('click', devolve, false);
    }
}

//Devolve the pokemon to the previous species
async function devolve() {
    let name = document.getElementById('name').innerHTML;
    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;
    let species = await getJSON(speciesUrl);
    let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let devolved = true;
    if(species.evolves_from_species !== null) {
        pokemonUrl += species.evolves_from_species.name;
    } else {
        pokemonUrl += name;
        devolved = false;
    }
    let pokemon = await getJSON(pokemonUrl);
    display(pokemon);
    if(!devolved) {
        displayElement.innerHTML += '<p>Already at lowest evolution</p>';
    }
    document.getElementById('evolve').addEventListener('click', evolve, false);
    document.getElementById('devolve').addEventListener('click', devolve, false);
}

//handle evolutions for pokemon with more than one
async function evolveSelection() {
    console.log(event.target.innerHTML);
    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${event.target.innerHTML}/`;
    let pokemon = await getJSON(pokemonUrl);
    display(pokemon);
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