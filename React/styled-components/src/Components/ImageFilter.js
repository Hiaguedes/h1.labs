import React from 'react';

import alimentacao from '../assets/images/alimentacao.svg';
import outros from '../assets/images/outros.svg';
import saude from '../assets/images/saude.svg';
import transporte from '../assets/images/transporte.svg';
import utilidades from '../assets/images/utilidades.svg';

import { ImgIcone } from './UIComponents'

export default (type) => {
    const Images = {
        Restaurante: <ImgIcone src={alimentacao} alt="Restaurante"/>,
        Utilidades: <ImgIcone src={utilidades} alt="Utilidades"/>,
        Saude: <ImgIcone src={saude} alt="Saude"/>,
        Transporte: <ImgIcone src={transporte} alt="Transporte"/>,
        default: <ImgIcone src={outros} alt="Outro"/>,
    };

    return Images[type] || Images.default
}