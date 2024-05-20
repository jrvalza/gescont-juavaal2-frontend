import axios from 'axios';
import { URL_API } from './settings';



export function painsert(){
    let nombre=document.getElementById('form-parks-nombre').value;
    let descripcion=document.getElementById('form-parks-descripcion').value;
    let geom=document.getElementById('form-parks-geomWkt').value;

    axios.post(URL_API + '/appjuavaal2/pparks/',
    {action: 'insert', nombre:nombre, descripcion:descripcion, geomWkt:geom}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-parks-message").innerHTML = jsonOutput;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-parks-message").innerHTML = jsonOutput;
            
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
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-parks-message").innerHTML = jsonOutput;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            
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
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-parks-message").innerHTML = jsonOutput;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            
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
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-parks-message").innerHTML = jsonOutput;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}