// DOM elements
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value; //+ used to convert string to number
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(
        hasLower, 
        hasNumber, 
        hasUpper, 
        hasSymbol, 
        length
        )
})

//Copy to clipboard

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) {
        return
    }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard! ')
})

function generatePassword(lower, upper, number, symbol, length) {
    // 1. Initialize password variable
    // 2. Filter out unchecked types
    // 3. Loop over length, call generator function for each type
    // 4. Add final password to password variable and return it

    let generatePassword = ''

    const typesCount = lower + upper + number + symbol //checks number of checked types

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0] //doubt
        ) 
    //curly braces make it an array of objects; filter is used to remove types that are false
    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]

            generatedPassword += randomFunc[funcName]()
        })
    }

    /*
        To get a random order
        for(let i = 0; i < length; i++) {
            const rand = Math.floor(Math.random().typesArr.length)
            generatedPassword += randomFunc[Object.keys(typesArr[rand])[0]]()
        }
    */

    /* randomize type array - alternative
    using Fisher-Yates Algorithm
    for (let i = typesArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
       
        const temp = typesArr[i];
        typesArr[i] = typesArr[j];
        typesArr[j] = temp;
    } */
    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

// Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[(Math.floor(Math.random() * symbols.length))]
}