const tiempoInicio = Date.now();

// Ruta de las imágenes.
const rutaFotos = "./images/fotos/";

// Nombres de los distintos archivos de las imágenes.
const nombresFotos = [
    "aire-libre.jpg",
    "alpujarra.jpg",
    "chicaqué-borde.jpg",
    "chicaqué-perro.jpg",
    "chicaqué-qleada-2.jpg",
    "cocinando-donde-Sandra.jpg",
    "de-negro-ella-dando-pico.jpg",
    "de-negro-yo-dando-pico.jpg",
    "estudiosos.jpeg",
    "francisco-el-rapper.jpg",
    "hacia-el-cañón-bus.jpg",
    "halloween-casa-grupo.jpg",
    "halloween-thea-sentados.jpg",
    "post-volley.jpg",
    "teatro-eseqlo.jpg",
    "volley.jpg"
];

// Funcionamiento de los botones

const botonesChildren = document.getElementsByClassName("botones")[0].children;
const botonCi = botonesChildren[0], botonNo = botonesChildren[1];

function invertirBotones(positivo) {
    console.log("cí");
    botonCi.innerHTML = "Ño";
    botonCi.style.backgroundColor = "red";
    botonNo.innerHTML = "Cí";
    botonNo.style.backgroundColor = "green";
    mostrarPopup(positivo);
}

const popup = document.getElementsByClassName("popup")[0];
const img = popup.getElementsByTagName("img")[0];
const audio = popup.getElementsByTagName("audio")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const mensaje = document.getElementsByTagName("h2")[0];

let clickeadoYa = false;

function mostrarPopup(positivo) {
    let tiempoTimeout = 1000;
    if (clickeadoYa) {
        tiempoTimeout = 0;
    }
    setTimeout(() => {
        if (positivo) {
            img.src = "./images/yoshi-bailando.gif"
            audio.src = "./audio/yoshi-bailando.mp3"
            mensaje.textContent = "SIUUUUU >:V";
        } else {
            img.src = "./images/pikachu-llorando.gif"
            audio.src = "./audio/hello-darkness.mp3"
            mensaje.textContent = ":'V";
        }
        audio.play();
        popup.classList.add("active")
        overlay.classList.add("active");
        clickeadoYa = true;
    }, tiempoTimeout);
}

botonCi.onclick = () => invertirBotones(false);
botonNo.onclick = () => invertirBotones(true);

const botonPopup = popup.getElementsByTagName("button")[0];

function cerrarOverlay() {
    audio.pause();
    popup.classList.remove("active")
    overlay.classList.remove("active");
}

botonPopup.onclick = () => cerrarOverlay();


// 

// Función para ordenar de manera aleatórea los elementos de las rutas de imágenes.
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Poner en orden aleatóreo las fotos.
const rutasCompletas = shuffle(nombresFotos).map((nombreFoto) => rutaFotos + nombreFoto);

// Conseguir todas las rutas del DOM del carrusel de las fotos y agregarlas en un orden específico.
let carrusel = [];
const celdaInicial = document.getElementsByClassName(`images`)[0];
for (let i = 1; i <= 9; i++) {
    const foto = document.createElement("img");
    foto.classList.add("img-" + i);
    celdaInicial.appendChild(foto);
    carrusel.push(foto);
}

const tiempoFin = Date.now();

const intervaloCambio = 2000;

console.log(tiempoFin - tiempoInicio);

// Poner las fotos iniciales.
async function fotosIniciales() {
    let rutaActual = 0, carruselActual = 0;
    carrusel[carruselActual].src = rutasCompletas[rutaActual];
    rutaActual += 1, carruselActual += 1;
    let intervalo = setInterval(() => {
        carrusel[carruselActual].src = rutasCompletas[rutaActual];
        rutaActual += 1, carruselActual += 1;
        if (rutaActual === rutasCompletas.length) {
            rutaActual = 0;
        }
        if (carruselActual === carrusel.length) {
            clearInterval(intervalo);
        }
    }, intervaloCambio);
    return rutaActual;
}

// Hacer el ciclo infinto
async function cicloCarrusel() {
    let rutaActual = await fotosIniciales(), carruselActual = 0;
    carrusel[carruselActual].src = rutasCompletas[rutaActual];
    rutaActual += 1, carruselActual += 1;
    setInterval(() => {
        carrusel[carruselActual].src = rutasCompletas[rutaActual];
        rutaActual += 1, carruselActual += 1;
        if (rutaActual === rutasCompletas.length) {
            rutaActual = 0;
        }
        if (carruselActual === carrusel.length) {
            carruselActual = 0;
        }
    }, intervaloCambio);
}

cicloCarrusel();