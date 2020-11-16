import React from "react";
import ThemeOn from "../../assets/images/themeOn.svg";
import ThemeOff from "../../assets/images/themeOff.svg";
import { ImgIcone } from "../UIComponents";

const claro = <ImgIcone src={ThemeOn} alt="Tema Claro" />;
const escuro = <ImgIcone src={ThemeOff} alt="Tema Escuro" />;

export default ({ tema }) => (tema ? escuro : claro);