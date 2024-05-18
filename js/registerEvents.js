

import {login, logout} from './login';
import {pinsert, pupdate, pdelete, pselect} from './people';
import {stinsert, stupdate, stdelete, stselect} from './streets';
import {painsert, paupdate, padelete, paselect} from './parks';

export function registerEvents(){
    
    document.getElementById('button-login').addEventListener('click',login);
    document.getElementById('button-logout').addEventListener('click',logout);

    document.getElementById('button-people-insert').addEventListener('click',pinsert);
    document.getElementById('button-people-update').addEventListener('click',pupdate);
    document.getElementById('button-people-delete').addEventListener('click',pdelete);
    document.getElementById('button-people-select').addEventListener('click',pselect);

    document.getElementById('button-streets-insert').addEventListener('click',stinsert);
    document.getElementById('button-streets-update').addEventListener('click',stupdate);
    document.getElementById('button-streets-delete').addEventListener('click',stdelete);
    document.getElementById('button-streets-select').addEventListener('click',stselect);

    document.getElementById('button-parks-insert').addEventListener('click',painsert);
    document.getElementById('button-parks-update').addEventListener('click',paupdate);
    document.getElementById('button-parks-delete').addEventListener('click',padelete);
    document.getElementById('button-parks-select').addEventListener('click',paselect);
    

}
