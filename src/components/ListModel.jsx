// REACT==================================================================================================================
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// IMPORT=================================================================================================================
import $ from "jquery";
import { funcAjax } from "../js/function.js";
// COMPONENTS=============================================================================================================
import { MangaModel } from "./MangaModel.jsx";
import { ListFilterModel } from "./ListFilterModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/listModel.css"
// MODEL==================================================================================================================
export function ListModel({ filter, query = undefined, title }) {
    // VARIABLES==========================================================================================================
    let [listManga, setListManga]       = useState([]);
    let [listLiManga, setListLiManga]   = useState([]);
    let { page, parameter }             = useParams();
    let jsonFilter                      = undefined;
    let optFilter                       = undefined;
    let optNext                         = undefined;
    let countList                       = undefined;
    query["$options_filter"]["$skip"]   = undefined;
    let optPage                         = "/next/1";
    let clsFilter                       = "sheet-list-frame sheet-list-frame-without-filter";
    // CONDITIONS=========================================================================================================
    if(filter){
        clsFilter = "sheet-list-frame sheet-list-frame-with-filter";
        optFilter = <>
                        <div className="sheet-list-frame-filter">
                            <img className="sheet-list-icon-filter" src="../img/filter.png" alt="filter.png"/>
                            <img className="sheet-list-icon-filter" src="../img/search.png" alt="search.png"/>
                            <input type="text" name="txtFilterNameManga" id="txtFilterNameManga"
                                onFocus={() => {$("#container-list-filter-manga").removeClass("hide-list");}}                                                       
                                onBlur={()  => {$("#container-list-filter-manga").addClass("hide-list");}}
                                onInput={() => {
                                    if($("#txtFilterNameManga").val().trim().charAt(0) === "#"){
                                        if($("#txtFilterNameManga").val().trim().replace("#", "").trim() !== ""){
                                            funcAjax("listManga", {"$where": ("/" + parseInt($("#txtFilterNameManga").val().trim().replace("#", "")) + ".*/.test(this._id)"), "$options_filter":{"$limit" : 20}}, setListLiManga);
                                        }else{
                                            funcAjax("listManga", {"$options_filter":{"$limit" : 20}}, setListLiManga);
                                        }
                                    }else{
                                        funcAjax("listManga", {"nombre" : {"$regex": $("#txtFilterNameManga").val().trim(), "$options": "i"}, "$options_filter":{"$limit" : 20}}, setListLiManga);
                                    }
                                }}
                                placeholder="Buscar manga"></input>                        
                        </div>
                        <div 
                            id="container-list-filter-manga" 
                            className="list-manga-model hide-list"
                            onFocus={() => {$("#container-list-filter-manga").removeClass("hide-list");}}                                                       
                            onBlur={()  => {$("#container-list-filter-manga").addClass("hide-list");}}
                            tabIndex="0"  
                            >
                            <ul>
                                {
                                    listLiManga.map(function (item) {
                                        return <ListFilterModel prop={item} key={item["_id"]} />
                                    })
                                }
                                <li>
                                    <hr />
                                    <h2>....</h2>
                                    <hr />
                                </li>
                            </ul>
                        </div>
                    </>;
    }

    if(listManga[0] !== undefined){
        if(listManga[0].hasOwnProperty('count')){
            countList = listManga[0]["count"];
        }
    }

    if(page !== undefined && parameter === undefined){
        optPage = "/next/" + (parseInt(page) + 1);        
    }        

    if(parameter !== undefined){
        jsonFilter = JSON.parse(parameter)
        for(let key of Object.keys(jsonFilter)){
            query[key] = jsonFilter[key];
        }
        optPage = "/filter/" + (parseInt(page) + 1) + "/" + parameter;
    }

    if(page !== undefined){
        if(parseInt(page) > 1){
            query["$options_filter"]["$skip"] = 12 * (parseInt(page) - 1);
        }
    }

    if(((listManga.length - 1) === 12 && countList > 12) || page === undefined){
        optNext = <Link to={optPage} className="next-page"></Link>;
    }
    // USEEFFCET==========================================================================================================
    useEffect(function () {
        funcAjax("listManga", query, setListManga);
        if(filter){
            funcAjax("listManga", {"$options_filter":{"$limit" : 20, "$sort" : -1}}, setListLiManga);
        }        
    }, [query, filter, page]);
    // RETURN=============================================================================================================
    return (
        <>
            <div className="sheet-list">
                <div className={clsFilter}>
                    <div className="sheet-list-title">
                        <img className="sheet-list-icon-title" src="../img/list.png" alt="list.png" />
                        <h3>{title} <span>({countList})</span></h3>
                    </div>
                    {optFilter}
                    <div className="sheet-container">
                        {
                            listManga.map(function (item) {
                                if(item.hasOwnProperty("_id")){
                                    return <MangaModel prop={item} key={item["_id"]} />
                                }
                                return null;
                            })
                        }
                    </div>
                </div>
            </div>
            {optNext}
        </>
    );
}