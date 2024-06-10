
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import { OSM, TileWMS } from 'ol/source';
import LayerGroup from 'ol/layer/Group';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import LayerSwitcher from 'ol-layerswitcher';

import {Draw} from 'ol/interaction.js';
import {LineString, Point} from 'ol/geom.js';
import {WKT} from 'ol/format'
import {ScaleLine} from 'ol/control.js';
import {createStringXY} from 'ol/coordinate.js';
import MousePosition from 'ol/control/MousePosition.js';
import {Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style.js';


import { URL_GEOSERVER } from '../settings';
import { st_coords_select } from '../streets';



export class MapMain{

    //constructor de la clase
    constructor(){
        //propiedades de clase
        this.vector_streets_layer=undefined;
        this.vector_streets_layer_source_draw = undefined;
        this.vector_streets_layer_draw_interaction=undefined;//the draw interaction
        this.wms_streets_layer = undefined
        

        this.vector_parks_layer=undefined;
        this.vector_parks_layer_source_draw = undefined;
        this.vector_parks_layer_draw_interaction=undefined;//the draw interaction
        this.wms_parks_layer = undefined

        this.layers = this.createLayers();
        this.map = this.initMap();
        
        this.setMapControls();
        this.addDrawStreetsInteraction();
        this.stopDrawingStreets();
        this.addDrawParksInteraction();
        this.stopDrawingParks();

        this.add_map_click();
        this.remove_map_click();
    }
    
    //capas del mapa
    createLayers(){
        var pnoa = new TileLayer({
            source: new TileWMS({       
                url: 'http://www.ign.es/wms-inspire/pnoa-ma',
                params: {"LAYERS": "OI.OrthoimageCoverage", 'VERSION': "1.3.0", "TILED": "true"},
                attributions: ["PNOA-MA"]
            }),
            name: 'PNOA', 
            description: 'PNOA', 
            visible: true, 
            title:'PNOA',
            //type: 'base'
        });
      
      
        var catastro= new TileLayer({
            source: new TileWMS({
                url: 'https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?',
                params: {'LAYERS': 'Catastro', 'VERSION': '1.1.1', 'TILED': true, 'TRANSPARENT': true, 'FORMAT': 'image/png'},
            }), 
            name: 'Cadastre', 
            description: 'Cadastre', 
            visible: true, 
            title:'Cadastre',
            //type: 'base'
        });

        /*var osm= new TileLayer({
          source: new OSM(),
          name: 'OSM',
          description: 'Open Street Map',
          visible: true,
          title: 'OSM',
          //type: 'base'
        })
        */


        
        const baselayers = new LayerGroup({
            title: 'Base layers:',
            layers: [pnoa, catastro]
        });
        


        //CAPAS PROPIAS 

        this.wms_streets_layer= new TileLayer({
            source: new TileWMS({
                url: URL_GEOSERVER + '/wms?',
                params: {'LAYERS': 'appjuavaal2:streets', 'VERSION': '1.3.0', 'TILED': true},
            }), 
            name: 'Streets_wms', 
            description: 'streets wms', 
            visible: true, 
            title:'Streets_wms',
        });


        this.wms_parks_layer= new TileLayer({
            source: new TileWMS({
                url: URL_GEOSERVER + '/wms?',
                params: {'LAYERS': 'appjuavaal2:parks', 'VERSION': '1.3.0', 'TILED': true},
            }), 
            name: 'Parks_wms', 
            description: 'parks wms', 
            visible: true, 
            title:'Parks_wms',
        });


        //CREAR CAPA STREETS PARA DIBUJAR
        var vector_streets_draw_style = new Style({
            fill: new Fill({
                color: '#D7DF01'
            }),

            stroke: new Stroke({
              color: '#DF013A',
              width: 3,
              lineJoin: 'round'
            
            }),
            image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                  color: '#DF013A'
                })
              })
            });


        this.vector_streets_layer_source_draw = new VectorSource({wrapX: false}); //needed for draw
        this.vector_streets_layer= new VectorLayer({
            source: this.vector_streets_layer_source_draw,
            title: 'Streets draw layer'
        });
        //The layer were we will draw
        this.vector_streets_layer.setStyle(vector_streets_draw_style);
        this.vector_streets_layer.setOpacity(0.5);


        //CREAR CAPA PARKS PARA DIBUJAR
        var vector_parks_draw_style = new Style({
            fill: new Fill({
                color: '#D7DF01'
            }),

            stroke: new Stroke({
              color: '#DF013A',
              width: 3,
            }),

            image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                  color: '#DF013A'
                })
              })
            });


        this.vector_parks_layer_source_draw = new VectorSource({wrapX: false}); //needed for draw
        this.vector_parks_layer= new VectorLayer({
            source: this.vector_parks_layer_source_draw,
            title: 'Parks draw layer'
        });
        //The layer were we will draw
        this.vector_parks_layer.setStyle(vector_parks_draw_style);
        this.vector_parks_layer.setOpacity(0.5);

        
        const juavaalLayers = new LayerGroup({
            title: 'JuavaalLayers:',
            layers: [this.wms_streets_layer, this.wms_parks_layer, this.vector_streets_layer, this.vector_parks_layer],
        });
        

       return [baselayers, juavaalLayers]
    }














    //inicializa el mapa
    initMap(){

        //sistema de referencia
        let epsg25830=new Projection({
            code:'EPSG:25830',
            extent: [716682.702,4365814.329,732380.437,4376383.664],
            units: 'm'
          });


        const map = new Map({
            target: 'map',

            layers: this.layers,

            view: new View({
                projection:epsg25830,
                maxZoom: 28,
                minZoom: 1,  
                zoom: 2,
                center: [724950.649,4371212.645]                
            })
          })
          
          return map;
        }
    


    setMapControls(){
        const layerSwitcher = new LayerSwitcher({
            activationMode: 'mouseover',
            startActive: false,
            tipLabel: 'Show-hide layers',
            groupSelectStyle: 'group',
            reverse: true
        });
        
        //Adds the mouse coordinate position to the map
        const mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(0), //0 decimales
        projection: 'EPSG:25830',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        //className: 'custom-mouse-position',
        //target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
        });

        const sl = new ScaleLine({units: 'metric'});
        this.map.addControl(layerSwitcher);
        this.map.addControl(mousePositionControl);
        this.map.addControl(sl);
    }






    //INTERACCIONES DE DIBUJO
    addDrawStreetsInteraction(){

        this.vector_streets_layer_draw_interaction = new Draw({
               source: this.vector_streets_layer_source_draw, //source of the layer where the poligons will be drawn
               type: ('LineString') //geometry type
             });
         
         //When a polygon is drawn the callback function manageDrawEnd will be executed.
         //The system pass to the function a parameter e, which is an objects with
         //a lot of properties, one of which is the geometry of the geometry just drawn
         //This must be done only once
        this.vector_streets_layer_draw_interaction.on('drawend', this.manageStreetsDrawEnd);
         
         //adds the interaction to the map. This must be done only once
        this.map.addInteraction(this.vector_streets_layer_draw_interaction);
      }   

      manageStreetsDrawEnd(e){
        var feature = e.feature;//this is the feature that fired the event
        var wktFormat = new WKT();//an object to get the WKT format of the geometry
        var wktRepresentation  = wktFormat.writeGeometry(feature.getGeometry());//geomertry in wkt
        console.log(wktRepresentation);//logs a message

        //Update form
        document.getElementById('form-streets-gid').value = '';
        document.getElementById('form-streets-nombre').value = '';
        document.getElementById('form-streets-tipo').value = '';
        document.getElementById('form-streets-ncarril').value = '';
        document.getElementById("form-streets-geomWkt").value=wktRepresentation;//set the geometry in wkt format to the geomWkt input
      }

  
      startDrawingStreets(){
        this.vector_streets_layer_draw_interaction.setActive(true);
      }
      stopDrawingStreets(){
        this.vector_streets_layer_draw_interaction.setActive(false);
      }
  
      clearVectorStreetsLayer(){
        this.vector_streets_layer_source_draw.clear()
      }
      reloadWMSStreetsLayer(){
        this.wms_streets_layer.getSource().updateParams({"time": Date.now()})
      }








      addDrawParksInteraction(){
        /*Possible values for tipo_geom:
        * 		"Point","LineString","Polygon"
        * */
        this.vector_parks_layer_draw_interaction = new Draw({
               source: this.vector_parks_layer_source_draw, //source of the layer where the poligons will be drawn
               type: ('Point') //geometry type
             });
         
         //When a polygon is drawn the callback function manageDrawEnd will be executed.
         //The system pass to the function a parameter e, which is an objects with
         //a lot of properties, one of which is the geometry of the geometry just drawn
         //This must be done only once
        this.vector_parks_layer_draw_interaction.on('drawend', this.manageParksDrawEnd);
         
         //adds the interaction to the map. This must be done only once
        this.map.addInteraction(this.vector_parks_layer_draw_interaction);
      }   

      manageParksDrawEnd(e){
        var feature = e.feature;//this is the feature that fired the event
        var wktFormat = new WKT();//an object to get the WKT format of the geometry
        var wktRepresentation  = wktFormat.writeGeometry(feature.getGeometry());//geomertry in wkt
        console.log(wktRepresentation);//logs a message
        
        //update form
        document.getElementById('form-parks-gid').value = '';
        document.getElementById('form-parks-nombre').value = '';
        document.getElementById('form-parks-descripcion').value = '';
        document.getElementById("form-parks-geomWkt").value=wktRepresentation;//set the geometry in wkt format to the geomWkt input
      }

  
      startDrawingParks(){
        this.vector_parks_layer_draw_interaction.setActive(true);
      }
      stopDrawingParks(){
        this.vector_parks_layer_draw_interaction.setActive(false);
      }
  
      clearVectorParksLayer(){
        this.vector_parks_layer_source_draw.clear()
      }
      reloadWMSParksLayer(){
        this.wms_parks_layer.getSource().updateParams({"time": Date.now()})
      }





      
      add_map_click(){
        //enables the click event
        this.map.on("singleclick",this.captura_coords_click);
      }

      remove_map_click(){
        //enables the click event
        this.map.un("singleclick",this.captura_coords_click);
      }
      
      captura_coords_click(event) {
        //manage the click elvent
        var coord = event.coordinate;
        //console.log(String(coord[0]) + ',' + String(coord[1]));
        st_coords_select(coord);
      }
      
      
};









