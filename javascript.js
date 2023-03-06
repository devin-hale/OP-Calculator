const display = document.querySelector('#display');
display.innerHTML = 0;
const number = document.querySelectorAll('.number');

let storedNum;
let chosenOperator;

/* Cycles through all number buttons, giving them an event listener
that adds the button number to the display when clicked. */
for (i = 0; i < number.length; i++) {
    if (number[i].innerHTML == ".") {
        number[i].addEventListener('click', a => {
            display.insertAdjacentHTML('beforeend', ".");
        });
    } else {
        number[i].addEventListener('click', a => {
            if (display.innerHTML == "0") {
                display.innerHTML = a.currentTarget.innerHTML
            }else {
                display.innerHTML += a.currentTarget.innerHTML;
            }
        });
    };
}




document.querySelector('#divideOp').addEventListener('click', a => {
    if (chosenOperator == null) {
        chosenOperator = "#divideOp";
        storedNum = display.innerHTML;
        a.currentTarget.classList.add("selectedOper");
    }
    else {
        switch (document.querySelector(`${chosenOperator}`).innerHTML) {
            case "/":
                if ((storedNum/display.innerHTML).toString().length > 12){
                    display.innerHTML = (storedNum/display.innerHTML).toExponential();
                } else {
                display.innerHTML = storedNum/display.innerHTML;
                }
                break;
            default:
                console.log("Nope");
        }
    }
})

document.querySelector('#equalsOp').addEventListener('click', a => {
    document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
    chosenOperator = null;

})