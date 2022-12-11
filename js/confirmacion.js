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
let nombreCabaña = localStorage.getItem('nombreCabaña');
let capacidadCabaña = localStorage.getItem('capacidadCabaña');
let precioNoche = localStorage.getItem('precioNoche');
let precioFinal;
noches >= 7 ? precioFinal=precioNoche*noches*0.9 : precioFinal=precioNoche*noches;

//Y se muestran en la pantalla como resumen de la reserva
document.getElementById("checkInP").innerText = `${checkIn.getDate()}/${checkIn.getMonth()+1}/${checkIn.getFullYear()}`;
document.getElementById("checkOutP").innerText = `${checkOut.getDate()}/${checkOut.getMonth()+1}/${checkOut.getFullYear()}`;
noches > 1 ? document.getElementById('nochesP').innerText = `${noches} noches`: document.getElementById('nochesP').innerText = `${noches} noche`;
personas > 1 ? document.getElementById('personasP').innerText = `${personas} personas`: document.getElementById('personasP').innerText = `${personas} persona`;
document.getElementById("cabañaP").innerText = `${nombreCabaña}`;
document.getElementById("capacidadP").innerText = `${capacidadCabaña} personas`;
document.getElementById("PrecioP").innerText = `$${precioFinal}`;
document.getElementById('total').innerText = `Total a pagar $${precioFinal}`;


//Al no validar el contenido de los inputs, ni reutilizo los datos, uso querySelectorAll para verificar que no esten vacíos los campos
let campos = document.querySelectorAll('.form-control');
let btnPagar = document.getElementById('btnPagar');
btnPagar.onclick = () =>{
    let vacio = false;
    campos.forEach((campo) =>{
        if (campo.value==""){
            campo.className = "form-control is-invalid";
            vacio = true;
        }
    })
    if (vacio == true){
        Swal.fire({
            title: 'Error!',
            text: 'Por favor complete todos los campos',
            icon: 'error',
            confirmButtonColor: '#BA7C35',
            confirmButtonText: 'OK'
        })    
    } else{  
        Swal.fire({
            title: 'Reserva exitosa',
            text: 'Muchas gracias por confiar en nosotros!',
            showConfirmButton: false,
            icon: 'success'
        })   
        setTimeout(()=>{
            window.location.href='../index.html';
            },
        3000 
        ) 
    } 
}