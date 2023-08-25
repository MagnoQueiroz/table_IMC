const form = document.querySelector(".form");
const result = document.querySelector(".writeIMC");
const writeDate = document.querySelector(".date");
form.addEventListener("submit", processAndExecuteIMC);

function processAndExecuteIMC(event) {
    event.preventDefault();

    // se vc quer jogar o valor vc tem que ele tem que da dentro do evento, pq aqui vc pega o valor apos ele ser modificado(escrito e enviado, quando está fora vc pega o valor natural dele ou seja o undefined)

    const weight = form.querySelector("#weight").value;
    const height = form.querySelector("#height").value;
    const calculateIMC = calculateImc(weight, height);
    const interpretedIMC = interpretedImc(calculateIMC);
    const getClass = getClassName(interpretedIMC);
    const validate = validateImc(calculateIMC, getClass);
    const helpOrNot = getHelpOrNot(interpretedIMC);

    // se validate for verdadeiro executa se nao for nao executa
    if (validate) {
        // result.innerHTML = `<p class=${getClass}>${helpOrNot}: seu Imc é ${calculateIMC} (${interpretedIMC})</p>`;
        setResult(
            `${helpOrNot}: seu Imc é ${calculateIMC} (${interpretedIMC})`
        );
    }
}

function getClassName(interpretedIMC) {
    //return `Peso normal` === interpretedIMC ? "result" : "result-bad";
    return `Peso normal` === interpretedIMC
        ? result.classList.add("result")
        : result.classList.add("result-bad");
}

function calculateImc(weight, height) {
    let imc = weight / height ** 2;
    imc = Number(imc.toFixed(2));
    return imc;
}

function interpretedImc(imc, result = null) {
    if (imc < 18.5) {
        result = `Abaixo do peso`;
    } else if (imc >= 18.5 || imc <= 24.9) {
        result = `Peso normal`;
    } else if (imc >= 25 || imc <= 29.9) {
        result = `Sobrepeso`;
    } else if (imc >= 30 || imc <= 34.9) {
        result = `Obesidade grau I`;
    } else if (imc >= 35 || imc <= 39.9) {
        result = `Obesidade grau II`;
    } else if (imc >= 40) {
        result = `Obesidade grau III`;
    } else {
        result = `valores inseridos inválidos`;
    }

    return result;
}

function validateImc(calculateIMC) {
    if (isNaN(calculateIMC) == true) {
        alert("Invalid arguments");
        // result.innerHTML = `<p class="${getClass}">Dados Inválidos!!! tente novamente</p>`;
        setResult("Dados Inválidos!!! tente novamente");
        return false;
    }
    return true;
}

function getHelpOrNot(interpretedIMC) {
    return "Peso normal" === interpretedIMC
        ? "Parabéns"
        : "Você precisa de ajuda profissional";
}

// function createParagraph() {
//     const p = document.createElement("p");
//     return p;
// }

function setResult(msg) {
    //reset content result after new execution
    result.innerHTML = "";
    const p = createParagraph();
    //appendChild adiciona um elemento HTML dentro do pai.
    result.appendChild(p);
    p.innerHTML = msg;
}

//this arrow function is used in the function expression
const createParagraph = () => {
    return document.createElement("p");
};

const getDate = () => {
    return (date = new Date(2023, 7));
};

function showDate() {
    const showP = createParagraph();
    const date = getDate();
    writeDate.appendChild(showP);
    showP.innerHTML = `${date.getFullYear()}`;
    console.log(date.getFullYear());
}

showDate();
