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

            if (!response.data.data){
                document.getElementById("form-streets-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-streets-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-streets-message").innerHTML = jsonOutput;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-streets-message").innerHTML=error.message;
            
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

            if (!response.data.data){
                document.getElementById("form-streets-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-streets-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-streets-message").innerHTML = jsonOutput;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-streets-message").innerHTML=error.message;
            
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

            if (!response.data.data){
                document.getElementById("form-streets-message").innerHTML = response.data.message;
            }
            else if (response.data.data.length == 0){
                document.getElementById("form-streets-message").innerHTML= response.data.message;
            }
            else if (response.data.data.length == 1){
                document.getElementById('form-streets-gid').value = '';
                document.getElementById('form-streets-nombre').value = '';
                document.getElementById('form-streets-tipo').value = '';
                document.getElementById('form-streets-ncarril').value = '';
                document.getElementById('form-streets-geomWkt').value = '';
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-streets-message").innerHTML = jsonOutput;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-streets-message").innerHTML=error.message;
            
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

            //count the response objects
            let dataCount = 0;
            for (let item of response.data.data) {
                    dataCount++;
                }
            
            if (response.data.data.length == 0) {
                document.getElementById('form-streets-nombre').value = '';
                document.getElementById('form-streets-tipo').value = '';
                document.getElementById('form-streets-ncarril').value = '';
                document.getElementById('form-streets-geomWkt').value = '';
                document.getElementById("form-streets-message").innerHTML= response.data.message;
            }
            else if (dataCount == 1){
                document.getElementById('form-streets-gid').value = response.data.data[0].gid;
                document.getElementById('form-streets-nombre').value = response.data.data[0].nombre;
                document.getElementById('form-streets-tipo').value = response.data.data[0].tipo;
                document.getElementById('form-streets-ncarril').value = response.data.data[0].ncarril;
                document.getElementById('form-streets-geomWkt').value = response.data.data[0].geometry_text;
                document.getElementById("form-streets-message").innerHTML= response.data.message;
            }
            else if (dataCount > 1){
                document.getElementById('form-streets-nombre').value = '';
                document.getElementById('form-streets-tipo').value = '';
                document.getElementById('form-streets-ncarril').value = '';
                document.getElementById('form-streets-geomWkt').value = '';
                let jsonOutput = JSON.stringify(response.data, undefined, 2);
                document.getElementById("form-streets-message").innerHTML = jsonOutput;
            }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.getElementById("form-streets-message").innerHTML=error.message;
            
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}