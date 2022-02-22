import {desenharPizza} from '../js/services/graficoPizza.js';
import {desenharLinha} from '../js/services/graficoLinha.js';
import {desenharColuna} from '../js/services/graficoColuna.js';
import {desenharJson} from '../js/services/graficoJson.js'

google.charts.load('current', {'packages':['corechart'],'language':'pt-br'});

google.charts.setOnLoadCallback(desenharPizza);
google.charts.setOnLoadCallback(desenharLinha);
google.charts.setOnLoadCallback(desenharColuna);
google.charts.setOnLoadCallback(desenharJson);