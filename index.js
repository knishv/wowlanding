
function timer() {
    const timer = document.querySelector("[data-timer]");
    let date = new Date();
    let targetDate = new Date('2020-10-27T02:00:00');
    let fullDays = (targetDate - date) / (60 * 60 * 1000 * 24);
    let fullHours = (fullDays - Math.floor(fullDays)) * 24;
    let fullMinutes = (fullHours - Math.floor(fullHours)) * 60;
    let fullSeconds = (fullMinutes - Math.floor(fullMinutes)) * 60;
    document.querySelector("[data-timer-days]").innerHTML = Math.floor(fullDays);
    document.querySelector("[data-timer-hours]").innerHTML = Math.floor(fullHours);
    document.querySelector("[data-timer-minutes]").innerHTML = Math.floor(fullMinutes);
    document.querySelector("[data-timer-seconds]").innerHTML = Math.floor(fullSeconds);
}


function getModal() {
    const button = document.querySelector("[data-preorder]");
    const modal = document.querySelector("[data-modal]");
    const close = document.querySelector("[data-modal-close]")
    button.addEventListener("click", function (event) {
        modal.style = "display:flex";
    });
    close.addEventListener("click", function (event) {
        modal.style = "display:none";
    });
}


function getData() {
    const stepFinal = document.querySelector('[data-step="3"]');
    let data = [];
    data.push(localStorage.getItem('step1'), localStorage.getItem('step2'), localStorage.getItem('payment'), localStorage.getItem('payment-info'));
    setTimeout(() => {
        stepFinal.classList.add('isActive');
        let test = data.map(text => {
            return `<div class="order-info">${text}</div>`;
        });
        stepFinal.innerHTML = test.join('');
    }, 0);
}


function submitForm() {
    const submit = document.querySelector("[data-pay]");
    const modal = document.querySelector("[data-modal]");
    const cancel = document.querySelector("[data-cancel]");


    submit.addEventListener("click", function (event) {
        let payment = document.getElementById('payment');
        let paymentInfo = document.getElementById('payment-info');
        localStorage.setItem('payment', payment.value);
        localStorage.setItem('payment-info', paymentInfo.value);
        getData();
    });

    cancel.addEventListener('click', (event) => {
        modal.style = "display:none";
    })

}

function nextStep() {


    document.querySelectorAll(".next-step").forEach((button) => {
        button.addEventListener("click", function (event) {

            let activeStep = document.querySelector(".step.isActive");
            let activeStepIndex = activeStep.dataset.step;
            let nextStepIndex = Number(activeStep.dataset.step) + 1;
            let nextStep = document.querySelector(`.step[data-step="${nextStepIndex}"]`);

            if (Number(activeStepIndex) === 1) {
                let checkedEl = document.querySelector('input[type="radio"]:checked').dataset.game;
                localStorage.setItem('step1', checkedEl);
            } else if (Number(activeStepIndex) === 2) {
                let checkedEl = document.querySelector('input[type="radio"]:checked').dataset.server;
                localStorage.setItem('step2', checkedEl);
            }

            activeStep.classList.remove('isActive');
            if (nextStepIndex < 4) {
                nextStep.classList.add('isActive');
            }


        });
    });


}

function hiddenMenu() {
    let activate = document.querySelector(".hidden-link");
    let close = document.querySelector(".hidden-menu, .active-menu")
    activate.addEventListener("click", function (event) {
        let hiddenMenu = document.querySelector(".hidden-menu");
        hiddenMenu.classList.add('active-menu');
    })
    close.addEventListener("click", function (event) {
        // if event.target !== document.querySelector('.hidden-menu')
        close.classList.remove('active-menu')
    })
}

// function mainMenu() {
//     let button;
//     button.click(); // el
//     this.find('submenu') // submenu
//     submenu.addClass('active'); //submenu.isActive

//     submenu.click(!el)

//     submenu.removeClass('isActive')
// }


document.addEventListener("DOMContentLoaded", function (event) {
    setInterval(() => {
        timer();
    }, 1000);
    getModal();
    submitForm();
    nextStep();
    hiddenMenu()
});