import {Errors, makeRequest} from './authHelpers.js';
import Auth from './Auth.js';

let submit = document.getElementById('submit');
let authenticator = new Auth();
const myErrors = new Errors('errors');

submit.addEventListener('click', () => {
    authenticator.login(getPosts)
}, false);

//tester();

async function getPosts() {
  try {
    const data = await makeRequest('posts', 'GET', null, authenticator.jwtToken);
    // make sure the element is shown
    console.log(data);
    var ul = document.getElementById('list');
    ul.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(data[i].title));
      ul.appendChild(li);
    }
    myErrors.clearError();
  } catch (error) {
    // if there were any errors display them
    myErrors.handleError(error);
  }
}

/*
async function tester() {
let hi = await makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
});
console.log(hi);
}*/