
const toDoForm = document.querySelector('#js-toDoForm');
const inputToDo = document.querySelector('#inputToDo');
const divToDo = document.querySelector('.js-toDoList');
let arrToDoList = [];
let maxID = 0;

function handletoDoList(event){
    console.log(event);
    event.preventDefault();
    const txtToDo = inputToDo.value;

    if(txtToDo.trim() !== ''){
        saveToDoList(txtToDo);
        inputToDo.value = '';
    }
    else{
        alert('what your to do?');
    }
}

function deleteToDo(){
    const deleteItem = this.parentNode;

    const newList = arrToDoList.filter(function(v){
        return parseInt(v.id) !== parseInt(deleteItem.id);
    });

    localStorage.setItem('toDoList', JSON.stringify(newList));
    arrToDoList = newList;
    deleteItem.remove();
}

function saveToDoList(toDo){
    const newID = parseInt(maxID) + 1;
    const newList = arrToDoList;

    newList.push({
        id: newID,
        value: toDo,
        class: ''
    });
    console.log(newList);
    maxID = newID;
    localStorage.setItem('maxID', newID);
    localStorage.setItem('toDoList', JSON.stringify(newList));

    divToDo.appendChild(drawToDo(toDo, newID, ''));
}

function clearToDo(){
    const classID = this.parentNode.id;
    const newList = arrToDoList;
    this.classList.toggle('backGreen');

    if(this.classList.contains('backGreen')){
        newList.forEach(function(v){
            if(parseInt(v.id) === parseInt(classID)){
                v.class = 'backGreen';
            }
        });
    }
    else{
        newList.forEach(function(v){
            if(parseInt(v.id) === parseInt(classID)){
                v.class = '';
            }
        });
    }

    localStorage.setItem('toDoList', JSON.stringify(newList));
}

function drawToDo(toDo, ID, clearClass){
    const liTag = document.createElement('li');
    const btnDel = document.createElement('button');
     const btnClear = document.createElement('button');

    liTag.innerText = `${toDo}`;
    liTag.id = ID;
    btnDel.innerText = 'del';
    btnDel.classList.add('btnDel');
    btnDel.addEventListener('click', deleteToDo);
    btnClear.innerText = 'clear';
    btnClear.classList.add('btnClear');
    if(clearClass !== ''){
        btnClear.classList.add(clearClass);
    }
    btnClear.addEventListener('click', clearToDo);

    liTag.append(btnDel);
    liTag.append(btnClear);

    return liTag;
}

function toDoListInit(){
    const toDoList = localStorage.getItem('toDoList');
    const savedId = localStorage.getItem('maxID');
    if(savedId !== null){
        maxID = savedId;
    }

    if(toDoList !== null){
        arrToDoList = JSON.parse(toDoList);

        for (const list of arrToDoList) {
            divToDo.appendChild(drawToDo(list.value, list.id, list.class));
        }
    }
}

toDoListInit();

toDoForm.addEventListener('submit', handletoDoList);