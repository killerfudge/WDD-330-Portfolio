export default {
    writeToLS(key, data) {
        localStorage.setItem(key, data);
    },
    readFromLS(key) {
        let reader = localStorage.getItem(key);
        let array = JSON.parse(reader);
        return array;
    }
}