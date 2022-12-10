//Guardo todos los inputs en variables para luego manipularlas y genero un array de estos para usar luego con forEach
let nombreInput = document.getElementById('nombreInput');
let apellidoInput = document.getElementById('apellidoInput');  
let emailInput = document.getElementById('emailInput');
let contraseñaInput = document.getElementById('contraseñaInput');
let contraseña2Input = document.getElementById('contraseña2Input');
let campos = [nombreInput, apellidoInput, emailInput, contraseñaInput, contraseña2Input];

//con el evento "oninput" voy validando el llenado de los campos
nombreInput.oninput = () => {
    if(nombreInput.value==""){
        nombreInput.className = "form-control is-invalid";
    } else{
        nombreInput.className = "form-control is-valid";
    }
}
apellidoInput.oninput = () => {
    if(apellidoInput.value==""){
        apellidoInput.className = "form-control is-invalid";
    } else{
        apellidoInput.className = "form-control is-valid";
    }
}
emailInput.oninput = () => {
    if(emailInput.value=="" || emailInput.value.search(/@/)==-1 || emailInput.value.search(/.com/)==-1){
        emailInput.className = "form-control is-invalid";
    } else{
        emailInput.className = "form-control is-valid";
    }
}
contraseñaInput.oninput = () => {
    if(contraseñaInput.value==""){
        contraseñaInput.className = "form-control is-invalid";
    } else{
        contraseñaInput.className = "form-control is-valid";
    }
}
contraseña2Input.oninput = () => {
    if(contraseña2Input.value==""){
        contraseña2Input.className = "form-control is-invalid";
    } else{
        contraseña2Input.className = "form-control is-valid";
    }
}

//Al clickear en el botón verifica que no haya campos vacíos, el formato del email y que ambas contraseñas sean iguales
let btnRegistrarse = document.getElementById('btnRegistrarse');
btnRegistrarse.onclick = () =>{  
    if(nombreInput.value=="" || apellidoInput.value=="" || emailInput.value=="" || contraseñaInput.value=="" || contraseña2Input.value==""){
        campos.forEach((campo) =>{
            if (campo.value==""){
                campo.className = "form-control is-invalid";
            }
        })
        Swal.fire({
            title: 'Error!',
            text: 'Por favor complete todos los campos',
            icon: 'error',
            confirmButtonColor: '#BA7C35',
            confirmButtonText: 'OK'
        })
    } else if(emailInput.value.search(/@/)==-1 || emailInput.value.search(/.com/)==-1){
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese un formato de email válido',
            icon: 'error',
            confirmButtonColor: '#BA7C35',
            confirmButtonText: 'OK'
        })
    } else if(contraseñaInput.value != contraseña2Input.value){
        Swal.fire({
            title: 'Error!',
            text: 'Las contraseñas no coinciden. Por favor, reingréselas',
            icon: 'error',
            confirmButtonColor: '#BA7C35',
            confirmButtonText: 'OK'
        })
    } else{                                 //Si se valida todo, se muestra mensaje exitoso y en 2000ms se guardan los datos en LS (esto por no contar con BBDD) y redirige a la página principal
        Swal.fire({
            title: 'Registrado con éxito',
            showConfirmButton: false,
            icon: 'success'
        })
        setTimeout(()=>{
            localStorage.setItem('nombre', nombreInput.value);
            localStorage.setItem('apellido', apellidoInput.value);
            localStorage.setItem('email', emailInput.value);
            localStorage.setItem('contraseña', contraseñaInput.value);
            window.location.href='../../index.html';
            },
            2000 
        )   
    }
};