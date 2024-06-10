import './style.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import { MapMain } from './js/map/mapMain';
import { setMAP_MAIN } from './js/settings';
import { registerEvents } from './js/registerEvents';


setMAP_MAIN(new MapMain());
registerEvents();
