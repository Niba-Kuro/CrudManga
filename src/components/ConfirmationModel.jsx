// REACT==================================================================================================================
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// IMPORT=================================================================================================================
import { funcAjax } from "../js/function.js";
// STYLESHEET=============================================================================================================
import "../css/confirmationModel.css"
// MODEL==================================================================================================================
export function ConfirmationModel() {
    // VARIABLES==========================================================================================================
    let { parameter }   = useParams();
    let navigate        = useNavigate();
    let json            = JSON.parse(parameter);
    // RETURN=============================================================================================================
    return (
        <div className="view-confirmation">
            <h2 className="view-confirmation-title">¿Desea eliminar {json["name"]}?</h2>
            <button 
                className="view-confirmation-button"
                onClick={() => {navigate("/");}}
            >Cancelar</button>
            <button 
                className="view-confirmation-button"
                onClick={() => {
                    funcAjax("delete" + json["collection"].charAt(0).toUpperCase() + json["collection"].slice(1), {"_id" : json["_id"]}, undefined);
                    navigate("/");
                }}
            >Confirmar</button>
        </div>
    );
}