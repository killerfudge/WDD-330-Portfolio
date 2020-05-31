import utilities from './utilities.js';
import ls from './ls.js';
// Create the export class
export default class Todos {
    /*Create Constructor that takes elementId of the list that hold the tasks, and the key used to read/write from
    local storage*/
    constructor(elementId, key) {
        this.list = document.getElementById(elementId);
        this.storageKey = key;
    }
    //function that retrieves the information for the new item and passes it to saveTodo
    addTodo() {
        let element = document.getElementById('add text');
        let text = element.value;
        saveTodo(text, 'stuff');
        renderTodoList(todoList, list);
    }
    //function that removes an item from the list
    static removeTodo() {
        console.log("remove");
        const caller = event.target;  //retrieves the button pushed
        const parent = caller.parentNode;  //retrieves with li element the button pushed is in
        const children = parent.childNodes;  //retrieves a collection of all the child nodes within that li
        let spot;  //variable to hold the index that we need to remove
        let count = 0;  // variable used to count through the indexes of todoList
        for(let i = 0; i < children.length; i++) {   //loop through the child nodes to find the <p> node
            if(children[i].nodeName === 'P') {
                todoList.forEach(index => {  //loop through todoList to find the index that matches the info in the <p> node
                    if(children[i].innerHTML === index.content) {
                        spot = count;  //save the location of the item
                    }
                    count++;
                })
            }
        }
        todoList.splice(spot, 1);  //remove the item from the array
        renderTodoList(todoList, parent.parentNode);
    }
    //function to mark an item as completed
    static completeTodo() {
        const marker = event.target;  //retrieve the box checked
        const parent = marker.parentNode;  //retrieve the li element the box is in
        const children = parent.childNodes;  //retrieve a collection of the child nodes within that li
        for(let i = 0; i < children.length; i++) {  //loop through to find the p element
            if(children[i].nodeName === 'P') {
                children[i].class = 'completed';
            }
        }
    }
    //list our array
    listTodos() {
        ls.readFromLS(this.storageKey);
        renderTodoList(todoList, list);
    }
    //function to filter list
    static filterTodos() {
        //variable to count number of items in list
        let count = 0;
        if(event.target === document.getElementById('all')) {
            todoList.forEach(index => {
                if(!index.completed) {
                    count++;
                }
            })
            //display filtered list
            renderTodoList(todoList, list);
            //display the number of items in the footer
            const item = document.getElementById("total")
            item.innerHTML = `${count} tasks left`;
            alert(item);
        } else if(event.target === document.getElementById('active')) {
            let tempList = null;
            todoList.forEach(index => {
                if(!index.completed) {
                    tempList.push(index);
                    count++;
                }
            })
            //display filtered list
            renderTodoList(tempList, list);
            //display the number of items in the footer
            document.getElementById("footer").innerHTML = `${count} tasks left`;
        } else if(event.target === document.getElementById('completed')) {
            let tempList = null;
            todoList.forEach(index => {
                if(index.completed) {
                    tempList.push(index);
                    count++
                }
            })
            //display filtered list
            renderTodoList(tempList, list);
            //display the number of items in the footer
            document.getElementById("footer").innerHTML = `${count} tasks left`;
        }
        alert('what');
        alert('for some reason it resets the page at the end of this function. I have no idea why.')
    }
}

//private variables
let todoList = null;

//private functions
//Create function to add an item to the list and then save the list to local storage
function saveTodo(task, key) {
    let todo = {id : key, content : task, completed : false};
    if (todoList === null) {
        todoList = [todo];
    } else {
        todoList.push(todo);
    }
    ls.writeToLS(key, todoList);
}

//function to pull the list either from the local variable or local storage
function getTodos(key) {
    if (todoList === null) {
        todoList = readFromLS(key);
    }
    return todoList;
}
//display the list of items
function renderTodoList(list, element) {
    //clear out any nodes previously there, to prevent duplication of elements
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
    //loop through list and create each li element
    list.forEach(index => {
        let newElement = document.createElement("li");
        newElement.innerHTML = `
            <input type="checkbox" class="complete">
            <p class="label" class="label">${index.content}</p>
            <button class="remove" type="button">Remove</button>`;
        element.appendChild(newElement);
    })
    //attach an event listener to the created buttons
    utilities.remove('remove', Todos.removeTodo.bind(Todos));
}

utilities.onTouch("add button", Todos.prototype.addTodo);
utilities.onTouch("all", Todos.filterTodos.bind(Todos));
utilities.onTouch("active", Todos.filterTodos.bind(Todos));
utilities.onTouch("completed", Todos.filterTodos.bind(Todos));