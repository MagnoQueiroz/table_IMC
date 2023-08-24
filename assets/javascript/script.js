const form = document.querySelector(".form");

form.addEventListener("submit", processAndExecuteIMC);

function processAndExecuteIMC(event) {
    event.preventDefault();

    // se vc quer jogar o valor vc tem que ele tem que da dentro do evento, pq aqui vc pega o valor apos ele ser modificado(escrito e enviado, quando está fora vc pega o valor natural dele ou seja o undefined)
    const weight = form.querySelector("#weight").value;
    const height = form.querySelector("#height").value;
    const result = document.querySelector(".writeIMC");
    const calculateIMC = calculateImc(weight, height);
    const interpretedIMC = interpretedImc(calculateIMC);
    const getClass = getClassName(interpretedIMC);

    validateImc(calculateIMC);

    result.innerHTML = `<p class=${getClass}>Seu Imc é ${calculateIMC} (${interpretedIMC})</p>`;
    console.log(calculateIMC);

}

function getClassName(interpretedIMC) {
    return `Peso normal` === interpretedIMC ? "result" : "result-bad";
}

function calculateImc(weight, height) {
    let imc = weight / height ** 2;
    imc = imc.toFixed(2);
    return Number(imc);
}

function validateImc(calculateIMC) {
    if (isNaN(calculateIMC) == true) {
        alert("Invalid arguments");
        return false;
    }
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
    } else {
        result = `Obesidade grau III`;
    }
    return result ?? "valores desconhecidos";
}
