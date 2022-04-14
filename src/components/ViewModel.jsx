// REACT==================================================================================================================
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// IMPORT=================================================================================================================
import { funcAjax, funcModel } from "../js/function.js";
// COMPONENTS=============================================================================================================
import { InfoModel } from "./InfoModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/viewModel.css"
// MODEL==================================================================================================================
export function ViewModel() {
    // VARIABLES==========================================================================================================
    let { id }                              = useParams();
    let [viewManga, setViewManga]           = useState([]);
    let viewItem                            = funcModel();
    // CONDITIONS=========================================================================================================
    if(viewManga[0] !== undefined){
        viewItem = viewManga[0];
    }
    // USEEFFCET==========================================================================================================
    useEffect(function () {
        funcAjax("http://127.0.0.1:5000/listManga", setViewManga, { "_id": parseInt(id) });
    }, [id]);
    // RETURN=============================================================================================================
    return (
        <>
            <div className="view-id">
                <h3>#{viewItem["_id"]}</h3>
            </div>
            <div className="view-tittle">
                <h3>
                    {viewItem["nombre"]}
                </h3>
                <h4>
                    {viewItem["nombre_jp"]}
                </h4>
            </div>
            <div className="view-data">
                <div className="view-data-img">
                    <img src={viewItem["imagen"]} alt={viewItem["nombre"]} />
                </div>
                <div className="view-data-info">
                    <InfoModel title="Estado"       data={viewItem["estado"]}></InfoModel>
                    <InfoModel title="Demografia"   data={viewItem["demografia"]}></InfoModel>
                    <InfoModel title="Publicación"  data={viewItem["publicacion"]}></InfoModel>
                    <InfoModel title="Finalización" data={viewItem["finalizacion"]}></InfoModel>
                    <InfoModel title="Capitulos"    data={viewItem["capitulos"]}></InfoModel>
                    <InfoModel title="Tomos"        data={viewItem["tomo"]}></InfoModel>
                    <InfoModel title="Autores"      data={viewItem["autor"]}></InfoModel>
                    <InfoModel title="Editoriales"  data={viewItem["editorial"]}></InfoModel>
                </div>
            </div>
            <div className="view-list">
                <h4 className="view-list-title">
                    Genero
                </h4>
                <div className="view-list-data">
                    {viewItem["genero"].map(function(item, index){
                        return(
                            // <Link to={"/filter/" + JSON.stringify({ "genero": item })} className="pill-model" key={index}>
                            <Link to={"/filter/1/" + JSON.stringify({ "genero": item })} className="pill-model" key={index}>
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
                    <a className="pill-model" href="# ">
                        generoPrueba
                    </a>
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