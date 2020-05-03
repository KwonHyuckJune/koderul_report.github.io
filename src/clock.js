
const clock = document.querySelector('.js-clock');

function clockInit(){
    const clockDate = new Date();
    clock.innerHTML = `
        ${clockDate.getHours() < 10 ? '0' + `${clockDate.getHours()}` : `${clockDate.getHours()}`}
        : ${clockDate.getMinutes() < 10 ? '0' + `${clockDate.getMinutes()}` : `${clockDate.getMinutes()}`}
        : ${clockDate.getSeconds() < 10 ? '0' + `${clockDate.getSeconds()}` : `${clockDate.getSeconds()}`}
    `
}

setInterval(clockInit, 1000);

clockInit();