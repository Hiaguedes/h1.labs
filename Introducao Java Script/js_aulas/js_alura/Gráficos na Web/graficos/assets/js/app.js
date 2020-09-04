import {desenharPizza} from '../js/services/graficoPizza.js';
import {desenharLinha} from '../js/services/graficoLinha.js';

google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(desenharPizza);
google.charts.setOnLoadCallback(desenharLinha);