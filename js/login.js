//Guardo todos los inputs en variables para luego manipuarlas y genero un array de estos para usar luego con forEach
let emailInput = document.getElementById('emailInput');
let contraseñaInput = document.getElementById('contraseñaInput');
let campos = [emailInput, contraseñaInput];

//con el evento "oninput" voy validando el llenado de los campos
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

//Al clickear en el botón verifica que no haya campos vacíos, el formato del email y que los valores ingresados sean los del LS en el momento del registro (esto por no contar con BBDD)
let btnLogin = document.getElementById('btnLogin');
btnLogin.onclick = () =>{
    if(emailInput.value=="" || contraseñaInput.value==""){
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
    } else{                                
        let emailLS = localStorage.getItem('email');
        let contraseñaLS = localStorage.getItem('contraseña');
        
        if (emailInput.value==emailLS && contraseñaInput.value==contraseñaLS){
            Swal.fire({
                title: 'Inicio de sesión exitoso',
                showConfirmButton: false,
                icon: 'success'
            })
            setTimeout(()=>{
                if(document.querySelector("#checkbox:checked")){    //Guarda "true" en LS si se clickea en "no cerrar sesion"
                    localStorage.setItem('registrado', true);
                    window.location.href='../../index.html';    
                } else{                                             //Caso contrario, se guarda en SS
                    sessionStorage.setItem('registrado', true);
                    window.location.href='../../index.html';   
                } 
                },
            2000
            ) 
        } else{
            Swal.fire({
                title: 'Error al iniciar sesión',
                text: 'Email y/o contraseña inválido',
                icon: 'error',
                confirmButtonColor: '#BA7C35',
                confirmButtonText: 'OK'
            })
        }   
    }
};

//Boton para volver
let registro = document.getElementById('registro');
registro.onclick = () => {window.location.href='../ProyectoJS/pages/registro.html';};