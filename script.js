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

//Functions to generate specific random characters




genPopups = () => {

}

genPassword = () => {

}

copyPassword = () => {
    
}



//Attaching event listeners to buttons
genPopupBut.addEventListener("click", genPopups());

genPasswordBut.addEventListener("click", genPassword());

copyBut.addEventListener("click", copyPassword());


//Event listeners to detect change in password length slider or change in password length text box
lengthSlider.addEventListener("input", (e) => {
    console.log(lengthSlider.value);
    lengthText.value = lengthSlider.value;
});

lengthText.addEventListener("input", (e) => {
    console.log(lengthText.value);
    lengthSlider.value = lengthText.value;
});