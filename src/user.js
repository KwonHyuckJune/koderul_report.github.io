
const userForm = document.querySelector('#js-user');
const inputUser = document.querySelector('#inputUser');

function handleUser(event){
    event.preventDefault();
    const userName = inputUser.value;

    if(userName.trim() === ''){
        alert('what your name?');
    }
    else{
        saveUser(userName);
    }
}

function saveUser(userName){
    localStorage.setItem('userName', userName);
    UserInit();
}

function getUser(){
    return localStorage.getItem('userName');
}

function UserInit(){
    const user = getUser();

    if(user !== null){
        userForm.innerHTML = `
            <h2>Hello! ${user}</h2>
        `
    }
}

userForm.addEventListener('submit', handleUser);

UserInit();