import utilities from './utilities.js';
// Create the export class
export default class Todos {
    /*Create Constructor that takes elementId of the list that hold the tasks, and the key used to read/write from
    //local storage*/
    Constructor(elementId, key) {
        this.list = document.getElementById(elementId);
        this.storageKey = key;
    }
    //function that retrieves the information for the new item and passes it to saveTodo
    function addTodo() {
        let text = document.getElementById('add text').getText();
        saveTodo(text, key);
        renderTodoList(todoList, this.list);
    }
    //display the list of items
    function renderTodoList(list, element) {
        todoList.forEach(id => {
            let innerList = document.createElement("li");
            let text = document.createElement("p");
            text.setValue(content);
            innerList.appendChild(text);
            let checkbox = document.createElement("input");
            checkbox.setValue(completed);
            innerList.appendChild(checkbox);
            let button = document.createElement("button");
            button.setClass("remove");
            innerList.appendChild(button);
        })
    }
}

//private variables
let todoList = null;

//private functions
//Create function to add an item to the list and then save the list to local storage
function saveTodo(task, key) {
    let todo = {id : key, content : task, completed : false};
    todoList.add(todo);
    writeToLS(key, todoList);
}

//function to pull the list either from the local variable or local storage
function getTodos(key) {
    if (todoList === null) {
        todoList = readFromLS(key);
    }
    return todoList;
}