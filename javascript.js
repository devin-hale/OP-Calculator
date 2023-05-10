const display = document.querySelector('#display');
display.innerHTML = 0;
const number = document.querySelectorAll('.number');

let storedNum1 = 0;
let storedNum2 = "";
let opResult;
let chosenOperator;
let decFlag = 0;
let opActive = 0;
let opActive2 = 0;
let equalsFlag = 0;

function displayChecker() {
    if (display.innerHTML.toString().length > 12){
        display.innerHTML = display.innerHTML.substring(0,12);
    };
}

function Operate() {
    switch(chosenOperator) {
        case "#divideOp":
            opResult = storedNum1/storedNum2;
            break;
        case "#multiplyOp":
            opResult = storedNum1*storedNum2;
            break;
        case "#addOp":
            opResult = Number(storedNum1) + Number(storedNum2);
            break;
        case "#subtractOp":
            opResult = Number(storedNum1) - Number(storedNum2);
            break;
    }

}

/* Cycles through all number buttons, giving them an event listener
that adds the button number to the display when clicked. */
for (i = 0; i < number.length; i++) {
    /* When the cycle hits the decimal button, give it a conditional event listener.
        Prevents multiple decimals from being input using the 'decFlag'.
        opActive flag prevents situations where a decimal isn't preceded by a number. */
    if (number[i].innerHTML == ".") {
        number[i].addEventListener('click', a => {
            if (decFlag == 0) {
                if (opActive == 0) {
                display.insertAdjacentHTML('beforeend', ".");
                displayChecker();
                decFlag = 1;
                }
                if (opActive == 1) {
                    display.innerHTML = "0."
                    document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
                    displayChecker();
                    decFlag = 1;
                    opActive = 0;
                }
            };
        });
    /* When a number is clicked, check if the display is a  */
    } else {
        number[i].addEventListener('click', a => {
            if (display.innerHTML == '0' || display.innerHTML == 'Error') {
                display.innerHTML = a.currentTarget.innerHTML;
                displayChecker();
            }else {
                if (opActive == 0) {
                    display.innerHTML += a.currentTarget.innerHTML;
                    displayChecker();
                    
                }
                if (opActive == 0 && equalsFlag == 1) {
                    display.innerHTML = a.currentTarget.innerHTML;
                    displayChecker();
                    storedNum1 = display.innerHTML;
                    storedNum2 = '';
                    equalsFlag = 0;
                }
                if (opActive == 1) {
                    display.innerHTML = a.currentTarget.innerHTML;
                    displayChecker();
                    storedNum2 = display.innerHTML;
                    document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
                    opActive = 0;
                }
            }
        });
    };
}

document.querySelector('#divideOp').addEventListener('click', a => {    
        if (storedNum2.length == 0 || equalsFlag == 1) {
            chosenOperator = "#divideOp";
            a.currentTarget.classList.add("selectedOper");
            storedNum1 = display.innerHTML;
            storedNum2 = display.innerHTML;
            opActive = 1;
            decFlag = 0;
            equalsFlag = 0;
        } else {
            document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
            storedNum2 = display.innerHTML;
            if (storedNum2 == 0) {
                display.innerHTML = 'Error';
                document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
                opActive = 0;
                decFlag = 0;
                storedNum1 = 0;
                storedNum2 = '';
            }
            if (opActive == 1) {
                chosenOperator = "#divideOp";
                a.currentTarget.classList.add("selectedOper");
            }
            else {
                Operate();
                display.innerHTML = `${opResult}`;
                displayChecker();
                opResult = display.innerHTML;
                storedNum1 = opResult;
                opActive = 1;
                decFlag = 0;
                chosenOperator = "#divideOp";
                a.currentTarget.classList.add("selectedOper");
            }
        }
    });

document.querySelector('#equalsOp').addEventListener('click', a => {
    document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
    storedNum2 = display.innerHTML;

    if (storedNum2.length == 0) {
        opActive = 0;
        decFlag = 0;
    }
    if (storedNum1 == '0' && chosenOperator == "#divideOp") {
        opResult = 0;
        display.innerHTML = '0';
        opActive = 0;
        decFlag = 0;
    }
    if (storedNum2 == 0 && chosenOperator == "#divideOp") {
        display.innerHTML = 'Error';
        opActive = 0;
        decFlag = 0;
        storedNum1 = 0;
        storedNum2 = '';
    }
    else {
        Operate();
        display.innerHTML = `${opResult}`;
        displayChecker();
        opResult = display.innerHTML;
        storedNum1 = opResult;
        opActive = 0;
        decFlag = 0;
        equalsFlag = 1;
    }

})

document.querySelector('#multiplyOp').addEventListener('click', a => {    
    if (storedNum2.length == 0 || equalsFlag == 1) {
        chosenOperator = "#multiplyOp";
        a.currentTarget.classList.add("selectedOper");
        storedNum1 = display.innerHTML;
        storedNum2 = display.innerHTML;
        opActive = 1;
        decFlag = 0;
        equalsFlag = 0;
    } else {
        document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
        storedNum2 = display.innerHTML;
        if (opActive == 1) {
            chosenOperator = "#multiplyOp";
            a.currentTarget.classList.add("selectedOper");
        }
        else {
            Operate();
            display.innerHTML = `${opResult}`;
            displayChecker();
            opResult = display.innerHTML;
            storedNum1 = opResult;
            opActive = 1;
            decFlag = 0;
            chosenOperator = "#multiplyOp";
            a.currentTarget.classList.add("selectedOper");
        }    
    }
});

document.querySelector('#addOp').addEventListener('click', a => {    
    if (storedNum2.length == 0 || equalsFlag == 1) {
        chosenOperator = "#addOp";
        a.currentTarget.classList.add("selectedOper");
        storedNum1 = display.innerHTML;
        storedNum2 = display.innerHTML;
        opActive = 1;
        decFlag = 0;
        equalsFlag = 0;
    } else {
        document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
        storedNum2 = display.innerHTML;
        if (opActive == 1) {
            chosenOperator = "#addOp";
            a.currentTarget.classList.add("selectedOper");
        }
        else {
            Operate();
            display.innerHTML = `${opResult}`;
            displayChecker();
            opResult = display.innerHTML;
            storedNum1 = opResult;
            opActive = 1;
            decFlag = 0;
            chosenOperator = "#addOp";
            a.currentTarget.classList.add("selectedOper");
        }    
    }
});

document.querySelector('#subtractOp').addEventListener('click', a => {    
    if (storedNum2.length == 0 || equalsFlag == 1) {
        chosenOperator = "#subtractOp";
        a.currentTarget.classList.add("selectedOper");
        storedNum1 = display.innerHTML;
        storedNum2 = display.innerHTML;
        opActive = 1;
        decFlag = 0;
        equalsFlag = 0;
    } else {
        document.querySelector(`${chosenOperator}`).classList.remove("selectedOper");
        storedNum2 = display.innerHTML;
        if (opActive == 1) {
            chosenOperator = "#subtractOp";
            a.currentTarget.classList.add("selectedOper");
        }
        else {
            Operate();
            display.innerHTML = `${opResult}`;
            displayChecker();
            opResult = display.innerHTML;
            storedNum1 = opResult;
            opActive = 1;
            decFlag = 0;
            chosenOperator = "#subtractOp";
            a.currentTarget.classList.add("selectedOper");
        }    
    }
});

document.querySelector('#clearButton').addEventListener('click', a => {
    display.innerHTML = 0;
    storedNum1 = 0;
    storedNum2 = "";
    opResult = 0;
    chosenOperator = '';
    decFlag = 0;
    opActive = 0;
    opActive2 = 0;
    equalsFlag = 0;
});

document.querySelector('#plusMinus').addEventListener('click', a => {
    if (display.innerHTML == 0) {
    }
    else {
        if (display.innerHTML[0] == `-`) {
            display.innerHTML = display.innerHTML.replace(/^./, "");
        }
        else {
            display.innerHTML = `-`+`${display.innerHTML}`;
        };
    }
});

document.querySelector('#percentage').addEventListener('click', a => {
        if (storedNum2 == '') {
            storedNum1 = display.innerHTML;
            display.innerHTML = storedNum1/100;
            displayChecker();
            storedNum1 = display.innerHTML;
            console.log(storedNum1);
        } else {
            storedNum2 = display.innerHTML
            display.innerHTML = Number(storedNum2/100)*Number(storedNum1);
            console.log ()
            displayChecker();
            storedNum2 = display.innerHTML
    }
});