let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let specialCharacters = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");

sliderValue.textContent=inputSlider.value; //showing default slider value instead of showing nothing
inputSlider.addEventListener('input',()=>{
    sliderValue.textContent=inputSlider.value;
})

genBtn.addEventListener('click',()=>{
    passBox.value = generatePassword();
})

//Function to generate password
function generatePassword(){
    if(!lowercase.checked  && !uppercase.checked && !numbers.checked && !specialCharacters.checked){
        return "";
    }
    else{

    let lowerChars = "abcdefghijklmnoprstuvwxyz";
    let upperChars = lowerChars.toUpperCase();
    let numberChars = "0123456789";
    let symbolChars = "~!@#$%^&*()_+-";

    let allChars="";
    allChars+=lowercase.checked?lowerChars:"";
    allChars+=uppercase.checked?upperChars:"";
    allChars+=numbers.checked?numberChars:"";
    allChars+=specialCharacters.checked?symbolChars:"";

    let password="";
    let i=1;
    while(i<=inputSlider.value){
        password+=allChars.charAt(Math.floor(Math.random()*(allChars.length)));
        i++;
    }
    return password;
}
}

copyIcon.addEventListener('click',()=>{
    if(passBox.value != "" || passBox.value.length >= 1){
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText="check";
        copyIcon.title = "Password Copied";

        setTimeout(()=>{
            copyIcon.innerHTML = "content_copy";
            copyIcon.title = "";
        }, 3000)
    }
})