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

let passwordOut = document.querySelector(".password-out");

let optionBoxes = document.querySelectorAll("input.password-option[type=\"checkbox\"");

//initial states of all page elements
var containsUpper = true;
var containsLower = true;
var containsNum = true;
var containsSymb = true;

var passwordLength = 12;

//Functions to generate specific random characters

var genUpper = () => {
    var character = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    return ["letterChar", character];
}

var genLower = () => {
    var character= String.fromCharCode(Math.floor(Math.random() * 26 + 97));
    return ["letterChar", character];
}

var genNum = () => {
    var character = String.fromCharCode(Math.floor(Math.random() * 10 + 48));
    return ["numberChar", character];
}

var genSymb = () => {
    const symb = "!@#$%^&*()-=+_?"
    var character = symb[Math.floor(Math.random() * symb.length)];
    return ["symbolChar", character];
}

var genPopups = () => {

    //prompt for length
    passwordLength = prompt("How many characters would you like your password to be? \n(8 - 128)");

    //validation
    while ((typeof passwordLength !== 'number') && (passwordLength < 8 || passwordLength > 128)) {
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
    if (!(containsUpper || containsLower || containsNum || containsSymb)) {
        alert("Your password must contain some characters. Let's start again");

        genPopups();


    } else {
        //if not all false, call gen password function
        genPassword();
    }

}

//Fn to generate a password
var genPassword = () => {

    var availableFunctions = [];

    //Update variables
    containsUpper = upperSwitch.checked;
    containsLower = lowerSwitch.checked;
    containsNum = numberSwitch.checked;
    containsSymb = symbolSwitch.checked;

    passwordLength = lengthText.value;

    //depending on what's checked, push functions to available characters array to call later
    if (containsUpper) { availableFunctions.push(genUpper) };
    if (containsLower) { availableFunctions.push(genLower) };
    if (containsNum) { availableFunctions.push(genNum) };
    if (containsSymb) { availableFunctions.push(genSymb) };

    //if there are functions in the array, i.e. at least one box is checked then gen the password
    if (availableFunctions.length) {
        var passwordHTML = "";

        for (i = 0; i < passwordLength; i++) {
            //gen random number that will correspond to a function to call
            var rand = Math.floor(Math.random() * availableFunctions.length);

            //generate single random character by calling one of the functions in the availible functions array
            var randCharArray = availableFunctions[rand]();

            //append password to password output
            passwordHTML += `<span class=\"${randCharArray[0]}\">${randCharArray[1]}</span>`;
            
        }

        //Output password to page
        passwordOut.innerHTML = passwordHTML;

        //Enable copy button
        copyBut.disabled = false;

    } else {
        //executes if no boxes are checked

    }
}

//Fn to copy password to clipboard
var copyPassword = () => {

    //gets current password
    var passwordToCopy = passwordOut.innerText;

    //creates phantom textarea to copy from
    var textArea = document.createElement("textarea");
    textArea.value = passwordToCopy;

    //So we never see it. Almost as if it was never there to begin with 
    textArea.style.position = "absolute";
    textArea.style.top = "-99999999999px";
    document.body.appendChild(textArea);

    //Where the magic happens
    textArea.select();
    textArea.setSelectionRange(0, 999);
    document.execCommand("copy");

    //And just like that it vanishes
    document.body.removeChild(textArea);
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

//Attaches an event listener to every switch on the page
optionBoxes.forEach((box) => {

    //When a switch is toggled
    box.addEventListener("change", (e) => {

        //If all switches are off disable the gen password button
        if (!(upperSwitch.checked || lowerSwitch.checked || numberSwitch.checked || symbolSwitch.checked)) {
            genPasswordBut.disabled = true;
        } else {
            //if any switches are true button is enabled
            genPasswordBut.disabled = false;
        }
    });
});