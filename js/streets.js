import axios from 'axios';
import { URL_API } from './settings';



export function stinsert(){
    let nombre=document.getElementById('form-streets-nombre').value;
    let tipo=document.getElementById('form-streets-tipo').value;
    let ncarril=document.getElementById('form-streets-ncarril').value;
    let geom=document.getElementById('form-streets-geomWkt').value;

    axios.post(URL_API + '/appjuavaal2/pstreets/',
    {action: 'insert', nombre:nombre, tipo:tipo, ncarril:ncarril, geomWkt:geom}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-streets-message").innerHTML = jsonOutput;
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






export function stupdate(){
    let gid= document.getElementById('form-streets-gid').value;
    let nombre=document.getElementById('form-streets-nombre').value;
    let tipo=document.getElementById('form-streets-tipo').value;
    let ncarril=document.getElementById('form-streets-ncarril').value;
    let geom=document.getElementById('form-streets-geomWkt').value;

    axios.post(URL_API + '/appjuavaal2/pstreets/',
    {action: 'update', gid:gid, nombre:nombre, tipo:tipo, ncarril:ncarril, geomWkt:geom}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-streets-message").innerHTML = jsonOutput;
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



export function stdelete(){
    let gid= document.getElementById('form-streets-gid').value;

    axios.post(URL_API + '/appjuavaal2/pstreets/',
    {action: 'delete', gid:gid}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-streets-message").innerHTML = jsonOutput;
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



export function stselect(){
    let gid= document.getElementById('form-streets-gid').value;

    axios.get(URL_API + '/appjuavaal2/streets/', {params: {gid:gid}})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-streets-message").innerHTML = jsonOutput;
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