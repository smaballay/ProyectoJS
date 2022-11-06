//Variable global para que el usuario pueda reservar si ya tiene la sesion iniciada
let login = false;

//Al no contar con una BBDD se establece user y pass genéricas para su posterior validación
let user = "user";
let pass = "user123";

//Intentos fallidos de inicio de sesión, luego la cuenta pasa a estar bloqueada
let intentos = 3;

//Funcion para iniciar sesion desde "INICIAR SESION" o "RESERVAR"
function iniciarSesion(){
    while(!login){
        let usuario = prompt("Ingrese su usuario:");
        let contrasenia = prompt("Ingrese su contraseña:");
        if (usuario.toLocaleLowerCase()==user && contrasenia.toLocaleLowerCase()==pass){
            alert("Bienvenido " + user + "!");
            login=true;
        } else{
            intentos--;
            if (intentos==0){
                alert("Cuenta bloqueada. Comuníquese con Cabañas Fraimonti para desbloquear su cuenta.");
                login="bloqueada";
                break;
            } else if (intentos>1){
                alert(`Datos ingresados incorrectos. Le quedan ${intentos} intentos. \nLuego su cuenta quedará bloqueada.`);
            } else{
                alert(`Datos ingresados incorrectos. Le queda ${intentos} intento. \nLuego su cuenta quedará bloqueada.`);
            }
            let salida = prompt("Si desea salir ingrese ESC, sino presione aceptar");
            if (salida.toUpperCase()=="ESC"){
                break;
            }
            login=false;
        }
    }
    return login;
}

//Al no contar con una BBDD se establece una clase para crear las cabañas como objeto con sus atributos
class Cabania{
    constructor(id, nombre, precio, capacidadMax){
        this.id = id;   
        this.nombre = nombre;
        this.precio = precio;
        this.capacidadMax = capacidadMax;
    }
}
    
const BBDD = [];

BBDD.push(new Cabania(1, "Cabaña Azul", 15000, 8));
BBDD.push(new Cabania(2, "Cabaña Naranja", 12500, 6));
BBDD.push(new Cabania(3, "Cabaña Verde", 12500, 6));
BBDD.push(new Cabania(4, "Cabaña Alpina de Piedra", 10000, 4));
BBDD.push(new Cabania(5, "Cabaña Alpina de Madera", 10000, 4));

//Funcion para reservar una cabaña dependiendo la cantidad de personas y noches, validando primero que el usuario este logeado
function reservar(){
    let registrado = iniciarSesion();

    if(registrado==true){
        let noches = Number(prompt("Ingrese la cantidad de noches que desea alquilar"));
        let personas = Number(prompt("Ingrese la cantidad de personas (máximo 8):"));
        
        if (noches>0 && personas>0 && personas<=8){
            //Nuevo array para almacenar las cabañas que cumplen con la capacidad de personas ingresadas 
            const cabaniasOp = BBDD.filter((cabania)=> cabania.capacidadMax >= personas);

            //Variable para almacenar en texto el array y mostrar junto con el prompt
            let textOp;
            cabaniasOp.forEach((cabania)=> textOp+=`\n${cabania.id} - ${cabania.nombre} $${cabania.precio}`);

            //Variable para guardar la opción elegida por el usuario y buscar la cabaña seleccionada
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
        } else {
            alert("Cantidad de noches o personas incorrectos. Inténtelo nuevamente.");
        }
    } 
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
}