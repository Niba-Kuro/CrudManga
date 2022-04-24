// REACT==================================================================================================================
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// IMPORT=================================================================================================================
import { funcOpenUrl } from "../js/function.js";
// STYLESHEET=============================================================================================================
import "../css/sheetModel.css"
// MODEL==================================================================================================================
export function SheetModel({ prop }) {
    // VARIABLES==========================================================================================================
    let navigate            = useNavigate();
    let optBack             = undefined;
    // CONDITIONS=========================================================================================================
    if (window.location.href.charAt(window.location.href.length - 1) !== "/") {
        optBack = <button onClick={() => navigate(-1)}>Atrás</button>
    }
    // RETURN=============================================================================================================
    return (
        <>
            <div className="sheet-shadow back-sheet-model">
                <div className="sheet-model">
                    <Link to="#" onClick={() => {window.close();}}>Salir</Link>
                    <Link to="/">Inicio</Link>
                    <Link to="/">Configuración</Link>
                    {optBack}
                    <div>
                        <div className="back-sheet-credits">
                            <h3>Niba-kuro</h3>
                            <img src="../img/twitter.png" alt="twitter" onClick={() => {funcOpenUrl("https://twitter.com/niba_kuro_OTK")}}/>
                            <img src="../img/Facebook.png" alt="facebook" onClick={() => {funcOpenUrl("https://www.facebook.com/Proyectos-de-Niba-112903451304989")}}/>
                            <img src="../img/Instagram.png" alt="instagram" onClick={() => {funcOpenUrl("https://www.instagram.com/proyectosdeniba/")}}/>
                            <img src="../img/github.png" alt="github" onClick={() => {funcOpenUrl("https://github.com/Niba-Kuro")}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sheet-shadow">
                <div className="sheet-model">
                    {prop}
                </div>
            </div>
        </>
    );
}




