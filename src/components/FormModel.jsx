// REACT==================================================================================================================
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// IMPORT=================================================================================================================
import { funcMangaModel, funcAjax } from "../js/function.js";
// COMPONENTS=============================================================================================================
import { FormTextComponentModel, FormAreaComponentModel, FormRdoComponentModel, FormCbxComponentModel, 
    FormDobuleComponentModel, FormCbxSearchComponentModel, FormSelectMultipledtModel, FormImgtModel, FormButtonModel }   from "./FormComponentsModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/addModel.css"
// MODEL==================================================================================================================
export function FormModel({action, title}) {
    // VARIABLES==========================================================================================================
    let { page, id }                = useParams();
    let [jsonValue, setJsonValue]   = useState(funcMangaModel());
    let optContent                  = undefined;
    let optNext                     = undefined;   
    // CONDITIONS=========================================================================================================
    if(parseInt(page) === 1){
        optContent = <>
                        <FormTextComponentModel 
                            id="txtName"
                            title="Nombre del manga" 
                            placeholder="Ingrese el nombre del manga"
                            element={jsonValue}
                            field= "nombre"
                            setStatus={setJsonValue}
                        />
                        <FormTextComponentModel 
                            id="txtNameJP"      
                            title="Nombre japones del manga" 
                            placeholder="Ingrese el nombre japones del manga"
                            element={jsonValue}
                            field= "nombre_jp"
                            setStatus={setJsonValue}
                        />
                        <FormAreaComponentModel 
                            id="txtsynopsis"    
                            title="Sinopsis del manga" 
                            placeholder="Ingrese la sinopsis del manga"
                            element={jsonValue}
                            field= "sinopsis"
                            setStatus={setJsonValue}
                        />
                        <FormCbxComponentModel  
                            id="txtDemography"  
                            title="Demografia del manga" 
                            placeholder="Selecione la demografia del manga"
                            list={["Shounen", "Shoujo", "Seinien", "Josei", "Kodomo"]}
                            element={jsonValue}
                            field= "demografia"
                            setStatus={setJsonValue}
                        />
                        <FormCbxSearchComponentModel  
                            id="txtAuthor"  
                            title="Autor del manga" 
                            action="Autor"
                            placeholder="Selecione el autor del manga"
                            element={jsonValue}
                            field= "autor"
                            setStatus={setJsonValue}
                        />
                        <FormCbxSearchComponentModel  
                            id="txtEditorial"  
                            title="Editorial del manga"
                            action="Editorial"
                            placeholder="Selecione la editorial del manga"
                            element={jsonValue}
                            field= "editorial"
                            setStatus={setJsonValue}
                        /> 
                        <FormRdoComponentModel 
                            title="Estado del manga"
                            element={jsonValue}
                            field= "estado"
                            setStatus={setJsonValue}
                        />
                    </>;
        optNext = <Link to={"/" + action.toLowerCase() + "/2"} className="next-page"></Link>;
        
        if(action.toLowerCase() === "update"){
            optNext = <Link to={"/" + action.toLowerCase() + "/2/" + id} className="next-page"></Link>;
        }
    }

    if(parseInt(page) === 2){
        optContent = <>
                        <FormDobuleComponentModel
                            option="int"
                            idFirst="txtChapter"
                            idSecond="txtTomo"
                            titleFirst="Capitulos del manga"
                            titleSecond="Tomos del manga"
                            placeholderFirst="Ingrese los capitulos del manga"
                            placeholderSecond="Ingrese los tomos del manga"
                            element={jsonValue}
                            fieldFirst= "capitulos"
                            fieldSecond= "tomo"
                            setStatus={setJsonValue}
                        />   
                        <FormDobuleComponentModel
                            option="date"
                            idFirst="txtPublication"
                            idSecond="txtFinalized"
                            titleFirst="Publicación del manga"
                            titleSecond="Finalización del manga"
                            placeholderFirst="Ingrese la publicación del manga"
                            placeholderSecond="Ingrese la finalización del manga"
                            element={jsonValue}
                            fieldFirst= "publicacion"
                            fieldSecond= "finalizacion"
                            setStatus={setJsonValue}
                        />
                        <FormSelectMultipledtModel  
                            id="txtGenre"  
                            title="Genero del manga"
                            action="Genero"
                            placeholder="Selecione la genero del manga"
                            element={jsonValue}
                            field= "genero"
                            setStatus={setJsonValue}
                        /> 
                        <FormSelectMultipledtModel  
                            id="txtLink"  
                            title="Link del manga"
                            action="Link"
                            placeholder="Ingrese el link del manga"
                            element={jsonValue}
                            field= "link"
                            setStatus={setJsonValue}
                        /> 
                        <FormImgtModel  
                            id="txtImg"  
                            title="Imagen del manga"
                            placeholder="Ingrese la imagen del manga"
                            element={jsonValue}
                            field= "imagen"
                            setStatus={setJsonValue}
                        /> 
                        {
                            (function(){
                                if(action.toLowerCase() === "update"){
                                    return <FormButtonModel  
                                                text="Actualizar manga"
                                                element={jsonValue}
                                                action={action}
                                            />;
                                    
                                }
                                return <FormButtonModel  
                                            text="Agregar manga"
                                            element={jsonValue}
                                            action={action}
                                        />;
                            })()
                        }
                    </>;
    }
    // USEEFFCET==========================================================================================================
    useEffect(function () {
        if(id !== undefined){            
            funcAjax("listManga", {"_id": parseInt(id)}, setJsonValue, true);
        }
    }, [id]);
    // RETURN=============================================================================================================
    return (
        <>
            <div className="form-model-title">
                <img className="form-model-title-icon" src="../img/add.png" alt="add.png" />
                <h3>{title}</h3>
            </div>
            {optContent}
            {optNext}
        </>
    );
}