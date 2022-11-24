let btnLogin = document.getElementById('btnLogin');
btnLogin.onclick = () =>{
    if (document.querySelector("#checkbox:checked")){
        let usuario = document.getElementById('usuarioInput').value;
        localStorage.setItem('usuario', usuario);
        let contrasenia = document.getElementById('contraseniaInput').value;
        localStorage.setItem('contrasenia', contrasenia);
        localStorage.setItem('registrado', true);
        window.location.href='../../index.html';    
    } else{
        let usuario = document.getElementById('usuarioInput').value;
        sessionStorage.setItem('usuario', usuario);
        let contrasenia = document.getElementById('contraseniaInput').value;
        sessionStorage.setItem('contrasenia', contrasenia);
        sessionStorage.setItem('registrado', true);
        window.location.href='../../index.html';   
    }   
};

let registro = document.getElementById('registro');
registro.onclick = () => {window.location.href='../../pages/registro.html';};