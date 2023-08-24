const form = document.querySelector(".form");
const result = document.querySelector(".writeIMC");

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
    const helpOrNot = getHelpOrNot(interpretedIMC)

    if (validate != false) { result.innerHTML = `<p class=${getClass}>${helpOrNot}: seu Imc é ${calculateIMC} (${interpretedIMC})</p>`;}

}

function getClassName(interpretedIMC) {
    return `Peso normal` === interpretedIMC ? "result" : "result-bad";
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

function validateImc(calculateIMC, getClass) {
    if (isNaN(calculateIMC) == true) {
        alert("Invalid arguments");
        result.innerHTML = `<p class="${getClass}">Dados Inválidos!!! tente novamente</p>`;
        return false;
    }
}


function getHelpOrNot(interpretedIMC) {
    return "Peso normal" ? "Parabéns" : "Você precisa de ajuda profissional"
}