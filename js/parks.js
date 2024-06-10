import axios from 'axios';

import { MAP_MAIN, URL_API } from './settings';



export function painsert(){
    let nombre=document.getElementById('form-parks-nombre').value;
    let descripcion=document.getElementById('form-parks-descripcion').value;
    let geom=document.getElementById('form-parks-geomWkt').value;

    axios.post(URL_API + '/appjuavaal2/pparks/',
    {action: 'insert', nombre:nombre, descripcion:descripcion, geomWkt:geom}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);

            if (!response.data.data){
                document.getElementById("form-parks-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-parks-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-parks-message").innerHTML = jsonOutput;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-parks-message").innerHTML=error.message;
            
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}






export function paupdate(){
    let gid= document.getElementById('form-parks-gid').value;
    let nombre=document.getElementById('form-parks-nombre').value;
    let descripcion=document.getElementById('form-parks-descripcion').value;
    let geom=document.getElementById('form-parks-geomWkt').value;

    axios.post(URL_API + '/appjuavaal2/pparks/',
    {action: 'update', gid:gid, nombre:nombre, descripcion:descripcion, geomWkt:geom}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);

            if (!response.data.data){
                document.getElementById("form-parks-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-parks-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-parks-message").innerHTML = jsonOutput;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-parks-message").innerHTML=error.message;
            
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}




export function padelete(){
    let gid= document.getElementById('form-parks-gid').value;

    axios.post(URL_API + '/appjuavaal2/pparks/',
    {action: 'delete', gid:gid}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);

            if (!response.data.data){
                document.getElementById("form-parks-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-parks-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                document.getElementById('form-parks-gid').value = '';
                document.getElementById('form-parks-nombre').value = '';
                document.getElementById('form-parks-descripcion').value = '';
                document.getElementById('form-parks-geomWkt').value = '';
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-parks-message").innerHTML = jsonOutput;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-parks-message").innerHTML=error.message;
            
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}



export function paselect(){
    let gid= document.getElementById('form-parks-gid').value;

    axios.get(URL_API + '/appjuavaal2/parks/', {params: {gid:gid}})
    
    .then(function (response) {
    // handle success
            console.log(response);

            //count the response objects
            let dataCount = 0;
            for (let item of response.data.data) {
                    dataCount++;
                }

            if (response.data.data.length == 0) {
                document.getElementById('form-parks-nombre').value = '';
                document.getElementById('form-parks-descripcion').value = '';
                document.getElementById('form-parks-geomWkt').value = '';
                document.getElementById("form-parks-message").innerHTML= response.data.message;
            }

            else if (dataCount == 1){
                document.getElementById('form-parks-gid').value = response.data.data[0].gid;
                document.getElementById('form-parks-nombre').value = response.data.data[0].nombre;
                document.getElementById('form-parks-descripcion').value = response.data.data[0].descripcion;
                document.getElementById('form-parks-geomWkt').value = response.data.data[0].geometry_text;
                document.getElementById("form-parks-message").innerHTML= response.data.message;
            }

            else if (dataCount > 1){
                document.getElementById('form-parks-nombre').value = '';
                document.getElementById('form-parks-descripcion').value = '';
                document.getElementById('form-parks-geomWkt').value = '';
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-parks-message").innerHTML = jsonOutput;

            }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-parks-message").innerHTML=error.message;
            
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}












/*PARA DIBUJAR*/

export function startDrawingParks(){
    //Enables de draw interaction
    MAP_MAIN.startDrawingParks();
    document.getElementById("map-message-parks").innerHTML="Draw point interaction active"
}

export function stopDrawingParks(){
    //Enables de draw interaction
    MAP_MAIN.stopDrawingParks();
    document.getElementById("map-message-parks").innerHTML="Draw point interaction inactive";
}

export function reloadWMSParksLayer(){
    MAP_MAIN.reloadWMSParksLayer();
    document.getElementById("map-message-parks").innerHTML="WMS Parks reloaded"
}

export function clearVectorParksLayer(){
    MAP_MAIN.clearVectorParksLayer();
    document.getElementById("map-message-parks").innerHTML="Vector Parks layer cleared"
}