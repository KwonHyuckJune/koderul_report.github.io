
const body = document.querySelector('body');

function randomNum(){
    return Math.floor(Math.random() * 3);
}

function changeImages(num){
    const image = new Image();
    image.src = `images/${num}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);
}

function randomImageInit(){
    const num = randomNum() + 1;
    changeImages(num);
}

randomImageInit();