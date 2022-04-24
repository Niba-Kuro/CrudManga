// REACT==================================================================================================================
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// IMPORT=================================================================================================================
import { funcAjax, funcImgModel } from "../js/function.js";
// STYLESHEET=============================================================================================================
import "../css/viewImgModel.css"
// MODEL==================================================================================================================
export function ViewImgModel() {
    // VARIABLES==========================================================================================================
    let { id }                                  = useParams();
    let [viewImage, setViewImage]               = useState([]);
    let viewItem                                = funcImgModel();
    // CONDITIONS=========================================================================================================    
    if(viewImage[0] !== undefined){
        viewItem = viewImage[0];
    }
    // USEEFFCET==========================================================================================================
    useEffect(function () {
        funcAjax("listManga", { "_id": parseInt(id), "$options_filter":{"$limit" : 1, "$imageBase64": {}, "$project" : {"_id": true, "imagen": true, "nombre": true}}}, setViewImage);
    }, [id]);
    // RETURN=============================================================================================================
    return (
        <> 
            <div className="view-img">
                <img src={viewItem["imagen"]} alt={viewItem["nombre"]} />
            </div>
        </>
    );
}