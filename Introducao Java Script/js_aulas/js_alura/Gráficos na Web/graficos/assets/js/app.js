import {desenharPizza} from '../js/services/graficoPizza.js';
import {desenharLinha} from '../js/services/graficoLinha.js';
import {desenharColuna} from '../js/services/graficoColuna.js';

google.charts.load('current', {'packages':['corechart'],'language':'pt-br'});

google.charts.setOnLoadCallback(desenharPizza);
google.charts.setOnLoadCallback(desenharLinha);
google.charts.setOnLoadCallback(desenharColuna);