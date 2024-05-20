import axios from 'axios';
import { URL_API } from './settings';



export function pinsert(){
    let dni= document.getElementById('form-people-dni').value;
    let nombre=document.getElementById('form-people-nombre').value;
    let apellido=document.getElementById('form-people-apellido').value;
    let profesion=document.getElementById('form-people-profesion').value;
    let ciudad=document.getElementById('form-people-ciudad').value;

    axios.post(URL_API + '/appjuavaal2/ppeople/',
    {action: 'insert', dni:dni, nombre:nombre, apellido:apellido, profesion:profesion, ciudad:ciudad}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-people-message").innerHTML = jsonOutput;
        })
        .catch(function (error, response) {
            // handle error
            console.log(error);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-people-message").innerHTML = jsonOutput;
            
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}






export function pupdate(){
    let dni= document.getElementById('form-people-dni').value;
    let nombre=document.getElementById('form-people-nombre').value;
    let apellido=document.getElementById('form-people-apellido').value;
    let profesion=document.getElementById('form-people-profesion').value;
    let ciudad=document.getElementById('form-people-ciudad').value;

    axios.post(URL_API + '/appjuavaal2/ppeople/',
    {action: 'update', dni:dni, nombre:nombre, apellido:apellido, profesion:profesion, ciudad:ciudad}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-people-message").innerHTML = jsonOutput;
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



export function pdelete(){
    let dni= document.getElementById('form-people-dni').value;

    axios.post(URL_API + '/appjuavaal2/ppeople/',
    {action: 'delete', dni:dni}, {withCredentials: true})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-people-message").innerHTML = jsonOutput;
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



export function pselect(){
    let dni= document.getElementById('form-people-dni').value;

    axios.get(URL_API + '/appjuavaal2/people/', {params: {dni:dni}})
    
    .then(function (response) {
    // handle success
            console.log(response);
            let jsonOutput = JSON.stringify(response.data, undefined, 2);
            document.getElementById("form-people-message").innerHTML = jsonOutput;
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