const inputText = document.getElementById('inputText');
const submitBtn = document.getElementById('submitBtn');
const list = document.getElementById('list');
const listItems = list.getElementsByTagName('li');
console.log("🚀 ~ file: script.js ~ line 5 ~ listItems", listItems)

submitBtn.addEventListener('click', () => {
    if (inputText.value) {
        console.log("🚀 ~ file: script.js ~ line 6 ~ submitBtn.addEventListener ~ inputText.innerHTML", inputText.value);
        addToList(inputText.value);
    }
})

addToList = (text) => {
    let node = document.createElement('li');
    let textNode = document.createTextNode(text);

    let checkBtn = document.createElement('button');
    checkBtn.className = 'checkBtn';
    checkBtn.innerHTML = 'Check';

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerHTML = 'Delete';

    node.append(checkBtn, textNode, deleteBtn)
    list.appendChild(node);

    checkEvent(checkBtn, node);
    deleteEvent(deleteBtn, node);
}

checkEvent = (object, object2) => {  
    object.addEventListener('click', () => {
        object2.classList.toggle('line-through');
    })
}

deleteEvent = (object, object2) => {
    object.addEventListener('click', () => {
        object2.remove();
    })
}