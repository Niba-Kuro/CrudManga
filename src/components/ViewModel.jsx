// REACT==================================================================================================================
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// IMPORT=================================================================================================================
import { funcAjax, funcMangaModel, funcOpenUrl } from "../js/function.js";
// COMPONENTS=============================================================================================================
import { SheetModel }   from "./SheetModel.jsx";
import { InfoModel }    from "./InfoModel.jsx";
import { TooltipModel } from "./TooltipModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/viewModel.css"
// MODEL==================================================================================================================
export function ViewModel() {
    // VARIABLES==========================================================================================================
    let { id }                                  = useParams();
    let [viewManga, setViewManga]               = useState([]);
    let [tooltipNombre, setTooltipNombre]       = useState(false);
    let [tooltipNombreJp, setTooltipNombreJp]   = useState(false);
    let viewItem                                = funcMangaModel();
    // CONDITIONS=========================================================================================================
    if(viewManga[0] !== undefined){
        viewItem = viewManga[0];
    }
    // USEEFFCET==========================================================================================================
    useEffect(function () {
        funcAjax("listManga", { "_id": parseInt(id) }, setViewManga);
    }, [id]);
    // RETURN=============================================================================================================
    return (
        <>
            <div className="view-controller">
                <Link to={"/delete/" + JSON.stringify({"_id": viewItem["_id"], "collection" : "manga", "name" : viewItem["nombre"]})} className="view-controller-data" >
                    <img src="../img/remove.png" alt="remove.png"/>
                </Link>
                <Link to={"/update/1/" + viewItem["_id"]} className="view-controller-data" >
                    <img src="../img/update.png" alt="update.png"/>
                </Link>
            </div>
            <div className="view-id">
                <h3>#{viewItem["_id"]}</h3>
            </div>
            <div className="view-tittle">
                <h3
                    onMouseEnter={() => {setTooltipNombre(true)}} 
                    onMouseLeave={() => {setTooltipNombre(false)}}>
                    {viewItem["nombre"]}
                </h3>
                {tooltipNombre && (
                    <TooltipModel prop={viewItem["nombre"]}/>
                )}
                <h4 
                    onMouseEnter={() => {setTooltipNombreJp(true)}} 
                    onMouseLeave={() => {setTooltipNombreJp(false)}}>
                    {viewItem["nombre_jp"]}
                </h4>
                {tooltipNombreJp && (
                    <TooltipModel prop={viewItem["nombre_jp"]}/>
                )}
            </div>
            <div className="view-data">
                <Link 
                    to={"/ImgModel/"+viewItem["_id"]} 
                    className="view-data-img" 
                    onClick={() => {(<SheetModel prop={<img alt="prueba"/>} />)}}>
                    <img src={viewItem["imagen"]} alt={viewItem["nombre"]}/>
                </Link>
                <div className="view-data-info">
                    <InfoModel 
                        title="Estado"       
                        data={viewItem["estado"]}/>
                    <InfoModel 
                        title="Demografia"
                        data={viewItem["demografia"]}/>
                    <InfoModel 
                        title="Publicación"  
                        data={viewItem["publicacion"]}/>
                    <InfoModel 
                        title="Finalización" 
                        data={viewItem["finalizacion"]}/>
                    <InfoModel 
                        title="Capitulos"    
                        data={viewItem["capitulos"]}/>
                    <InfoModel 
                        title="Tomos"        
                        data={viewItem["tomo"]}/>
                    <InfoModel 
                        title="Autores"
                        data={viewItem["autor"]}/>
                    <InfoModel 
                        title="Editoriales"  
                        data={viewItem["editorial"]}/>
                </div>
            </div>
            <div className="view-list">
                <h4 className="view-list-title">
                    Genero
                </h4>
                <div className="view-list-data">
                    {viewItem["genero"].map(function(item, index){
                        return(
                            <Link 
                                to={"/filter/1/" + JSON.stringify({ "genero": item })} 
                                className="pill-model" key={index}>
                                {item}
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="view-list">
                <h4 className="view-list-title">
                    Paginas
                </h4>
                <div className="view-list-data">
                    {viewItem["link"].map(function(item, index){
                        return(
                            <Link 
                                to="#" 
                                onClick={() => {funcOpenUrl(item)}} 
                                className="pill-model" 
                                key={index}>
                                {(function(){
                                    if(item.split("/").length > 1){
                                        return item.split("/")[2];
                                    }
                                    return "Formato incorrecto"
                                })()}
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="view-synopsis">
                <h4 className="view-synopsis-title">
                    Sinopsis
                </h4>
                <div className="view-synopsis-data">
                    {viewItem["sinopsis"]}
                </div>
            </div>
        </>
    );
}