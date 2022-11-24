let registradoEnLs = localStorage.getItem('registrado');
if (registradoEnLs){
    let usuario = document.getElementById('usuario');
    let usuarioMob = document.getElementById('usuarioMob');
    usuario.innerText = `¡Bienvenido ${localStorage.getItem('usuario')}!`;
    usuarioMob.innerText = `¡Bienvenido ${localStorage.getItem('usuario')}!`;
}
let registradoEnSs = sessionStorage.getItem('registrado');
if (registradoEnSs){
    let usuario = document.getElementById('usuario');
    let usuarioMob = document.getElementById('usuarioMob');
    usuario.innerText = `¡Bienvenido ${sessionStorage.getItem('usuario')}!`;
    usuarioMob.innerText = `¡Bienvenido ${sessionStorage.getItem('usuario')}!`;
}

//Al no contar con una BBDD se establece una clase para crear las cabañas como objeto con sus atributos
class Cabania{
    constructor(id, img, nombre, descripcion, precio, capacidadMax){
        this.id = id; 
        this.img = img;  
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.capacidadMax = capacidadMax;
    }
}
    
const BBDD = [];

BBDD.push(new Cabania(1, "../images/cabaña-azul.jpg", "Cabaña Azul", "Dos dormitorios: uno con cama matrimonial y otro con cama matrimonial y cucheta. Podrá disfrutar de un amplio living, la cocina comedor y un baño. La arquitectura de esta cabaña es en varios niveles, por lo que no es aconsejable para personas con dificultades físicas o familias con niños pequeños.", 15000, 8));
BBDD.push(new Cabania(2, "../images/cabaña-naranja.jpg", "Cabaña Naranja", "Un dormitorio con cama matrimonial y sofá cama para dos personas en el living. Amplia cocina comedor y baño.", 12500, 6));
BBDD.push(new Cabania(3, "../images/cabaña-verde.jpg", "Cabaña Verde","Un dormitorio con cama matrimonial y sofá cama para dos personas en el living. Amplia cocina comedor y baño. Posee comodidades especiales para personas con dificultades motrices.", 12500, 6));
BBDD.push(new Cabania(4, "../images/cabaña-alpina-piedra.jpg", "Cabaña Alpina de Piedra","Un dormitorio con cama matrimonial en el piso superior y sofá cama para dos personas en el living. Amplia cocina comedor y baño en el piso inferior.", 10000, 4));
BBDD.push(new Cabania(5, "../images/cabaña-alpina-madera.jpg", "Cabaña Alpina de Madera","Un dormitorio con cama matrimonial en el piso superior y sofá cama para dos personas en el living. Amplia cocina comedor y baño en el piso inferior.", 10000, 4));

//Recuperamos del LS los valores ingresados por el usuario
let checkIn = new Date(localStorage.getItem('checkIn'));
let checkOut = new Date(localStorage.getItem('checkOut'));
let noches = localStorage.getItem('noches');
let personas = localStorage.getItem('personas');
//Y se muestran en la pantalla como resumen de la reserva
document.getElementById("checkInP").innerText = `${checkIn.getDate()}/${checkIn.getMonth()}/${checkIn.getFullYear()}`;
document.getElementById("checkOutP").innerText = `${checkOut.getDate()}/${checkOut.getMonth()}/${checkOut.getFullYear()}`;
noches > 1 ? document.getElementById('nochesP').innerText = `${noches} noches`: document.getElementById('nochesP').innerText = `${noches} noche`;
personas > 1 ? document.getElementById('personasP').innerText = `${personas} personas`: document.getElementById('personasP').innerText = `${personas} persona`;

//Array para almacenar las cabañas que cumplen con la capacidad de personas ingresadas 
const cabaniasOp = BBDD.filter((cabania)=> cabania.capacidadMax >= personas);

//Creación de las cards de las cabañas disponibles
let cabaniaContainer = document.getElementById('cabanias-container');
console.log(cabaniaContainer);

cabaniasOp.forEach((cabania)=>{
    let div = document.createElement("div");
    let precio = cabania.precio*noches;
    div.innerHTML = ` 
    <div class="card my-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${cabania.img}" class="img-fluid rounded" alt="Imagen de cabaña">
            </div>
            <div class="col-md-5 mb-3 d-flex align-items-center">
                <div class="card-body">
                    <h2 class="card-title">${cabania.nombre}</h2>
                    <p>${cabania.descripcion}</p>
                    <p>Capacidad máxima ${cabania.capacidadMax} personas</p>
                    <p class="mt-3">Además todas las cabañas incluyen:</p>
                    <p>Ropa de cama (sábanas y frazadas).</p>
                    <p>Cambio de sábanas (1 vez por semana).</p>
                    <p>Toallas y toallones (solo para ducha - no apto para piscina).</p>
                    <p>Vajilla completa.</p>
                    <p class="mb-3">Libre uso de las instalaciones.</p>                
                    <a href="#" class="card-text"><small class="text-muted">Ver detalles</small></a>
                </div>
            </div>
            <div class="col-md-3 mb-3 d-flex flex-column justify-content-center align-items-center">
                <h4>Precio Final</h4>
                <h5>$${precio}</h5>
                <a href="#" class="btn btn-brown">Elegir cabaña</a>
            </div>
        </div>
    </div>
    `;
    cabaniaContainer.append(div);
})

/*
        let cabaniaId = Number(prompt(`Ingrese el número de cabaña a elegir: ${textOp}`));
        const cabaniaSel = cabaniasOp.find(cabania => cabania.id === cabaniaId);

        //Primero se verifica que se halla encontrado la opción elegida entre las opciones y se procede al cálculo del precio final según la cantidad de noches ingresadas
        if (cabaniaSel!==undefined){
            let precio;
            let ok;
            if (noches>=7){
                precio = cabaniaSel.precio*noches*0.9;
                ok = prompt(`FELICITACIONES! OBTUVO UN 10% POR RESERVAR MÁS DE 7 NOCHES! \nSu estadía de ${noches} noches en ${cabaniaSel.nombre} tiene un costo total de $${precio} final.\n\nIngrese "ok" para confirmar la reserva`);
            } else{
                precio = cabaniaSel.precio*noches;
                ok = prompt(`Su estadía de ${noches} noches en ${cabaniaSel.nombre} tiene un costo total de $${precio} final.\n\nIngrese "ok" para confirmar la reserva`);
            }  

            if (ok.toLocaleLowerCase() === "ok"){
                registrarReserva(personas, cabaniaSel, noches, precio);
            } else{
                alert("Gracias por usar nuestro servicio");
            }

        } else{
            alert("Opción de cabaña inexistente");
        }

class Reserva{
constructor(id, titular, cantidadPersonas, cabaniaSel, noches, precio){
    this.idReserva = id;   
    this.titularReserva = titular;
    this.cantidadPersonas = cantidadPersonas;
    this.cabaniaSeleccionada = cabaniaSel;
    this.noches = noches;
    this.precioFinal = precio;
}
}

const BBDDReservas = [];
let idReservas = 0;

function registrarReserva(personas, cabaniaSel, noches, precio){
const titular = prompt("Ingrese el nombre y apellido del titular de la reserva:");
BBDDReservas.push(new Reserva(idReservas, titular, personas, cabaniaSel.nombre, noches, precio));
console.log(BBDDReservas[idReservas++]);
alert("Reserva exitosa! Muchas gracias por confiar en nosotros!");
*/