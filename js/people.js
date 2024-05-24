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
            
            if (!response.data.data){
                document.getElementById("form-people-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-people-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-people-message").innerHTML = jsonOutput;
            }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-people-message").innerHTML=error.message;
            
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

            if (!response.data.data){
                document.getElementById("form-people-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-people-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-people-message").innerHTML = jsonOutput;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-people-message").innerHTML=error.message;
            
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
    
    .then(function (response, dni) {
    // handle success
            console.log(response);
            
            if (!response.data.data){
                document.getElementById("form-people-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-people-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                document.getElementById('form-people-dni').value = '';
                document.getElementById('form-people-nombre').value ='';
                document.getElementById('form-people-apellido').value ='';
                document.getElementById('form-people-profesion').value = '';
                document.getElementById('form-people-ciudad').value = '';
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-people-message").innerHTML = jsonOutput;
            }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-people-message").innerHTML=error.message;
            
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

            //count the response objects
            let dataCount = 0;
            for (let item of response.data.data) {
                    dataCount++;
                }

            if (response.data.data.length == 0) {
                document.getElementById('form-people-nombre').value ='';
                document.getElementById('form-people-apellido').value ='';
                document.getElementById('form-people-profesion').value = '';
                document.getElementById('form-people-ciudad').value = '';
                document.getElementById("form-people-message").innerHTML= response.data.message;
            }
            else if (dataCount == 1){
                document.getElementById('form-people-dni').value = response.data.data[0].dni;
                document.getElementById('form-people-nombre').value =response.data.data[0].nombre;
                document.getElementById('form-people-apellido').value =response.data.data[0].apellido;
                document.getElementById('form-people-profesion').value = response.data.data[0].profesion;
                document.getElementById('form-people-ciudad').value = response.data.data[0].ciudad;
                document.getElementById("form-people-message").innerHTML= response.data.message;
            }
            else if (dataCount > 1){
                document.getElementById('form-people-nombre').value ='';
                document.getElementById('form-people-apellido').value ='';
                document.getElementById('form-people-profesion').value = '';
                document.getElementById('form-people-ciudad').value = '';
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-people-message").innerHTML = jsonOutput;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-people-message").innerHTML=error.message;
            
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}