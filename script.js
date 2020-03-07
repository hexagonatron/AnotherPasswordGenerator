//Selecting inputs and outputs from DOM

let lengthSlider = document.querySelector("#password-length-slider");

let lengthText = document.querySelector("#password-length-box");

let upperSwitch = document.querySelector(".upper-switch");

let lowerSwitch = document.querySelector(".lower-switch");

let numberSwitch = document.querySelector(".number-switch");

let symbolSwitch = document.querySelector(".symbol-switch");

let genPasswordBut = document.querySelector("#gen-button");

let copyBut = document.querySelector("#copy-button");

let genPopupBut = document.querySelector("#gen-popup-button");

//initial states of all page elements
var containsUpper = true;
var containsLower = true;
var containsNum = true;
var containsSymb = true;

var passwordLength = 12;

//Functions to generate specific random characters

var genUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65))
}

var genLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97))
}

var genNum = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48))
}

var genSymb = () => {
    const symb = "!@#$%^&*()-=+_?"
    return symb[Math.floor(Math.random() * symb.length )]
}

var genPopups = () => {

    //prompt for length
    passwordLength = prompt("How many characters would you like your password to be? \n(8 - 128)");
    
    //validation
    while((typeof passwordLength !== 'number') && (passwordLength < 8 || passwordLength > 128)){
        passwordLength = prompt("How many characters would you like your password to be? \n(8 - 128)\nOnly integer numbers from 8-128 are accepted");
    }

    //set page elements to user input
    lengthText.value = passwordLength;
    lengthSlider.value = passwordLength;

    //Ask if wants upper, lower, num,  symbols 
    containsUpper = confirm("Would you like your password to contain uppercase letters?");

    containsLower = confirm("Would you like your password to contain lowercase letters?");

    containsNum = confirm("Would you like your password to contain numbers?");

    containsSymb = confirm("Would you like your password to contain symbols?");

    console.log(`Upper ${containsUpper}, Lower ${containsLower}, Num ${containsNum}, Symbols ${containsSymb}`);

    upperSwitch.checked = containsUpper;
    lowerSwitch.checked = containsLower;
    numberSwitch.checked = containsNum;
    symbolSwitch.checked = containsSymb;


    //if all false reprompt
    if(!(containsUpper&&containsLower&&containsNum&&containsSymb)){
        alert("Your password must contain some characters. Let's start again");

        genPopups();

        //if not all false, call gen password function
    } else {
        genPassword();
    }

}

//
var genPassword = () => {

}

var copyPassword = () => {

}



//Attaching event listeners to buttons
genPopupBut.addEventListener("click", genPopups);

genPasswordBut.addEventListener("click", genPassword);

copyBut.addEventListener("click", copyPassword);


//Event listeners to detect change in password length slider or change in password length text box
lengthSlider.addEventListener("input", (e) => {
    console.log(lengthSlider.value);
    lengthText.value = lengthSlider.value;
});

lengthText.addEventListener("input", (e) => {
    console.log(lengthText.value);
    lengthSlider.value = lengthText.value;
});