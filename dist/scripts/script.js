const inputText = document.getElementById('inputText');
const inputDesc = document.getElementById('inputDesc');
const submitBtn = document.getElementById('submitBtn');
const sortInprogressBtn = document.getElementById('sortInprogress');
const list = document.getElementById('list');
const listItems = list.childNodes;

submitBtn.addEventListener('click', () => {
    if (inputText.value || inputDesc.value) {
        addToList(inputText.value, inputDesc.value);
    }
});

sortInprogressBtn.addEventListener('click', () => {
    sortInprogressEvent();
});

addToList = (text, desc) => {
    let node = document.createElement('li');

    let textNode = document.createElement('h3');
    textNode.className = 'inline';
    textNode.contentEditable = true;
    textNode.innerHTML = text;

    let textNodeDesc = document.createElement('p');
    textNodeDesc.className = 'inline';
    textNodeDesc.contentEditable = true;
    textNodeDesc.innerHTML = desc;

    let inprogressBtn = document.createElement('button');
    inprogressBtn.className = 'inprogressBtn';
    inprogressBtn.innerHTML = 'In progress';

    let checkBtn = document.createElement('button');
    checkBtn.className = 'checkBtn';
    checkBtn.innerHTML = 'Check';

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerHTML = 'Delete';

    node.append(textNode, textNodeDesc, checkBtn, inprogressBtn, deleteBtn);
    list.appendChild(node);

    checkEvent(checkBtn, node, textNode, textNodeDesc);
    inprogressEvent(inprogressBtn, textNode, textNodeDesc, node);
    deleteEvent(deleteBtn, node);
}

checkEvent = (checkBtn, node, textNode, textNodeDesc) => {  
    checkBtn.addEventListener('click', () => {
        node.classList.toggle('line-through');
        node.classList.toggle('checked');
        textNode.classList.remove('text-3xl');
        textNodeDesc.classList.remove('text-3xl');

        sortCheckedEvent();
    })
}

deleteEvent = (deleteBtn, node) => {
    deleteBtn.addEventListener('click', () => {
        node.remove();
    })
}

inprogressEvent = (inprogressBtn, textNode, textNodeDesc, node) => {
    inprogressBtn.addEventListener('click', () => {
        textNode.classList.toggle('text-3xl');
        textNodeDesc.classList.toggle('text-3xl');
        node.classList.toggle('inprogress');
        node.classList.remove('checked','line-through');
    })
}

sortCheckedEvent = () => {
    let listItemsArr = [];

    for (let i in listItems) {
        if (listItems[i].nodeType == 1) {
            listItemsArr.push(listItems[i]);
        }
    }

    listItemsArr.sort((a, b) => {
        return a.classList.contains('checked') > b.classList.contains('checked') ? 1 : -1;
    });

    for (let i = listItemsArr.length - 1 ; i >= 0; i--) {
        list.appendChild(listItemsArr[i])
    }

}

sortInprogressEvent = () => {
    let listItemsArr = [];

    for (let i in listItems) {
        if (listItems[i].nodeType == 1) {
            listItemsArr.push(listItems[i]);
        }
    }

    listItemsArr.sort((a, b) => {
        return a.classList.contains('inprogress') > b.classList.contains('inprogress') ? 1 : -1;
    });

    for (let i = listItemsArr.length - 1 ; i >= 0; i--) {
        list.appendChild(listItemsArr[i])
    }

}