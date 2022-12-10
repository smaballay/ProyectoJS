//Se obtiene el clima extendido mediante el query params
fetch("https://api.open-meteo.com/v1/forecast?latitude=-31.3462&longitude=-64.4776&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto")
    .then((clima) => clima.json())
    .then((clima) =>{   
        //Agregamos las cards mostrando la fecha correspondiente arriba, icono y temperatura
        for (let i=0; i<7; i++){
            let climaContainer = document.getElementById('clima-container');
            let div = document.createElement("div");
            div.innerHTML = ` 
            <div class="card-clima text-center">
                <h5>${clima.daily.time[i].slice(8,10)}/${clima.daily.time[i].slice(5,7)}</h5>
                <i class="icon"></i>
                <h5>${Math.round(clima.daily.temperature_2m_min[i])}°C / ${Math.round(clima.daily.temperature_2m_max[i])}°C</h5>
            </div>
            `;
            climaContainer.append(div);
        }
    
        //Genero array de todos los <i> para agregarle el icono correspondiente
        let icon = document.querySelectorAll('.icon');

        //Filtro segun el codigo que brinda la api, el icono correspondiente
        for(let j=0;j<7;j++){
            if(clima.daily.weathercode[j]==0){
                icon[j].className ="icon-clima fa-solid fa-sun";
            } else if(clima.daily.weathercode[j]<4){
                icon[j].className ="icon-clima fa-solid fa-cloud-sun";
            } else if(clima.daily.weathercode[j]<49){
                icon[j].className ="icon-clima fa-solid fa-smog";
            } else if(clima.daily.weathercode[j]<68){
                icon[j].className ="icon-clima fa-solid fa-cloud-showers-heavy";
            } else if(clima.daily.weathercode[j]<78){
                icon[j].className ="icon-clima fa-solid fa-snowflake";
            } else if(clima.daily.weathercode[j]<100){
                icon[j].className ="icon-clima fa-solid fa-cloud-bolt";
            }
        }
    })
    .catch((error)=>{
        console.log(error);
        let climaContainer = document.getElementById('clima-container');
        let div = document.createElement("div");
        div.innerHTML = `
            <div style="color:red;"> 
                <i class="fa-solid fa-triangle-exclamation fs-1"></i>
                <h5 class="mt-3">No se pudo obtener información</h5>
            </div>
            `;
        climaContainer.append(div);
    })