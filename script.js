let lengthSlider = document.querySelector("#password-length-slider");

let lengthText = document.querySelector("#password-length-box");

let upperSwitch = document.querySelector(".upper-switch");

let lowerSwitch = document.querySelector(".lower-switch");

let numberSwitch = document.querySelector(".number-switch");

let symbolSwitch = document.querySelector(".symbol-switch");

lengthSlider.addEventListener("input", (e) => {
    console.log(lengthSlider.value);
    lengthText.value = lengthSlider.value;
});

lengthText.addEventListener("input", (e) => {
    console.log(lengthText.value);
    lengthSlider.value = lengthText.value;
})