const palabras = [
    "perro", "gatos", "verde", "cielo", "nubes", "fuego", "lapiz", "raton", "llave", "dulce",
    "pluma", "rojas", "trigo", "limon", "tigre", "pasto", "mango", "avion", "gusto", "piano",
    "silla", "lunar", "fruta", "cabra", "truco", "brisa", "robot", "carta", "voces", "ducha",
    "nariz", "oasis", "lucha", "nieve", "rampa", "panda", "brote", "musgo", "aroma", "ronda",
    "sabio", "tenis", "torre", "queso", "rosas", "tarde", "yerba", "campo", "barco", "truco",
    "cerca", "freno", "monte", "llama", "multa", "cobre", "suelo", "banco", "truco", "sueño",
    "pasto", "cueva", "bello", "miedo", "firma", "radio", "duelo", "corte", "lapso", "norte",
    "falso", "rumbo", "plaza", "globo", "mueve", "calma", "pista", "rueda", "punto", "lente",
    "sobra", "clavo", "honor", "bravo", "ritmo", "cable", "cruce", "sabia", "santo", "lindo",
    "lista", "carga", "mando", "clima", "venta", "huevo", "limbo", "gente", "broma", "rasgo",
    "arroz", "soler", "tinta", "horno", "genio", "curva", "salto", "grado", "flecha", "puente",
    "hueso", "viaje", "flora", "reino", "medio", "punta", "cuero", "polvo", "rayos", "sombra",
    "grito", "lazos", "texto", "borde", "palco", "rumor", "casco", "furia", "renta", "regla",
    "salto", "trigo", "verso", "ancho", "junta", "golpe", "nieve", "sabor", "cinto", "marco",
    "rueda", "villa", "caldo", "forma", "libra", "onda", "pez", "rastro", "tinta", "valle"
];

let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let intentos = 0;
const maxIntentos = 6;

document.addEventListener("DOMContentLoaded", () => {
    crearTablero();

    document.getElementById("guess-button").addEventListener("click", hacerIntento);
    document.getElementById("guess-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            hacerIntento();
        }
    });
});

function crearTablero() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    for (let i = 0; i < maxIntentos * 5; i++) {
        let div = document.createElement("div");
        div.classList.add("letter-box");
        board.appendChild(div);
    }
}

function hacerIntento() {
    let input = document.getElementById("guess-input");
    let palabraUsuario = input.value.toLowerCase().trim();

    if (palabraUsuario.length !== 5) {
        mostrarMensaje("Debe ser una palabra de 5 letras.", "red");
        return;
    }

    let rowStart = intentos * 5;
    for (let i = 0; i < 5; i++) {
        let box = document.getElementsByClassName("letter-box")[rowStart + i];
        box.textContent = palabraUsuario[i];

        if (palabraUsuario[i] === palabraSecreta[i]) {
            box.classList.add("correct");
        } else if (palabraSecreta.includes(palabraUsuario[i])) {
            box.classList.add("present");
        } else {
            box.classList.add("absent");
        }
    }

    intentos++;

    if (palabraUsuario === palabraSecreta) {
        mostrarMensajeConBoton("🎉 ¡Ganaste! La palabra era: " + palabraSecreta, "win");
        deshabilitarEntrada();
    } else if (intentos >= maxIntentos) {
        mostrarMensajeConBoton(`❌ Perdiste. La palabra era: "${palabraSecreta}".`, "lose");
        deshabilitarEntrada();
    }

    input.value = "";
}

function mostrarMensaje(mensaje, color) {
    let msg = document.getElementById("message-text");
    msg.textContent = mensaje;
    msg.style.color = color;
    msg.classList.remove("win", "lose"); // Remueve clases específicas
    document.getElementById("next-button").style.display = "none";
}

function mostrarMensajeConBoton(mensaje, tipo) {
    let msg = document.getElementById("message-text");
    msg.textContent = mensaje;
    msg.classList.remove("win", "lose"); // Limpia clases previas
    msg.classList.add(tipo); // Agrega la clase "win" o "lose"
    let nextButton = document.getElementById("next-button");
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", reiniciarJuego);
    nextButton.addEventListener("click", reiniciarJuego);
}

function deshabilitarEntrada() {
    document.getElementById("guess-input").disabled = true;
    document.getElementById("guess-button").disabled = true;
}

function reiniciarJuego() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    intentos = 0;
    document.getElementById("guess-input").disabled = false;
    document.getElementById("guess-button").disabled = false;
    crearTablero();
    let msg = document.getElementById("message-text");
    msg.textContent = "";
    msg.classList.remove("win", "lose"); // Limpia clases al reiniciar
    document.getElementById("next-button").style.display = "none";
}