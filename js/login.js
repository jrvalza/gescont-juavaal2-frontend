


import axios from 'axios';
import { URL_API } from './settings';


export function login(){
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;


    axios.post(URL_API + '/appjuavaal2/app_login/',
        {username:username,password:password}, {withCredentials: true})
        .then(function (response) {
        // handle success
                console.log(response);
                document.getElementById("form-login-message").innerHTML=response.data.message;
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


export function logout(){
    axios.get(URL_API + '/appjuavaal2/app_logout/',{})
        .then(function (response) {
        // handle success
                console.log(response);
                document.getElementById("form-login-message").innerHTML=response.data.message;
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


