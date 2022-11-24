//Verifica el usuario tanto el LS como en SS para insertar el usuario
let registradoEnLs = localStorage.getItem('registrado');
if (registradoEnLs){
    let usuario = document.getElementById('usuario');
    usuario.innerText = `${localStorage.getItem('usuario')}`;
}
let registradoEnSs = sessionStorage.getItem('registrado');
if (registradoEnSs){
    let usuario = document.getElementById('usuario');
    usuario.innerText = `${sessionStorage.getItem('usuario')}`;
}

//Opción de cerrar sesion y borrar los datos en el Storage
let cerrarSesion = document.getElementById('cerrar-sesion');
cerrarSesion.onclick = () =>{
    localStorage.clear();
    sessionStorage.clear();
    window.location.href='../../index.html'; 
}