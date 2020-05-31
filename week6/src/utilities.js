export default {
    Constructor(){
    },
    onTouch(elementSelector, callback) {
        const element = document.getElementById(elementSelector);
        element.addEventListener('click', () => callback(), false);
    },
    remove(classSelector, callback) {
        const group = document.getElementsByClassName(classSelector);
        for(let i = 0; i < group.length; i++) {
            group[i].addEventListener('click', () => callback(), false);
        }
    }
}