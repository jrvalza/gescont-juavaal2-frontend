
import { MAP_MAIN} from './settings';
import {login, logout} from './login';
import {pinsert, pupdate, pdelete, pselect} from './people';
import {st_coords_select, stinsert, stupdate, stdelete, stselect, startDrawingStreets, stopDrawingStreets, clearVectorStreetsLayer, reloadWMSStreetsLayer} from './streets';
import {painsert, paupdate, padelete, paselect, startDrawingParks, stopDrawingParks, reloadWMSParksLayer, clearVectorParksLayer} from './parks';
import { singleClick } from 'ol/events/condition';


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


    document.addEventListener("DOMContentLoaded", function() {
        var checkStreets = document.getElementById('check_streets');
        var checkParks = document.getElementById('check_parks');
        var checkSelectXY = document.getElementById('check_selectXY')

        checkStreets.addEventListener('change', function() {
            checkParks.disabled = this.checked;
            checkSelectXY.disabled=this.checked;
            
            if (this.checked){
                document.getElementById('button-map-start-drawing-streets').addEventListener('click',startDrawingStreets);
                document.getElementById('button-map-stop-drawing-streets').addEventListener('click',stopDrawingStreets);
                document.getElementById('button-map-clear-streets').addEventListener('click',clearVectorStreetsLayer);
                document.getElementById('button-map-reload-streets').addEventListener('click',reloadWMSStreetsLayer);
                libs_general_hideAllDivsInDivExceptOne("div-main", "div-map", "div-button-drawing-streets", "div-streets") 
            }
            else{
                libs_general_hideAllDivsInDivExceptOne("div-main", "div-map") 
            }
            
        });

        checkParks.addEventListener('change', function() {
            checkStreets.disabled = this.checked;
            checkSelectXY.disabled=this.checked;
            
            if (this.checked){
                document.getElementById('button-map-start-drawing-parks').addEventListener('click',startDrawingParks);
                document.getElementById('button-map-stop-drawing-parks').addEventListener('click',stopDrawingParks);
                document.getElementById('button-map-clear-parks').addEventListener('click',clearVectorParksLayer);
                document.getElementById('button-map-reload-parks').addEventListener('click',reloadWMSParksLayer);
                libs_general_hideAllDivsInDivExceptOne("div-main", "div-map", "div-parks")
            }
            else{
                libs_general_hideAllDivsInDivExceptOne("div-main", "div-map")
            }
        }); 


        //select streets by click
        checkSelectXY.addEventListener('change', function() {
            checkParks.disabled = this.checked;
            checkStreets.disabled = this.checked;
            
            if (this.checked){    
                MAP_MAIN.add_map_click();
                libs_general_hideAllDivsInDivExceptOne("div-main", "div-map", "div-streets") 
            }
            else{
                MAP_MAIN.remove_map_click();
                libs_general_hideAllDivsInDivExceptOne("div-main", "div-map") 
            }
        });

    });












}
