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

let cerrarSesion = document.getElementById('cerrar-sesion');
cerrarSesion.onclick = () =>{
    localStorage.clear();
    sessionStorage.clear();
    window.location.href='../../index.html'; 
}