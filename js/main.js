//Se asignan variables para luego poder usarlas en las siguientes funciones
let checkInInput = document.getElementById('checkInInput');
let checkOutInput = document.getElementById('checkOutInput');

//Al cargar la página se establece como fecha mínima de ingreso la actual y de egreso el día siguiente
window.onload = () => {
    let hoy = new Date();
    console.log(hoy)
    let sigDia = new Date()
    sigDia.setDate(hoy.getDate()+1);

    checkInInput.value = hoy.toJSON().slice(0,10);
    console.log(checkInInput.value)
    checkInInput.min = hoy.toJSON().slice(0,10);
    checkOutInput.value = sigDia.toJSON().slice(0,10);
    checkOutInput.min = sigDia.toJSON().slice(0,10);
}

//Al cambiar la fecha de ingreso se reestablece la fecha de egreso por la del día siguiente
checkInInput.onchange = () =>{
    let hoy = new Date(checkInInput.value);
    let sigDia = new Date()
    sigDia.setDate(hoy.getDate()+1);
    checkOutInput.value = sigDia.toJSON().slice(0,10);
    checkOutInput.min = sigDia.toJSON().slice(0,10);
}

//Verifica si ya hay un usuario logeado en LS o SS y cambia el contenido del <span>
let registradoEnLs = localStorage.getItem('registrado');
if (registradoEnLs){
    let usuario = document.getElementById('usuario');
    let usuarioMob = document.getElementById('usuarioMob');
    usuario.innerHTML = `¡Bienvenido <a href="../pages/cuenta.html"><b>${localStorage.getItem('usuario')}</b></a>!`;
    usuarioMob.innerHTML = `¡Bienvenido <a href="../pages/cuenta.html"><b>${localStorage.getItem('usuario')}</b></a>!`;
}
let registradoEnSs = sessionStorage.getItem('registrado');
if (registradoEnSs){
    let usuario = document.getElementById('usuario');
    let usuarioMob = document.getElementById('usuarioMob');
    usuario.innerHTML = `¡Bienvenido <a href="../pages/cuenta.html"><b>${sessionStorage.getItem('usuario')}</b></a>!`;
    usuarioMob.innerHTML = `¡Bienvenido <a href="../pages/cuenta.html"><b>${sessionStorage.getItem('usuario')}</b></a>!`;
}

//Antes de reservar, verifica que este logeado
let btnReservar = document.getElementById('btnReservar');
btnReservar.onclick = () =>{
    if (registradoEnLs || registradoEnSs){
        let checkInLS = new Date(checkInInput.value+"T00:00:00");
        localStorage.setItem('checkIn', checkInLS);
        let checkOutLS = new Date(checkOutInput.value+"T00:00:00");
        localStorage.setItem('checkOut', checkOutLS);
        let noches = checkOutLS - checkInLS;
        localStorage.setItem('noches', Math.floor(noches/(1000*60*60*24)));
        let personas = document.getElementById('personasInput').value;
        localStorage.setItem('personas', personas);
        window.location.href="pages/reserva.html"
    } else{
        window.location.href="pages/login.html"
    }
};