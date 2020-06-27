import { getJSON, getLocation } from './utilities.js';
import QuakesController from './quakesController.js';

const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';


console.log(getJSON(baseUrl));
let controller = new QuakesController("#quakeList");
controller.init();

async function buildUrl(baseUrl){
    let myLocation = await getLocation();
    let latitude = myLocation.coords.latitude;
    let longitude = myLocation.coords.longitude;

    let builtUrl = baseUrl + "&latitude=" + latitude + "&longitude=" + longitude + "&maxradiuskm=100"; 
    return builtUrl;
};

let newUrl = buildUrl(baseUrl);
console.log(newUrl);
let test = buildUrl(baseUrl)
.then(function (response) {
    return response.PromiseValue;
});

console.log(test);