const form = document.forms[0];
const input = form.elements.searchInput;
//commented out because they would repeat endlessly
//input.addEventListener('focus', () => alert('focused'), false);
//input.addEventListener('blur', () => alert('blurred'), false);
input.addEventListener('change', () => alert('changed'), false);

//learning about overriding the submit sequence
form.addEventListener ('submit', search, false);
form.addEventListener ('submit', searchEvent, false);
form.addEventListener ('submit', searchThird, false);
function search() {
    alert(' Form Submitted');
}
function searchEvent(event) {
    alert('Form Submitted');
    event.preventDefault();
}
function searchThird(event) {
     alert(`You Searched for: ${input.value}`);
     event.preventDefault();
}

//interacting with text boxes
input.value = 'Search Here';
input.addEventListener('focus', function(){
    if (input.value==='Search Here') {
        input.value = ''
    }
}, false);
input.addEventListener('blur', function(){
    if(input.value === '') {
        input.value = 'Search Here';
    }
}, false);