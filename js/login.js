let btnLogin = document.getElementById('btnLogin');
btnLogin.onclick = () =>{
    let usuario = document.getElementById('usuarioInput').value;
    localStorage.setItem('usuario', usuario);
    let contrasenia = document.getElementById('contraseniaInput').value;
    localStorage.setItem('contrasenia', contrasenia);
    localStorage.setItem('registrado', true);
    window.location.href='../../index.html';
};
