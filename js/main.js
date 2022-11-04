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
                alert("Datos ingresados incorrectos. Le quedan "+intentos+" intentos. \nLuego su cuenta quedará bloqueada.");
            } else{
                alert("Datos ingresados incorrectos. Le queda "+intentos+" intento. \nLuego su cuenta quedará bloqueada.");
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
    const cabaniasOp = [];
    let registrado = iniciarSesion();

    if(registrado==true){
        let noches = Number(prompt("Ingrese la cantidad de noches que desea alquilar"));
        let personas = Number(prompt("Ingrese la cantidad de personas (máximo 8):"));
        let cabaniaSel;

        if (noches>0 && personas>0 && personas<=8){
            for (let ob of BBDD){
                if (ob.capacidadMax >= personas){
                    cabaniasOp.push(ob);
                }
            }
            cabaniaSel = Number(prompt("Ingrese el número de cabaña a elegir: " + mostrarCabanias(cabaniasOp)));
        } else {
            alert("Cantidad de noches o personas incorrectos. Inténtelo nuevamente.");
        }
    } 
}

function mostrarCabanias(cabaniasOp){
    let text = "";

    cabaniasOp.forEach((cabania)=> text+="\n" + cabania.id + " - "+ cabania.nombre + " $"+cabania.precio);

    return text;
}

//Funcion para calcular el valor de una estadía dependiendo la cantidad de noches y cabaña seleccionada
function selCabania(cabania, noches){
    let precio;
    let nomCabania;

    switch(cabania){
        case 1:
            nomCabania = "Cabaña Azul";
            precio = noches * 15000;
            break;
        case 2:
            nomCabania = "Cabaña Naranja"
            precio = noches * 12500;
            break;
        case 3:
            nomCabania = "Cabaña Verde"
            precio = noches * 12500;
            break;
        case 4:
            nomCabania = "Cabaña Alpina de Piedra"
            precio = noches * 10000;
            break;
        case 5:
            nomCabania = "Cabaña Alpina de Madera"
            precio = noches * 10000;
            break;
        default:
            alert("Número de cabaña inexistente.");
    }

    if (precio>0){
        if (noches>=7){
            alert("FELICITACIONES! OBTUVO UN 10% POR RESERVAR MÁS DE 7 NOCHES! \nSu estadía de " + noches + " noches en " + nomCabania + " tiene un costo total de $" + precio*0.9 + " final.");
        } else{
            alert("Su estadía de " + noches + " noches en " + nomCabania + " tiene un costo total de $" + precio + " final.");
        }    
    }
}