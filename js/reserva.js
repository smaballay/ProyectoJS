//Verifica si ya hay un usuario logeado en LS o SS y cambia el contenido del <span>
let registradoEnLs = localStorage.getItem('registrado');
let registradoEnSs = sessionStorage.getItem('registrado');
if (registradoEnLs=="true" || registradoEnSs=="true"){
    let usuario = document.getElementById('usuario');
    let usuarioMob = document.getElementById('usuarioMob');
    usuario.innerHTML = `¡Bienvenido <a href="../pages/cuenta.html"><b>${localStorage.getItem('nombre')}</b></a>!`;
    usuarioMob.innerHTML = `¡Bienvenido <a href="../pages/cuenta.html"><b>${localStorage.getItem('nombre')}</b></a>!`;
}

//Recuperamos del LS los valores ingresados por el usuario
let checkIn = new Date(localStorage.getItem('checkIn'));
let checkOut = new Date(localStorage.getItem('checkOut'));
let noches = localStorage.getItem('noches');
let personas = localStorage.getItem('personas');

//Y se muestran en la pantalla como resumen de la reserva
document.getElementById("checkInP").innerText = `${checkIn.getDate()}/${checkIn.getMonth()+1}/${checkIn.getFullYear()}`;
document.getElementById("checkOutP").innerText = `${checkOut.getDate()}/${checkOut.getMonth()+1}/${checkOut.getFullYear()}`;
noches > 1 ? document.getElementById('nochesP').innerText = `${noches} noches`: document.getElementById('nochesP').innerText = `${noches} noche`;
personas > 1 ? document.getElementById('personasP').innerText = `${personas} personas`: document.getElementById('personasP').innerText = `${personas} persona`;

//Si la reserva es por mas de 7 noches aparece un mensaje arriba a la derecha informando el descuento
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
})
if (noches >= 7){
    Toast.fire({
        title: '¡FELICITACIONES!',
        text: 'Obtuvo un 10% por reservar más de 7 noches!'
    });
} 

//Consulta en la base de datos
fetch('../js/bbdd.json')
    .then((response) => response.json())
    .then((cabañas) => {
        //Array para almacenar las cabañas que cumplen con la capacidad de personas ingresadas 
        let cabañasOp = cabañas.filter((cabaña)=> cabaña.capacidadMax >= personas);

        //Creación de las cards de las cabañas disponibles
        let cabañasContainer = document.getElementById('cabañas-container');

        cabañasOp.forEach((cabaña)=>{
            let div = document.createElement("div");
            if (noches>=7){
                div.innerHTML = ` 
                <div class="card my-3">
                    <div class="row g-0">
                        <div class="col-lg-4">
                            <img src="${cabaña.img}" class="img-fluid rounded" alt="Imagen de cabaña">
                        </div>
                        <div class="col-lg-6 mb-3 d-flex align-items-center">
                            <div class="card-body">
                                <h2 class="card-title">${cabaña.nombre}</h2>
                                <p>${cabaña.descripcion}</p>
                                <p class="my-4">Capacidad máxima: ${cabaña.capacidadMax} personas</p>              
                                <a href="#" class="card-text"><small class="text-muted">Ver detalles</small></a>
                            </div>
                        </div>
                        <div class="col-lg-2 mb-3 d-flex flex-column justify-content-center align-items-center">
                            <h4>Precio Final</h4>
                            <h6 class="tachado">$${cabaña.precio*noches}</h6>
                            <h4>$${cabaña.precio*noches*0.9}</h4>
                            <button id="${cabaña.id}" class="btnCabaña btn btn-brown">Seleccionar cabaña</button>
                        </div>
                    </div>
                </div>
                `;
                cabañasContainer.append(div);
            } else{
                div.innerHTML = ` 
                <div class="card my-3">
                    <div class="row g-0">
                        <div class="col-lg-4">
                            <img src="${cabaña.img}" class="img-fluid rounded" alt="Imagen de cabaña">
                        </div>
                        <div class="col-lg-5 mb-3 d-flex align-items-center">
                            <div class="card-body">
                                <h2 class="card-title">${cabaña.nombre}</h2>
                                <p>${cabaña.descripcion}</p>
                                <p class="my-4">Capacidad máxima: ${cabaña.capacidadMax} personas</p>               
                                <a href="#" class="card-text"><small class="text-muted">Ver detalles</small></a>
                            </div>
                        </div>
                        <div class="col-lg-3 mb-3 d-flex flex-column justify-content-center align-items-center">
                            <h4>Precio Final</h4>
                            <h4>$${cabaña.precio*noches}</h4>
                            <button id="${cabaña.id}" class="btnCabaña btn btn-brown">Seleccionar cabaña</button>
                        </div>
                    </div>
                </div>
                `;
                cabañasContainer.append(div);
            }
        }) 

        //Agrega a los botones de las cards la funcion guardarLs
        let btnCabañas = document.querySelectorAll(".btnCabaña");
        btnCabañas.forEach((btn) =>{
            btn.addEventListener("click", guardarLs);
        })
        //Funcion para agregar al Local Storage los datos de la cabaña seleccionada
        function guardarLs(e){
            let idBtn = e.currentTarget.id;
            let cabañaSel = cabañasOp.find(cabaña => cabaña.id == idBtn);
            localStorage.setItem('nombreCabaña', cabañaSel.nombre);
            localStorage.setItem('capacidadCabaña', cabañaSel.capacidadMax);
            localStorage.setItem('precioNoche', cabañaSel.precio);
            window.location.href='../pages/confirmacion.html';
        }
    })
    .catch((error)=>{
        console.log(error);
        let cabañasContainer = document.getElementById('cabañas-container');
        let div = document.createElement("div");
        div.innerHTML = ` 
            <div class="d-flex flex-column justify-content-center" style="height:45vh; color:red;">
                <i class="fa-solid fa-triangle-exclamation fs-1"></i>
                <h5 class="mt-3">No se pudo obtener información.</h5>
            </div>
            `;
        cabañasContainer.append(div);
    })