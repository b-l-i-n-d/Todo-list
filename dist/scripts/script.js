const plusBtn = document.getElementById("plusBtn");
const inputText = document.getElementById("inputText");
const inputDesc = document.getElementById("inputDesc");
const submitBtn = document.getElementById("submitBtn");
const saveEditBtn = document.getElementById("saveEditBtn");

const filterAllBtn = document.getElementById("filterAll");
const filterInprogressBtn = document.getElementById("filterInprogress");
const filterTodoBtn = document.getElementById("filterTodo");
const filterCompleteBtn = document.getElementById("filterComplete");

const list = document.getElementById("list");
const listItems = list.getElementsByTagName("li");

plusBtn.addEventListener("click", () => {
    let modalContent = document.querySelectorAll(".modal-content p span");
    let modalFooter = document.querySelectorAll(".modal-content button");

    modalContent[0].classList.remove("hidden");
    modalContent[1].classList.add("hidden");

    modalFooter[0].classList.remove("hidden");
    modalFooter[1].classList.add("hidden");
    document.getElementById("addListForm").reset();
});

submitBtn.addEventListener("click", () => {
    if (inputText.value || inputDesc.value) {
        addToList(inputText.value, inputDesc.value);
        document.getElementById("addListForm").reset();
    }
});

filterAllBtn.addEventListener("click", () => {
    filterAllBtn.classList.add("bg-gray-200");
    filterTodoBtn.classList.remove("bg-gray-200");
    filterInprogressBtn.classList.remove("bg-gray-200");
    filterCompleteBtn.classList.remove("bg-gray-200");
    filterList("all");
});

filterInprogressBtn.addEventListener("click", () => {
    filterAllBtn.classList.remove("bg-gray-200");
    filterTodoBtn.classList.remove("bg-gray-200");
    filterInprogressBtn.classList.add("bg-gray-200");
    filterCompleteBtn.classList.remove("bg-gray-200");
    filterList("inprogress");
});

filterTodoBtn.addEventListener("click", () => {
    filterAllBtn.classList.remove("bg-gray-200");
    filterTodoBtn.classList.add("bg-gray-200");
    filterInprogressBtn.classList.remove("bg-gray-200");
    filterCompleteBtn.classList.remove("bg-gray-200");
    filterList("todo");
});

filterCompleteBtn.addEventListener("click", () => {
    filterAllBtn.classList.remove("bg-gray-200");
    filterTodoBtn.classList.remove("bg-gray-200");
    filterInprogressBtn.classList.remove("bg-gray-200");
    filterCompleteBtn.classList.add("bg-gray-200");
    filterList("complete");
});

addToList = (text, desc) => {
    let node = document.createElement("li");
    node.classList.add("list-container", "todo");

    let listContent = document.createElement("div");
    listContent.classList.add("list-content");

    let titileContent = document.createElement("div");
    titileContent.classList.add("title-content");

    let listTitle = document.createElement("div");
    listTitle.contentEditable = true;
    listTitle.innerHTML = text;

    let dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown-container", "group");
    let dropdownIcon = document.createElement("i");
    dropdownIcon.classList.add("fas", "fa-caret-down");
    let dropdownList = document.createElement("ul");
    dropdownList.classList.add("dropdown-list");
    let editBtn = document.createElement("li");
    editBtn.classList.add("modal-open", "dropdown-listItems");
    editBtn.innerText = "Edit";
    let deleteBtn = document.createElement("li");
    deleteBtn.classList.add("dropdown-listItems");
    deleteBtn.innerText = "Delete";

    dropdownList.append(editBtn, deleteBtn);
    dropdownContainer.append(dropdownIcon, dropdownList);

    titileContent.append(listTitle, dropdownContainer);

    let listDesc = document.createElement("div");
    listDesc.classList.add("list-desc");
    let listDescP = document.createElement("p");
    listDescP.contentEditable = true;
    listDescP.innerHTML = desc;
    listDesc.append(listDescP);

    let listBtns = document.createElement("div");
    listBtns.classList.add("list-btns");

    let listBtnsLeft = document.createElement("div");
    listBtnsLeft.classList.add("space-x-1");

    let todoBtn = document.createElement("button");
    todoBtn.classList.add("todoBtn", "bg-fff9de-600", "rounded-md", "p-1");
    todoBtn.innerHTML = "Todo";

    let inprogressBtn = document.createElement("button");
    inprogressBtn.classList.add(
        "inprogressBtn",
        "bg-d2ceff",
        "rounded-md",
        "p-1"
    );
    inprogressBtn.innerHTML = "In progress";

    let completeBtn = document.createElement("button");
    completeBtn.classList.add("completeBtn", "bg-daf2a6", "rounded-md", "p-1");
    completeBtn.innerHTML = "Complete";

    listBtnsLeft.append(todoBtn, inprogressBtn, completeBtn);

    let listBtnsRight = document.createElement("div");

    let checkBtn = document.createElement("button");
    checkBtn.classList.add("checkBtn");
    let checkBtnIcon = document.createElement("i");
    checkBtnIcon.classList.add("far", "fa-check-square");
    let checkBtnText = document.createElement("span");
    checkBtnText.innerHTML = " Check";

    checkBtn.append(checkBtnIcon, checkBtnText);
    listBtnsRight.append(checkBtn);

    listBtns.append(listBtnsLeft, listBtnsRight);
    listContent.append(titileContent, listDesc, listBtns);
    node.append(listContent);
    list.appendChild(node);

    editEvent(editBtn, node, listTitle, listDescP);
    todoEvent(todoBtn, listContent, node, inprogressBtn, completeBtn);
    checkEvent(checkBtn, node, listContent, inprogressBtn, completeBtn);
    inprogressEvent(inprogressBtn, listContent, node, completeBtn);
    completeEvent(completeBtn, listContent, node, inprogressBtn);
    deleteEvent(deleteBtn, node);
};

editEvent = (editBtn, node, listTitle, listDescP) => {
    editBtn.addEventListener("click", () => {
        toggleModal();
        let modalContent = document.querySelectorAll(".modal-content p span");
        let modalFooter = document.querySelectorAll(".modal-content button");
        let editText = document.getElementById("inputText");
        let editDesc = document.getElementById("inputDesc");

        modalContent[0].classList.add("hidden");
        modalContent[1].classList.remove("hidden");

        modalFooter[0].classList.add("hidden");
        modalFooter[1].classList.remove("hidden");

        editText.value = listTitle.innerText;
        editDesc.value = listDescP.innerText;

        saveEditBtn.addEventListener("click", () => {
            listTitle.replaceWith(editText.value);
            listDescP.replaceWith(editDesc.value);
        });
    });
};

checkEvent = (checkBtn, node, listContent, inprogressBtn, completeBtn) => {
    checkBtn.addEventListener("click", () => {
        if (node.classList.contains("inprogress")) {
            node.classList.remove("inprogress");
            inprogressBtn.classList.remove("bg-d2ceff-600");
            listContent.classList.remove("bg-d2ceff");
        } else {
            node.classList.remove("complete");
            completeBtn.classList.remove("bg-daf2a6-600");
            listContent.classList.remove("bg-daf2a6");
        }
        node.classList.toggle("line-through");
        node.classList.toggle("checked");

        // sortCheckedEvent();
    });
};

deleteEvent = (deleteBtn, node) => {
    deleteBtn.addEventListener("click", () => {
        node.remove();
    });
};

inprogressEvent = (inprogressBtn, listContent, node, completeBtn) => {
    inprogressBtn.addEventListener("click", () => {
        if (node.classList.contains("checked")) {
            node.classList.remove("checked", "line-through");
        } else if (node.classList.contains("complete")) {
            node.classList.remove("complete");
            completeBtn.classList.remove("bg-daf2a6-600");
            listContent.classList.remove("bg-daf2a6");
        } else {
            node.classList.toggle("todo");
        }

        inprogressBtn.classList.toggle("bg-d2ceff-600");
        listContent.classList.toggle("bg-d2ceff");
        node.classList.toggle("inprogress");
    });
};

todoEvent = (todoBtn, listContent, node, inprogressBtn, completeBtn) => {
    todoBtn.addEventListener("click", () => {
        if (node.classList.contains("inprogress")) {
            node.classList.remove("inprogress");
            inprogressBtn.classList.remove("bg-d2ceff-600");
            listContent.classList.remove("bg-d2ceff");
        } else if (node.classList.contains("checked")) {
            node.classList.remove("checked", "line-through");
        } else {
            node.classList.remove("complete");
            completeBtn.classList.remove("bg-daf2a6-600");
            listContent.classList.remove("bg-daf2a6");
        }

        node.classList.add("todo");
    });
};

completeEvent = (completeBtn, listContent, node, inprogressBtn) => {
    completeBtn.addEventListener("click", () => {
        if (node.classList.contains("inprogress")) {
            node.classList.remove("inprogress");
            inprogressBtn.classList.remove("bg-d2ceff-600");
            listContent.classList.remove("bg-d2ceff");
        } else if (node.classList.contains("checked")) {
            node.classList.remove("checked", "line-through");
        } else {
            node.classList.toggle("todo");
        }

        node.classList.toggle("complete");
        listContent.classList.toggle("bg-daf2a6");
        completeBtn.classList.toggle("bg-daf2a6-600");
    });
};

sortCheckedEvent = () => {
    let listItemsArr = [];

    for (let i in listItems) {
        if (listItems[i].nodeType == 1) {
            listItemsArr.push(listItems[i]);
        }
    }

    listItemsArr.sort((b, a) => {
        return a.classList.contains("checked") > b.classList.contains("checked")
            ? 1
            : -1;
    });

    for (let i = listItemsArr.length - 1; i >= 0; i--) {
        list.appendChild(listItemsArr[i]);
    }
};

filterList = (category) => {
    if (category == "all") {
        category = "";
    }

    for (let i = 0; i < listItems.length; i++) {
        addClass(listItems[i], "hidden");

        if (listItems[i].className.indexOf(category) > -1) {
            removeClass(listItems[i], "hidden");
        }
    }
};

addClass = (element, clName) => {
    let classArray = element.className.split(" ");
    let classArray2 = clName.split(" ");

    for (let i = 0; i < classArray2.length; i++) {
        if (classArray.indexOf(classArray2[i]) == -1) {
            element.className += " " + classArray2[i];
        }
    }
};

removeClass = (element, clName) => {
    let classArray = element.className.split(" ");
    let classArray2 = clName.split(" ");

    for (let i = 0; i < classArray2.length; i++) {
        while (classArray.indexOf(classArray2[i]) > -1) {
            classArray.splice(classArray.indexOf(classArray2[i]), 1);
        }
    }

    element.className = classArray.join(" ");
};

// modal

var openmodal = document.querySelectorAll(".modal-open");
for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener("click", function (event) {
        event.preventDefault();
        toggleModal();
    });
}

const overlay = document.querySelector(".modal-overlay");
overlay.addEventListener("click", toggleModal);

var closemodal = document.querySelectorAll(".modal-close");
for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener("click", toggleModal);
}

document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
        isEscape = evt.keyCode === 27;
    }
    if (isEscape && document.body.classList.contains("modal-active")) {
        toggleModal();
    }
};

function toggleModal() {
    const body = document.querySelector("body");
    const modal = document.querySelector(".modal");
    modal.classList.toggle("opacity-0");
    modal.classList.toggle("pointer-events-none");
    body.classList.toggle("modal-active");
}
